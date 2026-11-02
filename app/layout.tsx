import type { Metadata, Viewport } from 'next'
import { Manrope, DM_Serif_Display } from 'next/font/google'
import { SiteFooter, SiteHeader } from '@/components/site-shell'
import './globals.css'

const manrope = Manrope({ subsets:['latin'], variable:'--font-sans' })
const serif = DM_Serif_Display({ weight:'400', subsets:['latin'], variable:'--font-serif' })
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://rys-media.com'
export const metadata: Metadata = { metadataBase:new URL(siteUrl), title:{default:'RYS MEDIA | Independent Business Advisory',template:'%s | RYS MEDIA'}, description:'Independent business advisory expertise for established owner-managed businesses in Preston and across the UK.', openGraph:{type:'website',locale:'en_GB',siteName:'RYS MEDIA'}, twitter:{card:'summary_large_image'} }
export const viewport: Viewport = { themeColor:'#071F34', colorScheme:'light', width:'device-width', initialScale:1 }
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body className={`${manrope.variable} ${serif.variable}`}><SiteHeader/><main>{children}</main><SiteFooter/></body></html> }
