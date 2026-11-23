import React, { useEffect, useState } from 'react'
import { brand, faqs, navLinks, pricing, processSteps, projects, services, values } from './siteConfig'

const iconPaths = {
  arrow: <><path d="M5 12h13" /><path d="m13 6 6 6-6 6" /></>,
  arrowUpRight: <><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>,
  browser: <><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 8h18" /><path d="M7 6h.01M10 6h.01M13 6h.01" /></>,
  cart: <><path d="M4 5h2l1.5 9h9.75L19 8H7" /><circle cx="9" cy="18" r="1" /><circle cx="17" cy="18" r="1" /></>,
  compass: <><circle cx="12" cy="12" r="8.5" /><path d="m15.5 8.5-2.3 4.7-4.7 2.3 2.3-4.7 4.7-2.3Z" /></>,
  code: <><path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" /></>,
  design: <><path d="M4 16.5 15.5 5a2.1 2.1 0 0 1 3 3L7 19.5 4 20l.5-3.5Z" /><path d="m13.5 7 3.5 3.5" /></>,
  grid: <><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></>,
  layers: <><path d="m12 3 8 4-8 4-8-4 8-4Z" /><path d="m4 12 8 4 8-4M4 17l8 4 8-4" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  message: <><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.6 8.6 0 0 1-3.4-.7L4 20l1.3-3.8A7.3 7.3 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" /><path d="M8 12h.01M12 12h.01M16 12h.01" /></>,
  phone: <><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M10 6h4M11 18h2" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  spark: <><path d="m12 3 1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5L12 3ZM19 16l.6 2.4L22 19l-2.4.6L19 22l-.6-2.4L16 19l2.4-.6L19 16Z" /></>,
  video: <><rect x="3" y="6" width="12" height="12" rx="2" /><path d="m10 10 4 2-4 2v-4ZM18 9l3-2v10l-3-2" /></>,
}

function Icon({ name, size = 20 }) {
  return <svg aria-hidden="true" fill="none" height={size} stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" viewBox="0 0 24 24" width={size}>{iconPaths[name]}</svg>
}

function LogoMark() {
  return <span className="logo-mark" aria-hidden="true"><span /><span /><span /></span>
}

function ButtonArrow() { return <Icon name="arrow" size={16} /> }

function whatsappUrl(message = brand.whatsappMessage) {
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`
}

function SectionIntro({ eyebrow, title, copy }) {
  return <div className="section-intro" data-reveal><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeFaq, setActiveFaq] = useState(0)
  const [sliderValue, setSliderValue] = useState(54)
  const [leadForm, setLeadForm] = useState({ name: '', business: '', whatsapp: '', email: '', service: 'Business website development', budget: '', details: '' })
  const [formMessage, setFormMessage] = useState('')

  useEffect(() => {
    const revealElements = document.querySelectorAll('[data-reveal]')
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          revealObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' })
    revealElements.forEach((element) => revealObserver.observe(element))
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { revealObserver.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  const handleLeadChange = (event) => {
    const { name, value } = event.target
    setLeadForm((current) => ({ ...current, [name]: value }))
  }

  const handleLeadSubmit = (event) => {
    event.preventDefault()
    const message = [
      'Hi Creative Code Hub, I want to discuss a project.',
      `Name: ${leadForm.name}`,
      `Business: ${leadForm.business}`,
      `WhatsApp: ${leadForm.whatsapp}`,
      `Email: ${leadForm.email || 'Not provided'}`,
      `Service: ${leadForm.service}`,
      `Budget: ${leadForm.budget || 'Not provided'}`,
      `Project details: ${leadForm.details}`,
    ].join('\n')
    const whatsappWindow = window.open(whatsappUrl(message), '_blank', 'noopener,noreferrer')
    setFormMessage(whatsappWindow ? 'WhatsApp opened with your enquiry. Please send the message there to complete your request.' : 'Your browser blocked the WhatsApp window. Please use the WhatsApp button above or call us directly.')
  }

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" aria-hidden="true" /><div className="ambient ambient-two" aria-hidden="true" />
      <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
        <a className="brand" href="#home" aria-label="Creative Code Hub home" onClick={() => setMenuOpen(false)}><LogoMark /><span className="brand-text"><strong>Creative Code Hub</strong><small>Where code meets creativity.</small></span></a>
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMenuOpen((current) => !current)}><Icon name={menuOpen ? 'plus' : 'menu'} size={22} /></button>
        <nav id="primary-navigation" className={`primary-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Primary navigation">
          {navLinks.map((link) => <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>{link.label}</a>)}
          <a className="nav-cta" href={whatsappUrl()} target="_blank" rel="noreferrer" onClick={() => setMenuOpen(false)}>Start your project <ButtonArrow /></a>
        </nav>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-content page-width">
            <div className="hero-copy" data-reveal>
              <div className="eyebrow-row"><span className="eyebrow">Digital agency · Lucknow / India</span><span className="eyebrow-dot" aria-hidden="true" /><span className="eyebrow-muted">Available for select projects</span></div>
              <h1>We build <span>websites.</span><br />You build <span>success.</span></h1>
              <p className="hero-lede">From your first idea to a powerful online presence, we build modern websites and digital experiences that help your business stand out and grow.</p>
              <div className="hero-actions"><a className="button button-primary" href={whatsappUrl()} target="_blank" rel="noreferrer">Start your project <ButtonArrow /></a><a className="button button-quiet" href="#work">Explore our work <Icon name="arrowUpRight" size={17} /></a></div>
              <div className="hero-note"><span className="status-pulse" aria-hidden="true" /><span>Design-led development</span><span className="note-divider" aria-hidden="true" /><span>WhatsApp-ready enquiries</span></div>
            </div>
            <div className="hero-visual" data-reveal>
              <div className="hero-visual-label label-top"><span /> Live website preview</div>
              <div className="hero-browser"><div className="browser-bar"><div className="browser-dots"><i /><i /><i /></div><span className="browser-address">creativecodehub.in / project-preview</span><span className="browser-signal"><span /> Live</span></div><div className="browser-screen"><img src="/allworldexpress-optimized.jpg" alt="Creative Code Hub website project preview" /><div className="browser-overlay" /><div className="browser-caption"><span className="caption-kicker">Logistics / digital experience</span><strong>Move business<br />forward.</strong><span className="caption-line" /></div></div></div>
              <div className="hero-phone" aria-hidden="true"><div className="phone-notch" /><div className="phone-screen"><span className="phone-mini-label">Creative Code Hub</span><strong>Built for<br /><em>momentum.</em></strong><div className="phone-line" /><div className="phone-stat"><span>01</span><small>Clear direction</small></div><div className="phone-stat"><span>02</span><small>Clean execution</small></div><div className="phone-orb" /></div></div>
              <div className="floating-card floating-card-top"><span className="floating-icon"><Icon name="spark" size={15} /></span><span><small>Built around</small><strong>your growth</strong></span></div><div className="floating-card floating-card-bottom"><span className="check-icon">✓</span><span><small>Mobile-first</small><strong>by default</strong></span></div>
              <div className="hero-visual-label label-bottom"><span className="label-line" /> Scroll to explore</div>
            </div>
          </div>
          <div className="hero-scroll-cue page-width" aria-hidden="true"><span /> Scroll to discover</div>
        </section>

        <section className="benefit-rail page-width" aria-label="What we build around"><div className="benefit-intro" data-reveal><span className="eyebrow">The starting point</span><strong>Every detail has a job.</strong></div>{['Custom by default', 'Mobile-first experience', 'Business-focused structure', 'WhatsApp-ready contact'].map((item, index) => <div className="benefit-item" key={item} data-reveal><span className="benefit-number">0{index + 1}</span><span>{item}</span></div>)}</section>

        <section className="section section-services page-width" id="services"><SectionIntro eyebrow="What we do" title={<>Everything your brand needs to <span>stand out.</span></>} copy="Website development leads the way. The rest of our creative toolkit helps your business look consistent, credible and ready for its next customer." /><div className="service-grid">{services.map((service, index) => <a className={`service-card ${index === 0 ? 'service-card-featured' : ''} ${index > 3 ? 'service-card-creative' : ''}`} href={service.href} key={service.title} data-reveal><div className="service-card-top"><span className="service-icon"><Icon name={service.icon} size={21} /></span><span className="card-index">0{index + 1}</span></div><div className="service-card-body"><h3>{service.title}</h3><p>{service.text}</p></div><span className="service-link">Explore service <Icon name="arrowUpRight" size={16} /></span><span className="card-glow" aria-hidden="true" /></a>)}</div><div className="service-footnote" data-reveal><span className="eyebrow">Need something specific?</span><a href={whatsappUrl('Hi Creative Code Hub, I have a custom digital project in mind.')} target="_blank" rel="noreferrer">Tell us what you are building <ButtonArrow /></a></div></section>

        <section className="section work-section page-width" id="work"><SectionIntro eyebrow="Selected work" title={<>Designed to impress.<br /><span>Built to perform.</span></>} copy="A look at the live work and carefully labelled concepts that shape our approach to digital experiences." /><div className="work-grid">{projects.map((project, index) => <article className={`project-card project-card-${index + 1} ${project.demo ? 'is-demo' : ''}`} key={project.name} data-reveal><div className="project-visual"><div className="project-visual-header"><span>{project.demo ? 'Concept direction' : 'Live project'}</span><span>{project.year}</span></div>{project.image ? <img src={project.image} alt={project.alt} loading="lazy" /> : <div className="concept-preview"><div className="concept-nav"><span>atelier</span><span>menu +</span></div><div className="concept-copy"><small>Restaurant / concept</small><strong>Taste<br /><em>the moment.</em></strong><span>Reserve a table ↗</span></div><div className="concept-orbit" /></div>}<div className="project-shade" /><a className="project-view" href={project.href} target={project.demo ? undefined : '_blank'} rel={project.demo ? undefined : 'noreferrer'}>{project.demo ? 'Start a similar project' : 'View live project'} <Icon name="arrowUpRight" size={16} /></a></div><div className="project-meta"><div><span className="project-type">{project.category}</span><h3>{project.name}</h3></div><p>{project.description}</p></div></article>)}</div><div className="work-footer" data-reveal><span>Have a project that deserves a better first impression?</span><a className="text-link" href={whatsappUrl('Hi Creative Code Hub, I would like to discuss a website project.')} target="_blank" rel="noreferrer">Let’s talk <ButtonArrow /></a></div></section>

        <section className="comparison-section page-width" id="redesign"><div className="comparison-copy" data-reveal><span className="eyebrow">The redesign mindset</span><h2>Your business has evolved.<br /><span>Has your website?</span></h2><p>When your website no longer reflects the quality of your work, we help bring the first impression back in sync.</p><a className="button button-outline" href={whatsappUrl('Hi Creative Code Hub, I want to discuss redesigning my existing website.')} target="_blank" rel="noreferrer">Discuss a redesign <ButtonArrow /></a></div><div className="comparison-wrap" data-reveal><div className="comparison-label comparison-before">Before <span>dated experience</span></div><div className="comparison-label comparison-after-label">After <span>clearer direction</span></div><div className="comparison-frame"><div className="comparison-before-layer"><div className="old-site"><div className="old-site-bar"><b>YOUR BUSINESS</b><span>Home&nbsp;&nbsp; About&nbsp;&nbsp; Services&nbsp;&nbsp; Contact</span></div><div className="old-site-body"><small>WELCOME TO OUR WEBSITE</small><strong>Quality service<br />for everyone.</strong><p>Learn more about what we do and how we can help your business.</p><button type="button">Learn more</button><div className="old-site-blocks"><i /><i /><i /></div></div></div></div><div className="comparison-after-layer" style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}><div className="new-site"><div className="new-site-bar"><span className="mini-logo"><LogoMark /> CCH</span><span>Services&nbsp;&nbsp;&nbsp; Work&nbsp;&nbsp;&nbsp; Contact</span><b>Start a project ↗</b></div><div className="new-site-body"><small>CREATIVE / DIGITAL EXPERIENCE</small><strong>Make your<br /><em>next move.</em></strong><p>A sharper digital presence for businesses ready to grow.</p><span className="new-site-cta">Explore the work <ButtonArrow /></span><div className="new-site-orb" /></div></div></div><div className="comparison-divider" style={{ left: `${sliderValue}%` }}><span>↔</span></div><label className="comparison-control" htmlFor="comparison-slider"><span className="sr-only">Compare before and after website design</span><input id="comparison-slider" type="range" min="8" max="92" value={sliderValue} onChange={(event) => setSliderValue(Number(event.target.value))} /></label></div><div className="comparison-hint"><span>Drag to compare</span><span>{sliderValue}%</span></div></div></section>

        <section className="section values-section page-width" id="about"><SectionIntro eyebrow="Why Creative Code Hub" title={<>More than a website.<br /><span>A digital partner.</span></>} copy="We bring design, development and practical business thinking into one clear process—so you always know what is being built and why it matters." /><div className="values-layout"><div className="values-statement" data-reveal><span className="statement-mark">“</span><p>Beautiful websites are only useful when they make your business easier to trust.</p><span className="statement-rule" /></div><div className="values-list">{values.map((value, index) => <article className="value-row" key={value.title} data-reveal><span className="value-index">0{index + 1}</span><div><h3>{value.title}</h3><p>{value.text}</p></div><Icon name="arrowUpRight" size={18} /></article>)}</div></div></section>

        <section className="section process-section page-width" id="process"><SectionIntro eyebrow="Our process" title={<>From idea to launch.<br /><span>Made simple.</span></>} copy="A straightforward five-step process that keeps the project moving and the decisions understandable." /><div className="process-list">{processSteps.map((step, index) => <article className="process-step" key={step.title} data-reveal><div className="process-step-number">0{index + 1}</div><div className="process-step-copy"><h3>{step.title}</h3><p>{step.text}</p></div><div className="process-step-marker"><span /></div></article>)}</div></section>

        <section className="investment-section page-width" id="pricing"><div className="investment-heading" data-reveal><span className="eyebrow">Starting investment</span><h2>Professional websites.<br /><span>Accessible investment.</span></h2><p>Every project is scoped around your pages, content, integrations and goals. No confusing packages, no surprise promises.</p></div><div className="pricing-grid">{pricing.map((item, index) => <article className={`pricing-card ${index === 0 ? 'pricing-card-featured' : ''}`} key={item.title} data-reveal><div className="pricing-top"><span className="pricing-index">0{index + 1}</span>{index === 0 && <span className="pricing-badge">Most requested</span>}</div><h3>{item.title}</h3><p>{item.text}</p><strong className="pricing-value">{item.price}</strong><a href={whatsappUrl(`Hi Creative Code Hub, I am interested in ${item.title}. Please share the next steps.`)} target="_blank" rel="noreferrer">Discuss this service <ButtonArrow /></a></article>)}</div></section>

        <section className="section faq-section page-width" id="faq"><SectionIntro eyebrow="Questions, answered" title={<>A little more clarity<br /><span>before we start.</span></>} copy="If you are not sure what you need yet, that is okay. We can figure out the right starting point together." /><div className="faq-layout"><div className="faq-side" data-reveal><span className="faq-symbol">?</span><p>Still have a question?</p><a href={whatsappUrl('Hi Creative Code Hub, I have a question about starting a project.')} target="_blank" rel="noreferrer">Ask us on WhatsApp <ButtonArrow /></a></div><div className="faq-list">{faqs.map((faq, index) => { const open = activeFaq === index; return <div className={`faq-item ${open ? 'is-open' : ''}`} key={faq.question} data-reveal><h3><button type="button" aria-expanded={open} aria-controls={`faq-answer-${index}`} onClick={() => setActiveFaq(open ? -1 : index)}><span>{faq.question}</span><span className="faq-plus"><Icon name="plus" size={17} /></span></button></h3><div id={`faq-answer-${index}`} className="faq-answer" hidden={!open}><p>{faq.answer}</p></div></div> })}</div></div></section>

        <section className="final-cta page-width" id="contact"><div className="final-cta-glow" aria-hidden="true" /><div className="final-cta-content" data-reveal><span className="eyebrow">Your next big step starts online.</span><h2>Let’s build something<br /><span>worth clicking into.</span></h2><p>Tell us what you are building. We will help you find the clearest, most useful next step.</p><a className="button button-light" href={whatsappUrl()} target="_blank" rel="noreferrer">Let’s talk on WhatsApp <ButtonArrow /></a></div><div className="final-cta-mark" aria-hidden="true"><LogoMark /><span>EST. FOR<br />FORWARD THINKERS</span></div></section>

        <section className="contact-section page-width"><div className="contact-copy" data-reveal><span className="eyebrow">Start a conversation</span><h2>Have a project<br /><span>in mind?</span></h2><p>Share a few details and WhatsApp will open with your enquiry ready to send. That keeps the first step quick, personal and transparent.</p><div className="contact-details"><a href={`mailto:${brand.email}`}><span className="contact-icon"><Icon name="message" size={17} /></span><span><small>Email</small><strong>{brand.email}</strong></span></a>{brand.phoneNumbers.map((number) => <a href={`tel:${number.value}`} key={number.value}><span className="contact-icon"><Icon name="phone" size={17} /></span><span><small>{number.label}</small><strong>{number.display}</strong></span></a>)}</div></div><form className="lead-form" onSubmit={handleLeadSubmit} data-reveal><div className="form-heading"><span className="eyebrow">Project enquiry</span><p>Required fields are marked with <b>*</b>.</p></div><div className="form-grid"><label>Full name *<input required name="name" value={leadForm.name} onChange={handleLeadChange} placeholder="Your name" /></label><label>Business name *<input required name="business" value={leadForm.business} onChange={handleLeadChange} placeholder="Your business" /></label><label>WhatsApp number *<input required name="whatsapp" value={leadForm.whatsapp} onChange={handleLeadChange} placeholder="+91 ..." type="tel" /></label><label>Email address<input name="email" value={leadForm.email} onChange={handleLeadChange} placeholder="you@business.com" type="email" /></label><label>Service required *<select required name="service" value={leadForm.service} onChange={handleLeadChange}><option>Business website development</option><option>Landing page development</option><option>E-commerce website</option><option>Website redesign</option><option>Creative design / branding</option><option>Something custom</option></select></label><label>Approximate budget<select name="budget" value={leadForm.budget} onChange={handleLeadChange}><option value="">Choose if you know</option><option>Starting at ₹5,000</option><option>₹10,000 – ₹25,000</option><option>₹25,000+</option><option>Not sure yet</option></select></label><label className="form-full">Project details *<textarea required name="details" value={leadForm.details} onChange={handleLeadChange} placeholder="What would you like to build or improve?" rows="5" /></label></div><button className="button button-primary form-submit" type="submit">Open WhatsApp enquiry <ButtonArrow /></button>{formMessage && <p className="form-message" role="status">{formMessage}</p>}</form></section>
      </main>

      <footer className="site-footer page-width"><div className="footer-top"><a className="brand" href="#home"><LogoMark /><span className="brand-text"><strong>Creative Code Hub</strong><small>Where code meets creativity.</small></span></a><p>Beautiful websites. Better business opportunities.</p><a className="footer-back-top" href="#home">Back to top <Icon name="arrowUpRight" size={16} /></a></div><div className="footer-grid"><div><span className="footer-label">Explore</span><a href="#services">Services</a><a href="#work">Selected work</a><a href="#process">Our process</a><a href="#faq">FAQs</a></div><div><span className="footer-label">Services</span>{services.slice(0, 4).map((service) => <a href={service.href} key={service.title}>{service.title}</a>)}</div><div><span className="footer-label">Start here</span><a href={whatsappUrl()} target="_blank" rel="noreferrer">Chat on WhatsApp</a><a href={`mailto:${brand.email}`}>{brand.email}</a>{brand.phoneNumbers.map((number) => <a href={`tel:${number.value}`} key={number.value}>{number.display}</a>)}<span className="footer-note">Privacy & terms shared before project start.</span></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Creative Code Hub. All rights reserved.</span><span>Built with intention in Lucknow, India.</span></div></footer>
      <a className="floating-whatsapp" href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Chat with Creative Code Hub on WhatsApp"><Icon name="message" size={20} /><span>Let’s talk</span></a>
    </div>
  )
}

export default App
