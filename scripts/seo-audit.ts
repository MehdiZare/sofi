import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { writeFile } from "node:fs/promises";
import path from "node:path";

const locales = ["en", "hy", "ru"] as const;
const classSlugOrder = [
  "hot-power-flow",
  "hot-yoga-sculpt",
  "dumbbell-sculpt",
  "core-glutes",
  "upper-body-posture",
  "baby-me-foundations",
  "baby-me-strong",
  "mobility-reset",
  "deep-stretch-restore",
  "yin-release",
  "recovery-flow"
] as const;

const execFileAsync = promisify(execFile);

type RouteAudit = {
  path: string;
  status: number;
  title?: string;
  description?: string;
  canonical?: string;
  hreflangCount: number;
  structuredDataTypes: string[];
  inSitemap: boolean;
  lighthouseSeoScore?: number;
  issues: string[];
};

function normalizeBaseUrl(raw: string): string {
  return raw.endsWith("/") ? raw.slice(0, -1) : raw;
}

function extractTagContent(html: string, tagName: string): string | undefined {
  const regex = new RegExp(`<${tagName}[^>]*>([^<]*)<\\/${tagName}>`, "i");
  return regex.exec(html)?.[1]?.trim();
}

function extractMetaDescription(html: string): string | undefined {
  const regex = /<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i;
  return regex.exec(html)?.[1]?.trim();
}

function extractCanonical(html: string): string | undefined {
  const regex = /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i;
  return regex.exec(html)?.[1]?.trim();
}

function extractHreflangLinks(html: string): string[] {
  const regex = /<link[^>]+rel=["']alternate["'][^>]+hreflang=["']([^"']+)["'][^>]*>/gi;
  const matches: string[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    if (match[1]) {
      matches.push(match[1]);
    }
  }

  return matches;
}

function extractStructuredDataTypes(html: string): string[] {
  const blockRegex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const types = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = blockRegex.exec(html)) !== null) {
    const payload = match[1]?.trim();

    if (!payload) {
      continue;
    }

    try {
      const parsed = JSON.parse(payload) as Record<string, unknown> | Record<string, unknown>[];
      const items = Array.isArray(parsed) ? parsed : [parsed];

      for (const item of items) {
        const rawType = item["@type"];

        if (Array.isArray(rawType)) {
          rawType.forEach((entry) => {
            if (typeof entry === "string") {
              types.add(entry);
            }
          });
        } else if (typeof rawType === "string") {
          types.add(rawType);
        }
      }
    } catch {
      // Ignore malformed blocks in audit output but keep scanning others.
    }
  }

  return Array.from(types);
}

async function maybeRunLighthouse(url: string): Promise<number | undefined> {
  const { stdout } = await execFileAsync("lighthouse", [
    url,
    "--only-categories=seo",
    "--output=json",
    "--output-path=stdout",
    "--quiet",
    "--chrome-flags=--headless --no-sandbox"
  ]);

  const report = JSON.parse(stdout) as {
    categories?: { seo?: { score?: number } };
  };

  if (typeof report.categories?.seo?.score === "number") {
    return Math.round(report.categories.seo.score * 100);
  }

  return undefined;
}

async function isLighthouseAvailable(): Promise<boolean> {
  try {
    const { stdout } = await execFileAsync("which", ["lighthouse"]);
    return Boolean(stdout.trim());
  } catch {
    return false;
  }
}

function extractSitemapPaths(sitemapXml: string): Set<string> {
  const locRegex = /<loc>([^<]+)<\/loc>/g;
  const paths = new Set<string>();
  let match: RegExpExecArray | null;

  while ((match = locRegex.exec(sitemapXml)) !== null) {
    const rawUrl = match[1]?.trim();

    if (!rawUrl) {
      continue;
    }

    try {
      const parsed = new URL(rawUrl);
      paths.add(parsed.pathname);
    } catch {
      // Ignore malformed sitemap URLs.
    }
  }

  return paths;
}

async function main() {
  const baseUrl = normalizeBaseUrl(process.argv[2] ?? "http://localhost:3000");
  const runLighthouse = process.env.RUN_LIGHTHOUSE === "1";
  const lighthouseAvailable = runLighthouse ? await isLighthouseAvailable() : false;

  const routePaths = locales.flatMap((locale) => {
    const baseRoutes = [`/${locale}`, `/${locale}/classes`, `/${locale}/privacy`, `/${locale}/terms`];
    const classRoutes = classSlugOrder.map((slug) => `/${locale}/classes/${slug}`);

    return [...baseRoutes, ...classRoutes];
  });

  const sitemapResponse = await fetch(`${baseUrl}/sitemap.xml`);
  const sitemapText = sitemapResponse.ok ? await sitemapResponse.text() : "";
  const sitemapPaths = extractSitemapPaths(sitemapText);

  const routeAudits: RouteAudit[] = [];

  for (const routePath of routePaths) {
    const url = `${baseUrl}${routePath}`;
    const response = await fetch(url);
    const html = await response.text();
    const title = extractTagContent(html, "title");
    const description = extractMetaDescription(html);
    const canonical = extractCanonical(html);
    const hreflangs = extractHreflangLinks(html);
    const structuredDataTypes = extractStructuredDataTypes(html);
    const issues: string[] = [];

    if (!title) {
      issues.push("Missing <title>");
    }

    if (!description) {
      issues.push("Missing meta description");
    }

    if (!canonical) {
      issues.push("Missing canonical link");
    }

    if (hreflangs.length < locales.length) {
      issues.push("Missing one or more hreflang alternates");
    }

    if (structuredDataTypes.length === 0) {
      issues.push("Missing JSON-LD structured data");
    }

    if (!sitemapPaths.has(routePath)) {
      issues.push("URL missing from sitemap.xml");
    }

    const lighthouseSeoScore = runLighthouse && lighthouseAvailable
      ? await maybeRunLighthouse(url)
      : undefined;

    if (runLighthouse && lighthouseAvailable && lighthouseSeoScore === undefined) {
      issues.push("Lighthouse SEO score unavailable (CLI or browser missing)");
    }

    routeAudits.push({
      path: routePath,
      status: response.status,
      title,
      description,
      canonical,
      hreflangCount: hreflangs.length,
      structuredDataTypes,
      inSitemap: sitemapPaths.has(routePath),
      lighthouseSeoScore,
      issues
    });
  }

  const totalIssues = routeAudits.reduce((sum, routeAudit) => sum + routeAudit.issues.length, 0);
  const failedRoutes = routeAudits.filter((routeAudit) => routeAudit.status !== 200).length;
  const lighthouseScores = routeAudits
    .map((routeAudit) => routeAudit.lighthouseSeoScore)
    .filter((score): score is number => typeof score === "number");

  const averageLighthouse = lighthouseScores.length
    ? Math.round(lighthouseScores.reduce((sum, score) => sum + score, 0) / lighthouseScores.length)
    : undefined;

  const now = new Date();
  const reportDate = now.toISOString().slice(0, 10);
  const reportPath = path.join(process.cwd(), "docs", `seo-audit-${reportDate}.md`);

  const lines: string[] = [];
  lines.push(`# SEO Audit Report (${reportDate})`);
  lines.push("");
  lines.push(`- Base URL: ${baseUrl}`);
  lines.push(`- Routes audited: ${routeAudits.length}`);
  lines.push(`- Non-200 routes: ${failedRoutes}`);
  lines.push(`- Total issues found: ${totalIssues}`);
  lines.push(`- Lighthouse run: ${runLighthouse ? "Enabled" : "Disabled"}`);
  if (runLighthouse && !lighthouseAvailable) {
    lines.push("- Lighthouse availability: CLI not installed in current environment");
  }

  if (typeof averageLighthouse === "number") {
    lines.push(`- Average Lighthouse SEO score: ${averageLighthouse}`);
  }

  lines.push("");
  lines.push("## Route Results");
  lines.push("");

  for (const routeAudit of routeAudits) {
    lines.push(`### ${routeAudit.path}`);
    lines.push(`- Status: ${routeAudit.status}`);
    lines.push(`- Title: ${routeAudit.title ?? "(missing)"}`);
    lines.push(`- Meta description: ${routeAudit.description ? "present" : "missing"}`);
    lines.push(`- Canonical: ${routeAudit.canonical ?? "(missing)"}`);
    lines.push(`- Hreflang links: ${routeAudit.hreflangCount}`);
    lines.push(`- Structured data types: ${routeAudit.structuredDataTypes.length ? routeAudit.structuredDataTypes.join(", ") : "(none)"}`);
    lines.push(`- In sitemap.xml: ${routeAudit.inSitemap ? "yes" : "no"}`);

    if (typeof routeAudit.lighthouseSeoScore === "number") {
      lines.push(`- Lighthouse SEO score: ${routeAudit.lighthouseSeoScore}`);
    }

    if (routeAudit.issues.length > 0) {
      lines.push(`- Issues: ${routeAudit.issues.join("; ")}`);
    } else {
      lines.push("- Issues: none");
    }

    lines.push("");
  }

  await writeFile(reportPath, `${lines.join("\n")}\n`, "utf8");

  console.log(`SEO audit complete. Report written to ${path.relative(process.cwd(), reportPath)}`);
  console.log(`Routes audited: ${routeAudits.length}`);
  console.log(`Total issues found: ${totalIssues}`);
}

await main();
