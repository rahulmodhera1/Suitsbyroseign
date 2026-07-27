import type { MetadataRoute } from "next";

const siteUrl = "https://suitsbyroseign.ca";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", "/services", "/about", "/book"];
  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
