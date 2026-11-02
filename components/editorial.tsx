import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { services } from '@/lib/site-data'
import { ArrowLink } from './site-shell'

export function PageHero({ eyebrow, title, text, image='/images/office-architecture.png' }: {eyebrow:string;title:string;text?:string;image?:string}) { return <section className="page-hero"><Image src={image} alt="Contemporary architecture" fill priority sizes="100vw"/><div className="page-hero-overlay"/><div className="shell page-hero-content"><p className="eyebrow light">{eyebrow}</p><h1>{title}</h1>{text&&<p className="hero-copy">{text}</p>}</div></section> }
export function SectionHeading({ eyebrow, title, text, invert=false }: {eyebrow:string;title:string;text?:string;invert?:boolean}) { return <div className={`section-heading ${invert?'invert':''}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{text&&<p>{text}</p>}</div> }
export function CTASection(){return <section className="cta-section"><div className="shell cta-grid"><p className="eyebrow light">A CONVERSATION WORTH HAVING</p><div><h2>Your Next Chapter<br/><em>Starts With a Conversation.</em></h2><p>Whether your goal is increased profitability, stronger business value or a carefully planned exit, we welcome the opportunity to discuss your ambitions.</p><div className="cta-actions"><ArrowLink href="/contact" light>Let&apos;s Talk</ArrowLink><a href="tel:+441772657994">Call 01772 657994</a></div></div></div></section>}
export function ServiceRows({ limit }: {limit?:number}) { return <div className="service-rows">{services.slice(0,limit).map((service,i)=><Link href={`/services/${service.slug}`} key={service.slug} className="service-row"><span>0{i+1}</span><div><h3>{service.title}</h3><p>{service.short}</p></div><ArrowUpRight/></Link>)}</div> }
