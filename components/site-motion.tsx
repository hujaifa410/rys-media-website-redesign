'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function SiteMotion(){
  const pathname=usePathname()
  useEffect(()=>{
    gsap.registerPlugin(ScrollTrigger)
    if(matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const context=gsap.context(()=>{
      gsap.from('.page-hero-content > *',{opacity:0,y:28,duration:.7,stagger:.1,ease:'power3.out'})
      gsap.from('.page-hero > img',{scale:1.045,duration:1.2,ease:'power2.out'})
      gsap.utils.toArray<HTMLElement>('main > section:not(.page-hero):not(.cinematic-hero)').forEach(section=>{
        const children=section.querySelectorAll('.section-heading, .content-grid > *, .intro-grid > *, .value-card, .service-row, .contact-grid > *')
        if(children.length) gsap.from(children,{opacity:0,y:24,duration:.7,stagger:.08,ease:'power3.out',scrollTrigger:{trigger:section,start:'top 86%',once:true}})
      })
    })
    return ()=>context.revert()
  },[pathname])
  return null
}
