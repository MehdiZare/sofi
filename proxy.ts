import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, resolveLocale } from "@/lib/i18n";

const UTM_COOKIE = "landing_utm";
const REF_COOKIE = "landing_ref";

function withTrackingCookies(request: NextRequest, response: NextResponse) {
  const utmSource = request.nextUrl.searchParams.get("utm_source");
  const utmMedium = request.nextUrl.searchParams.get("utm_medium");
  const utmCampaign = request.nextUrl.searchParams.get("utm_campaign");
  const referral = request.nextUrl.searchParams.get("ref");

  if (utmSource || utmMedium || utmCampaign) {
    response.cookies.set(
      UTM_COOKIE,
      JSON.stringify({
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign
      }),
      {
        maxAge: 60 * 60 * 24 * 30,
        path: "/",
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
      }
    );
  }

  if (referral) {
    response.cookies.set(REF_COOKIE, referral, {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production"
    });
  }

  return response;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLocale = isLocale(pathname.split("/")[1] ?? "");

  if (!pathnameHasLocale) {
    const localeFromHeader = request.headers.get("accept-language")?.split(",")?.[0] ?? defaultLocale;
    const locale = resolveLocale(localeFromHeader);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;

    return withTrackingCookies(request, NextResponse.redirect(url));
  }

  return withTrackingCookies(request, NextResponse.next());
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"]
};
