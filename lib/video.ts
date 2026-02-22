const CLOUDFLARE_STREAM_HOST_SUFFIX = ".cloudflarestream.com";

export function withHiddenCloudflareControls(src?: string): string | undefined {
  if (!src) {
    return undefined;
  }

  try {
    const url = new URL(src);

    if (!url.hostname.endsWith(CLOUDFLARE_STREAM_HOST_SUFFIX)) {
      return src;
    }

    url.searchParams.set("controls", "false");
    return url.toString();
  } catch {
    if (!src.includes("cloudflarestream.com")) {
      return src;
    }

    const [base, hash] = src.split("#", 2);
    const hasControlsParam = /([?&])controls=/.test(base);
    const withControlsHidden = hasControlsParam
      ? base.replace(/([?&])controls=[^&]*/g, "$1controls=false")
      : `${base}${base.includes("?") ? "&" : "?"}controls=false`;

    return hash ? `${withControlsHidden}#${hash}` : withControlsHidden;
  }
}
