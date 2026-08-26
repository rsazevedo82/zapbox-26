import type { MetadataRoute } from "next";

import { SITE_CONFIG } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const lastModified = new Date();

  return [
    { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1.0 },
    {
      url: `${baseUrl}/crm-vendas`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${baseUrl}/sales-ai`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    {
      url: `${baseUrl}/automacoes`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/integracoes`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacidade`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    { url: `${baseUrl}/termos`, lastModified, changeFrequency: "monthly", priority: 0.3 },
  ];
}
