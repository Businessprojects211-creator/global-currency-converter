import { describe, expect, it, afterEach } from "vitest";
import { getSiteUrl } from "@/lib/site-url";

const originalSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;

afterEach(() => {
  if (originalSiteUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
  else process.env.NEXT_PUBLIC_SITE_URL = originalSiteUrl;
});

describe("getSiteUrl", () => {
  it("uses the production domain when a Vercel URL is configured", () => {
    process.env.NEXT_PUBLIC_SITE_URL = "https://preview.vercel.app";
    expect(getSiteUrl()).toBe("https://www.globalfxconverter.com");
  });

  it("uses the production domain when no public URL is configured", () => {
    delete process.env.NEXT_PUBLIC_SITE_URL;
    expect(getSiteUrl()).toBe("https://www.globalfxconverter.com");
  });
});
