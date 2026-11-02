import type { MetadataRoute } from 'next'
import { services } from '@/lib/site-data'
export default function sitemap():MetadataRoute.Sitemap{const base=process.env.NEXT_PUBLIC_SITE_URL||'https://rys-media.com';const paths=['','/about','/services','/how-we-can-help','/clients','/contact','/privacy-policy','/terms-and-conditions',...services.map(s=>`/services/${s.slug}`)];return paths.map(path=>({url:`${base}${path}`,lastModified:new Date(),changeFrequency:'monthly',priority:path===''?1:.7}))}
