import { readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";

type ClassVideoUploadTarget = {
  slug: string;
  groupSlug: string;
  envBase: string;
  sourceRelativePath: string;
};

type CloudflareUploadResponse = {
  success: boolean;
  errors: Array<{ message?: string }>;
  result?: {
    uid: string;
  };
};

type StreamMappingRecord = {
  slug: string;
  groupSlug: string;
  sourceRelativePath: string;
  cleanedName: string;
  streamId: string;
  iframeUrl: string;
  streamIdEnvVar: string;
  iframeEnvVar: string;
};

const projectRoot = process.cwd();
const envFilePath = path.join(projectRoot, ".env.local");
const mappingOutputPath = path.join(projectRoot, "docs", "cloudflare-stream-map.json");

const classVideos: ClassVideoUploadTarget[] = [
  {
    slug: "hot-power-flow",
    groupSlug: "hot-yoga",
    envBase: "HOT_POWER_FLOW",
    sourceRelativePath: "docs/Website/1.Hot Yoga/Hot Power Flow.mp4"
  },
  {
    slug: "hot-yoga-sculpt",
    groupSlug: "hot-yoga",
    envBase: "HOT_YOGA_SCULPT",
    sourceRelativePath: "docs/Website/1.Hot Yoga/Hot Yoga + Sculpt.mp4"
  },
  {
    slug: "dumbbell-sculpt",
    groupSlug: "strength-fundamentals",
    envBase: "DUMBBELL_SCULPT",
    sourceRelativePath: "docs/Website/2.STRENGTH FUNDAMENTALS/Dumbbell Sculpt.mp4"
  },
  {
    slug: "core-glutes",
    groupSlug: "strength-fundamentals",
    envBase: "CORE_GLUTES",
    sourceRelativePath: "docs/Website/2.STRENGTH FUNDAMENTALS/Core + Glutes.mp4"
  },
  {
    slug: "upper-body-posture",
    groupSlug: "strength-fundamentals",
    envBase: "UPPER_BODY_POSTURE",
    sourceRelativePath: "docs/Website/2.STRENGTH FUNDAMENTALS/Upper Body + Posture.mp4"
  },
  {
    slug: "baby-me-foundations",
    groupSlug: "mom-dad-baby",
    envBase: "BABY_ME_FOUNDATIONS",
    sourceRelativePath: "docs/Website/3.MOM_DAD + BABY/Baby + Me Foundations2.mp4"
  },
  {
    slug: "baby-me-strong",
    groupSlug: "mom-dad-baby",
    envBase: "BABY_ME_STRONG",
    sourceRelativePath: "docs/Website/3.MOM_DAD + BABY/Baby + Me Strong2.mp4"
  },
  {
    slug: "mobility-reset",
    groupSlug: "mobility-recovery",
    envBase: "MOBILITY_RESET",
    sourceRelativePath: "docs/Website/4.MOBILITY + RECOVERY/Mobility Reset.mp4"
  },
  {
    slug: "deep-stretch-restore",
    groupSlug: "mobility-recovery",
    envBase: "DEEP_STRETCH_RESTORE",
    sourceRelativePath: "docs/Website/4.MOBILITY + RECOVERY/Deep Stretch Restore.mp4"
  },
  {
    slug: "yin-release",
    groupSlug: "mobility-recovery",
    envBase: "YIN_RELEASE",
    sourceRelativePath: "docs/Website/4.MOBILITY + RECOVERY/Yin + Release.mp4"
  },
  {
    slug: "recovery-flow",
    groupSlug: "mobility-recovery",
    envBase: "RECOVERY_FLOW",
    sourceRelativePath: "docs/Website/4.MOBILITY + RECOVERY/Recovery Flow.mp4"
  }
];

function sanitizeForCloudflareName(input: string): string {
  return input
    .trim()
    .replace(/\.[A-Za-z0-9]+$/, "")
    .replace(/[0-9]+$/g, "")
    .replace(/\+/g, " plus ")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();
}

function normalizeCustomerSubdomain(raw: string): string {
  return raw.endsWith(".cloudflarestream.com") ? raw : `${raw}.cloudflarestream.com`;
}

function buildIframeUrl(customerSubdomain: string, streamId: string): string {
  const normalizedCustomerSubdomain = normalizeCustomerSubdomain(customerSubdomain);
  const poster = encodeURIComponent(
    `https://${normalizedCustomerSubdomain}/${streamId}/thumbnails/thumbnail.jpg?time=&height=600`
  );

  return `https://${normalizedCustomerSubdomain}/${streamId}/iframe?muted=true&preload=true&loop=true&autoplay=true&poster=${poster}`;
}

function upsertEnvVar(envContent: string, key: string, value: string): string {
  const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const matcher = new RegExp(`^${escapedKey}=.*$`, "m");
  const nextLine = `${key}=${value}`;

  if (matcher.test(envContent)) {
    return envContent.replace(matcher, nextLine);
  }

  const suffix = envContent.endsWith("\n") || envContent.length === 0 ? "" : "\n";
  return `${envContent}${suffix}${nextLine}\n`;
}

async function verifyCloudflareToken(apiToken: string): Promise<void> {
  const response = await fetch("https://api.cloudflare.com/client/v4/user/tokens/verify", {
    headers: {
      Authorization: `Bearer ${apiToken}`
    }
  });

  if (!response.ok) {
    throw new Error(`Token verify request failed with HTTP ${response.status}`);
  }

  const payload = (await response.json()) as { success?: boolean; errors?: Array<{ message?: string }> };

  if (!payload.success) {
    const firstError = payload.errors?.[0]?.message ?? "Unknown Cloudflare token verification error";
    throw new Error(`Cloudflare token verification failed: ${firstError}`);
  }
}

async function uploadVideo(
  accountId: string,
  apiToken: string,
  customerSubdomain: string,
  target: ClassVideoUploadTarget
): Promise<StreamMappingRecord> {
  const filePath = path.join(projectRoot, target.sourceRelativePath);
  await stat(filePath);

  const originalFileName = path.basename(target.sourceRelativePath);
  const canonicalName = sanitizeForCloudflareName(`${target.groupSlug}-${target.slug}`);
  const cleanedName = canonicalName || sanitizeForCloudflareName(originalFileName);

  const fileBuffer = await readFile(filePath);
  const form = new FormData();
  form.append("file", new Blob([fileBuffer]), originalFileName);
  form.append("meta", JSON.stringify({ name: cleanedName }));

  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/stream`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`
    },
    body: form
  });

  if (!response.ok) {
    throw new Error(`Upload failed for ${target.slug} with HTTP ${response.status}`);
  }

  const payload = (await response.json()) as CloudflareUploadResponse;

  if (!payload.success || !payload.result?.uid) {
    const firstError = payload.errors?.[0]?.message ?? "Unknown Cloudflare upload error";
    throw new Error(`Upload failed for ${target.slug}: ${firstError}`);
  }

  const streamId = payload.result.uid;
  const streamIdEnvVar = `NEXT_PUBLIC_CLOUDFLARE_${target.envBase}_STREAM_ID`;
  const iframeEnvVar = `NEXT_PUBLIC_CLOUDFLARE_${target.envBase}_IFRAME_URL`;

  return {
    slug: target.slug,
    groupSlug: target.groupSlug,
    sourceRelativePath: target.sourceRelativePath,
    cleanedName,
    streamId,
    iframeUrl: buildIframeUrl(customerSubdomain, streamId),
    streamIdEnvVar,
    iframeEnvVar
  };
}

async function main() {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();
  const apiToken = process.env.CLOUDFLARE_API_TOKEN?.trim();
  const customerSubdomain = process.env.CLOUDFLARE_CUSTOMER_SUBDOMAIN?.trim();

  if (!accountId || !apiToken || !customerSubdomain) {
    throw new Error(
      "Missing required env vars. Ensure CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN, and CLOUDFLARE_CUSTOMER_SUBDOMAIN are set."
    );
  }

  await verifyCloudflareToken(apiToken);

  const records: StreamMappingRecord[] = [];

  for (const target of classVideos) {
    const record = await uploadVideo(accountId, apiToken, customerSubdomain, target);
    records.push(record);
    console.log(`Uploaded ${record.slug} -> ${record.streamId}`);
  }

  const mappingDocument = {
    generatedAt: new Date().toISOString(),
    customerSubdomain: normalizeCustomerSubdomain(customerSubdomain),
    records
  };

  await writeFile(mappingOutputPath, `${JSON.stringify(mappingDocument, null, 2)}\n`, "utf8");

  let envContent: string;

  try {
    envContent = await readFile(envFilePath, "utf8");
  } catch {
    envContent = "";
  }

  for (const record of records) {
    envContent = upsertEnvVar(envContent, record.streamIdEnvVar, record.streamId);
    envContent = upsertEnvVar(envContent, record.iframeEnvVar, record.iframeUrl);
  }

  // Backward-compatible alias used by existing homepage fallback logic.
  const hotPowerFlow = records.find((record) => record.slug === "hot-power-flow");
  if (hotPowerFlow) {
    envContent = upsertEnvVar(
      envContent,
      "NEXT_PUBLIC_CLOUDFLARE_YOGA_IFRAME_URL",
      hotPowerFlow.iframeUrl
    );
  }

  await writeFile(envFilePath, envContent, "utf8");

  console.log(`\nSaved stream mapping to ${path.relative(projectRoot, mappingOutputPath)}`);
  console.log(`Updated ${path.relative(projectRoot, envFilePath)} with ${records.length} class stream entries.`);
}

await main();
