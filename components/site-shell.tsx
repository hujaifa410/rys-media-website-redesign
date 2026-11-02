'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react'
import { contact, nav, services } from '@/lib/site-data'

export function Wordmark({ light = false }: { light?: boolean }) {
  return <Link href="/" className={`wordmark ${light ? 'text-white' : 'text-navy'}`} aria-label="RYS MEDIA home"><span>RYS</span><i />MEDIA</Link>
}

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 40); onScroll(); addEventListener('scroll', onScroll, { passive: true }); return () => removeEventListener('scroll', onScroll) }, [])
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; const key = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false); addEventListener('keydown', key); return () => { document.body.style.overflow = ''; removeEventListener('keydown', key) } }, [open])
  return <header className={`site-header ${scrolled || open ? 'is-solid' : ''}`}>
    <div className="shell nav-inner"><Wordmark light={!scrolled && !open} />
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map(item => item.label === 'Services' ? <div className="nav-dropdown" key={item.href}><Link href={item.href}>{item.label}<ChevronDown /></Link><div className="dropdown-panel">{services.map((s, i) => <Link key={s.slug} href={`/services/${s.slug}`}><small>0{i+1}</small>{s.title}<ArrowUpRight /></Link>)}</div></div> : <Link key={item.href} href={item.href}>{item.label}</Link>)}<Link className="nav-cta" href="/contact">Book a Consultation</Link></nav>
      <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu"><span className="sr-only">Toggle menu</span>{open ? <X/> : <Menu/>}</button>
    </div>
    {open && <nav id="mobile-menu" className="mobile-nav" aria-label="Mobile navigation"><div>{nav.map((item, i) => <Link key={item.href} style={{animationDelay:`${i*60}ms`}} href={item.href} onClick={() => setOpen(false)}><small>0{i+1}</small>{item.label}</Link>)}<Link href="/contact" className="mobile-cta" onClick={() => setOpen(false)}>Book a Consultation <ArrowUpRight /></Link></div></nav>}
  </header>
}

export function SiteFooter() { return <footer className="site-footer"><div className="shell"><div className="footer-top"><div><Wordmark light/><p>Independent business advisory expertise focused on profitability, business value and long-term success.</p></div><div><h3>Navigate</h3>{nav.slice(1).map(x=><Link key={x.href} href={x.href}>{x.label}</Link>)}</div><div><h3>Expertise</h3>{services.map(x=><Link key={x.slug} href={`/services/${x.slug}`}>{x.title}</Link>)}</div><div><h3>Contact</h3><address>{contact.address.map(x=><span key={x}>{x}</span>)}</address><a href={contact.phoneHref}>{contact.phone}</a><a href={`mailto:${contact.email}`}>{contact.email}</a></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} RYS MEDIA. All rights reserved.</span><div><Link href="/privacy-policy">Privacy Policy</Link><Link href="/terms-and-conditions">Terms & Conditions</Link><Link href="/sitemap.xml">Sitemap</Link></div></div></div></footer> }

export function ArrowLink({ href, children, light=false }: { href:string; children:React.ReactNode; light?:boolean }) { return <Link className={`arrow-link ${light?'light':''}`} href={href}>{children}<ArrowUpRight /></Link> }
