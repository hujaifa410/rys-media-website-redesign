'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '@/lib/site-data'
import { ArrowLink } from '@/components/site-shell'
import { CTASection, SectionHeading } from '@/components/editorial'

const serviceImages = ['/images/service-situation.png','/images/service-value.png','/images/service-coaching.png','/images/service-protection.png','/images/service-exit.png']
const processSteps = [
  ['01','Understand','We take time to understand your business, ambitions and commercial challenges.'],
  ['02','Analyse','We assess your current position and identify risks, opportunities and potential improvements.'],
  ['03','Strategise','We develop clear, practical strategies aligned with your personal and business objectives.'],
  ['04','Grow & Protect','We help you strengthen profitability, build lasting value and safeguard your business.'],
]

export function CinematicHome(){
  const root = useRef<HTMLDivElement>(null)
  const [activeService,setActiveService] = useState(0)

  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger)
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches
    if(reduced || !root.current) return
    const ctx = gsap.context(()=>{
      const intro = gsap.timeline({defaults:{ease:'power3.out'}})
      intro.from('.hero-wordmark-reveal',{opacity:0,y:12,duration:.28})
        .from('.hero-media',{clipPath:'inset(0 100% 0 0)',scale:1.06,duration:.8},'-=.05')
        .from('.hero-rule',{scaleX:0,duration:.55},'-=.42')
        .from('.hero-line span',{y:'110%',duration:.6,stagger:.09},'-=.38')
        .from('.hero-support > *',{opacity:0,y:18,duration:.45,stagger:.08},'-=.28')
      gsap.to('.hero-media img',{yPercent:9,ease:'none',scrollTrigger:{trigger:'.cinematic-hero',start:'top top',end:'bottom top',scrub:true}})
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach(section=>{
        gsap.from(section.querySelectorAll('.reveal-item'),{opacity:0,y:30,duration:.75,stagger:.1,ease:'power3.out',scrollTrigger:{trigger:section,start:'top 82%',once:true}})
      })
      const processTimeline = gsap.timeline({
        scrollTrigger:{trigger:'.process-section',start:'top 78%',once:true},
        defaults:{ease:'power3.out'},
      })
      processTimeline
        .from('.process-section .section-heading',{y:18,duration:.5})
        .from('.process-track-fill',{scaleX:0,duration:.9,ease:'power2.inOut'},'-=.15')
        .from('.process-marker',{scale:.72,duration:.42,stagger:.12},'-=.42')
        .from('.process-stage-content',{y:18,opacity:.68,duration:.5,stagger:.1},'-=.4')
      if(matchMedia('(min-width: 1001px)').matches){
        gsap.timeline({scrollTrigger:{trigger:'.scroll-story',start:'top top',end:'+=120%',pin:true,scrub:.7}})
          .from('.story-line:nth-child(1)',{opacity:.15,x:-30})
          .from('.story-line:nth-child(2)',{opacity:.15,x:30})
          .from('.story-line:nth-child(3)',{opacity:.15,x:-30})
          .to('.story-geometry',{rotate:7,scale:1.05},0)
      }
    },root)
    return ()=>ctx.revert()
  },[])

  return <div ref={root}>
    <section className="cinematic-hero">
      <div className="hero-media"><Image src="/images/hero-architecture.png" alt="Contemporary British commercial architecture at dusk" fill priority sizes="100vw"/></div>
      <div className="hero-grade"/><div className="hero-grid-lines" aria-hidden="true"/>
      <div className="hero-wordmark-reveal" aria-hidden="true">RYS <span>MEDIA</span></div>
      <div className="shell cinematic-hero-content">
        <div className="hero-rule"/><p className="eyebrow light">INDEPENDENT BUSINESS ADVISORY</p>
        <h1><span className="hero-line"><span>Clarity in Strategy.</span></span><span className="hero-line serif"><span>Confidence in Growth.</span></span></h1>
        <div className="hero-support"><p>Helping established business owners unlock profitability, maximise business value and protect what matters most.</p><div><ArrowLink href="/services" light>Explore Our Services</ArrowLink><ArrowLink href="/contact" light>Start a Conversation</ArrowLink></div></div>
      </div>
      <div className="cinematic-scroll"><span/><small>SCROLL TO DISCOVER</small></div>
    </section>

    <section className="section white beyond reveal-section"><div className="shell beyond-grid">
      <div className="beyond-visual reveal-item"><div className="section-index"><span>01</span><i/>05</div><h2 className="display-title">Beyond Advice.<br/><span className="serif">Towards Lasting Value.</span></h2><div className="beyond-image"><Image src="/images/advisory-meeting.png" alt="Business advisers discussing strategy in a boardroom" fill sizes="(max-width: 900px) 100vw, 48vw"/></div></div>
      <div className="beyond-copy reveal-item"><p className="eyebrow">THE RYS APPROACH</p><i className="copy-rule"/><p className="intro-copy">RYS provides specialist financial, taxation and commercial advice to established, successful owner-managed businesses. Our approach is personal, practical and always directed towards measurable business improvement.</p><p className="prose">By understanding the ambitions behind the business, we build trusted long-term relationships that help owners make better decisions, create lasting value and enjoy greater freedom.</p><ArrowLink href="/about">Discover the RYS Approach</ArrowLink></div>
    </div></section>

    <section className="section expertise reveal-section"><div className="shell"><SectionHeading eyebrow="CORE ADVISORY EXPERTISE" title="Expertise That Moves Business Forward." text="Five connected areas of advice, brought together around your objectives."/>
      <div className="services-signature"><div className="service-list">{services.map((service,i)=><Link href={`/services/${service.slug}`} key={service.slug} className={`signature-row reveal-item ${activeService===i?'is-active':''}`} onMouseEnter={()=>setActiveService(i)} onFocus={()=>setActiveService(i)}><span className="service-number">0{i+1}</span><div><h3>{service.title}</h3><p>{service.short}</p></div><ArrowUpRight/></Link>)}</div>
      <div className="service-preview" aria-live="polite">{serviceImages.map((src,i)=><Image key={src} className={activeService===i?'is-active':''} src={src} alt="" fill sizes="38vw"/>)}<div className="preview-caption"><span>0{activeService+1}</span><p>{services[activeService].title}</p></div></div></div>
    </div></section>

    <section className="scroll-story"><div className="story-image"><Image src="/images/office-architecture.png" alt="Contemporary commercial interior" fill sizes="100vw"/></div><div className="story-wash"/><div className="story-geometry" aria-hidden="true"><i/><i/><i/></div><div className="shell story-content"><p className="eyebrow light">THE ART OF BUSINESS GROWTH</p><h2><span className="story-line">Build Value.</span><span className="story-line serif">Protect What Matters.</span><span className="story-line">Plan What Comes Next.</span></h2><p>Strong businesses are built with intention. We connect the decisions of today with the freedom and opportunity of tomorrow.</p></div></section>

    <section id="how-we-work" className="section white process-section"><div className="shell process-shell"><SectionHeading eyebrow="HOW WE WORK" title="A Clear Path From Ambition to Action."/>
      <ol className="process-sequence"><li className="process-track" aria-hidden="true"><i className="process-track-fill"/></li>{processSteps.map((item)=><li className="process-stage" key={item[0]}><div className="process-marker" aria-hidden="true"><span>{item[0]}</span></div><div className="process-stage-content"><h3>{item[1]}</h3><p>{item[2]}</p></div></li>)}</ol>
    </div></section>

    <section id="our-philosophy" className="section white philosophy"><div className="shell philosophy-editorial"><blockquote>Advice built around your <em>ambitions</em> — and a relationship <em>built to last.</em></blockquote><div className="philosophy-copy"><p className="eyebrow">OUR PHILOSOPHY</p><i aria-hidden="true"/><p className="philosophy-lead">Close working relationships. Honest guidance. Practical business thinking.</p><p>At RYS MEDIA, we believe meaningful advisory relationships are built on understanding, trust and long-term commitment.</p></div></div></section>
    <CTASection/>
  </div>
}
