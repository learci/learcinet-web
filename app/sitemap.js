export default function sitemap() {
  const baseUrl = "https://learcinet.com";
  return ["", "/services", "/workspace", "/contact", "/privacy", "/terms"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
