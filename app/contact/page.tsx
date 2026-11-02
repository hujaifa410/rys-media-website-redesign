import type { Metadata } from 'next'
import { PageHero } from '@/components/editorial'
import { ContactForm } from '@/components/contact-form'
import { contact } from '@/lib/site-data'
export const metadata:Metadata={title:'Contact',description:'Speak with RYS MEDIA about your business ambitions and advisory needs.'}
export default function Contact(){return <><PageHero eyebrow="CONTACT RYS MEDIA" title="Let’s Talk About What Comes Next." text="A confidential, no-obligation conversation is often the best place to begin."/><section className="section white"><div className="shell contact-grid"><div className="contact-details"><p className="eyebrow">GET IN TOUCH</p><h3>RYS MEDIA</h3><address>{contact.address.map(x=><span key={x}>{x}</span>)}</address><a href={contact.phoneHref}>{contact.phone}</a><a href={`mailto:${contact.email}`}>{contact.email}</a><p className="prose">Complete the form and a member of our team will respond as soon as possible.</p></div><ContactForm/></div></section></>}
