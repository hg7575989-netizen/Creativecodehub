import { useEffect, useState } from 'react'
import './App.css'

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

const trustStats = [
  { value: '50+', label: 'Projects launched' },
  { value: '3-7 Days', label: 'Average delivery' },
  { value: '100%', label: 'Client-first support' },
  { value: '24/7', label: 'WhatsApp response window' },
]

const clientLogos = [
  'Hopefully',
  'All World Express',
  'Nova Dental',
  'Urban Lift',
  'Pixel Brew',
]

const services = [
  {
    icon: 'monitor',
    title: 'Website Development',
    text: 'Get a professional, fast, and SEO-friendly website that converts visitors into customers.',
    accent: 'cyan',
  },
  {
    icon: 'heart',
    title: 'Social Media Marketing',
    text: 'Grow your audience and generate leads through targeted social media campaigns.',
    accent: 'pink',
  },
  {
    icon: 'chart',
    title: 'SEO & Local Ranking',
    text: 'Boost your visibility on Google and attract more local customers searching for your services.',
    accent: 'cyan',
  },
  {
    icon: 'video',
    title: 'Video Editing',
    text: 'Engage your viewers with attention-grabbing videos designed to retain and convert.',
    accent: 'cyan',
  },
  {
    icon: 'youtube',
    title: 'YouTube Automation',
    text: 'Strategize, automate, and scale your YouTube channel to grow subscribers and views.',
    accent: 'cyan',
  },
  {
    icon: 'spark',
    title: 'Branding & Design',
    text: 'Create a memorable brand with custom logos and designs that stand out.',
    accent: 'pink',
  },
]

const renderServiceIcon = (icon) => {
  const commonProps = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.8',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  }

  switch (icon) {
    case 'monitor':
      return (
        <svg {...commonProps}>
          <rect x="3" y="5" width="18" height="12" rx="2"></rect>
          <path d="M8 20h8"></path>
          <path d="M12 17v3"></path>
        </svg>
      )
    case 'heart':
      return (
        <svg {...commonProps}>
          <path d="M12 20s-6.5-4.2-8.4-8A4.9 4.9 0 0 1 12 6a4.9 4.9 0 0 1 8.4 6c-1.9 3.8-8.4 8-8.4 8Z"></path>
        </svg>
      )
    case 'chart':
      return (
        <svg {...commonProps}>
          <path d="M5 18V9"></path>
          <path d="M10 18V6"></path>
          <path d="M15 18v-4"></path>
          <path d="M4 18h12"></path>
          <circle cx="18" cy="8" r="3"></circle>
          <path d="m20.5 10.5 2 2"></path>
        </svg>
      )
    case 'video':
      return (
        <svg {...commonProps}>
          <rect x="3" y="6" width="12" height="12" rx="2"></rect>
          <path d="m10 10 4 2-4 2z"></path>
          <path d="M18 9v6"></path>
          <path d="M21 12h-6"></path>
        </svg>
      )
    case 'youtube':
      return (
        <svg {...commonProps}>
          <rect x="3" y="7" width="14" height="10" rx="3"></rect>
          <path d="m10 10 4 2-4 2z"></path>
          <circle cx="19" cy="14" r="2"></circle>
          <path d="M19 10v1"></path>
          <path d="M19 17v1"></path>
          <path d="M16.2 11.2l.7.7"></path>
          <path d="M21.1 16.1l.7.7"></path>
          <path d="M21.8 11.2l-.7.7"></path>
          <path d="M16.9 16.1l-.7.7"></path>
        </svg>
      )
    case 'spark':
      return (
        <svg {...commonProps}>
          <path d="m6 18 8-8"></path>
          <path d="m14 7 3-3"></path>
          <path d="M15 5h3"></path>
          <path d="M16.5 3.5v3"></path>
          <path d="M6 15h3"></path>
          <path d="M7.5 13.5v3"></path>
          <path d="M17 16h4"></path>
          <path d="M19 14v4"></path>
        </svg>
      )
    default:
      return null
  }
}

const differentiators = [
  {
    title: 'Fast delivery',
    text: 'We ship focused websites in days, not months, so you start collecting leads sooner.',
  },
  {
    title: 'Affordable pricing',
    text: 'Clear packages, clean scope and smart execution keep costs practical for growing businesses.',
  },
  {
    title: 'Result focused',
    text: 'Every section pushes one job: make visitors trust you and take action confidently.',
  },
  {
    title: 'Growth minded',
    text: 'Mobile-first layouts, SEO-ready structure and easy CTA paths support long-term business growth.',
  },
]

const portfolio = [
  {
    name: 'Hopefully',
    category: 'Lead generation website',
    outcome: 'High conversion funnel',
    note: 'Live project - real client work',
    liveUrl: 'https://hopefully.in/',
    preview: '/hopefully-optimized.jpg',
    previewAlt: 'Insert Hopefully website screenshot here',
    placeholder: 'Insert Hopefully hero screenshot here',
    previewWidth: 1200,
    previewHeight: 595,
  },
  {
    name: 'All World Express',
    category: 'Logistics system website',
    outcome: 'Custom business solution',
    note: 'Live project - real client work',
    liveUrl: 'https://allworldexpress.in/',
    preview: '/allworldexpress-optimized.jpg',
    previewAlt: 'Insert All World Express website screenshot here',
    placeholder: 'Insert All World Express hero screenshot here',
    previewWidth: 1200,
    previewHeight: 598,
  },
  {
    name: 'Your Business Could Be Next',
    category: 'Growth-focused website',
    outcome: 'Launch a premium site built to convert',
    note: 'Your next project can become the proof piece here',
    liveUrl: '#contact',
    previewAlt: 'Creative Code Hub next project teaser',
    isFutureProject: true,
  },
]

const testimonials = [
  {
    quote:
      'Creative Code Hub gave us a site that finally looks premium and actually gets leads from mobile visitors.',
    name: 'Ritika Sharma',
    role: 'Salon Owner',
    avatar: 'RS',
    business: 'Beauty & salon',
  },
  {
    quote:
      'The team moved fast, understood the business angle, and built a page that feels designed to convert.',
    name: 'Aman Verma',
    role: 'Real Estate Consultant',
    avatar: 'AV',
    business: 'Real estate',
  },
]

// Replace this demo number before publishing the website.
const whatsappLink =
  'https://wa.me/916393956624?text=Hi%20Creative%20Code%20Hub%2C%20I%20want%20a%20high-converting%20website.'

const googleFormConfig = {
  // Replace these placeholders with your Google Form formResponse URL and entry IDs.
  formAction: 'PASTE_YOUR_GOOGLE_FORM_RESPONSE_URL_HERE',
  fields: {
    name: 'PASTE_NAME_ENTRY_ID',
    businessType: 'PASTE_BUSINESS_TYPE_ENTRY_ID',
    whatsapp: 'PASTE_WHATSAPP_ENTRY_ID',
    message: 'PASTE_MESSAGE_ENTRY_ID',
  },
}

const initialLeadForm = {
  name: '',
  businessType: '',
  whatsapp: '',
  message: '',
}

const hasGoogleSheetsSetup = () =>
  Boolean(
    googleFormConfig.formAction &&
      !googleFormConfig.formAction.includes('PASTE_') &&
      Object.values(googleFormConfig.fields).every((value) => value && !value.includes('PASTE_')),
  )

const buildLeadMessage = (leadForm) =>
  [
    'Hi Creative Code Hub, I want to discuss a website project.',
    `Name: ${leadForm.name || 'Not provided'}`,
    `Business type: ${leadForm.businessType || 'Not provided'}`,
    `WhatsApp: ${leadForm.whatsapp || 'Not provided'}`,
    `Message: ${leadForm.message || 'Not provided'}`,
  ].join('\n')

function App() {
  const [leadForm, setLeadForm] = useState(initialLeadForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitState, setSubmitState] = useState({
    type: '',
    message: '',
  })

  useEffect(() => {
    const revealElements = document.querySelectorAll('[data-reveal]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.16,
        rootMargin: '0px 0px -48px 0px',
      },
    )

    revealElements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  const handleLeadFieldChange = (event) => {
    const { name, value } = event.target
    setLeadForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleLeadSubmit = async (event) => {
    event.preventDefault()
    setSubmitState({
      type: '',
      message: '',
    })
    setIsSubmitting(true)

    const whatsappMessage = encodeURIComponent(buildLeadMessage(leadForm))

    try {
      if (hasGoogleSheetsSetup()) {
        const formPayload = new URLSearchParams({
          [googleFormConfig.fields.name]: leadForm.name,
          [googleFormConfig.fields.businessType]: leadForm.businessType,
          [googleFormConfig.fields.whatsapp]: leadForm.whatsapp,
          [googleFormConfig.fields.message]: leadForm.message,
        })

        await fetch(googleFormConfig.formAction, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
          body: formPayload,
        })

        setLeadForm(initialLeadForm)
        setSubmitState({
          type: 'success',
          message: 'Thanks, your project enquiry has been submitted.',
        })
      } else {
        window.open(
          `https://wa.me/916393956624?text=${whatsappMessage}`,
          '_blank',
          'noopener,noreferrer',
        )

        setSubmitState({
          type: 'info',
          message: 'WhatsApp opened so you can complete the enquiry right away.',
        })
      }
    } catch {
      setSubmitState({
        type: 'error',
        message: 'Something went wrong. Please try WhatsApp or call directly.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="app-shell">
      <header className="topbar" data-reveal>
        <a className="brand" href="#home" aria-label="Creative Code Hub home">
          <span className="brand-mark">C</span>
          <span className="brand-copy">
            <strong>Creative Code Hub</strong>
            <small>Websites that convert</small>
          </span>
        </a>

        <nav className="topnav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className="button button-primary button-compact" href={whatsappLink}>
          WhatsApp Now
        </a>
      </header>

      <main>
        <section className="hero-section" id="home" data-reveal>
          <div className="hero-glow hero-glow-one" aria-hidden="true"></div>
          <div className="hero-glow hero-glow-two" aria-hidden="true"></div>

          <div className="hero-copy">
            <span className="eyebrow">Creative Code Hub</span>
            <h1>Get a Website That Brings You Clients in 7 Days</h1>
            <div className="hero-offer-stack">
              <p className="hero-offer">Starting at Rs. 6,999</p>
              <p className="hero-offer">Delivered Fast & Optimized for Leads</p>
            </div>

            <div className="hero-actions">
              <a className="button button-primary hero-button-main" href={whatsappLink}>
                Start on WhatsApp
              </a>
            </div>

            <ul className="hero-checklist">
              <li>Mobile-Friendly</li>
              <li>SEO Optimized</li>
              <li>Results in 3-7 Days</li>
            </ul>
          </div>

          <div className="hero-visual hero-visual-showcase" aria-label="All World Express website showcase">
            <div className="hero-window-frame">
              <div className="hero-window-screen">
                <img
                  src="/allworldexpress-optimized.jpg"
                  alt="All World Express website preview"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  width="1200"
                  height="598"
                />
              </div>
            </div>

            <div className="hero-metric-badge">
              <span className="hero-metric-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M8 16c-1.6-3.8 1.3-8.5 8.7-11 .2 7.5-2.5 10.4-6.2 10.5L8 16Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 15 7 17"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M10.5 13.5 8 16"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  <circle cx="14.5" cy="9.5" r="1.4" fill="currentColor" stroke="none"></circle>
                </svg>
              </span>
              <span className="hero-metric-copy">
                <strong>+42%</strong>
                <small>Leads</small>
              </span>
            </div>
          </div>
        </section>

        <section className="trust-bar" data-reveal>
          {trustStats.map((item) => (
            <article key={item.label} className="trust-item">
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </section>

        <section className="logo-strip glass-card" data-reveal aria-label="Trusted brands">
          <span className="logo-strip-title">Trusted by growing brands</span>
          <div className="logo-strip-items">
            {clientLogos.map((logo) => (
              <span key={logo}>{logo}</span>
            ))}
          </div>
        </section>

        <section className="section" id="services" data-reveal>
          <div className="services-intro">
            <span className="eyebrow">Our Services</span>
            <h2>Our Services</h2>
            <p>Everything you need to grow your business online</p>
          </div>

          <div className="services-shell" data-reveal>
            <div className="service-grid">
              {services.map((service) => (
                <article
                  key={service.title}
                  className={`service-card service-card-${service.accent}`}
                  data-reveal
                >
                  <div className={`service-icon service-icon-${service.accent}`} aria-hidden="true">
                    {renderServiceIcon(service.icon)}
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <a
                    className={`service-link service-link-${service.accent}`}
                    href="#contact"
                  >
                    Learn More
                  </a>
                </article>
              ))}
            </div>
          </div>

          <div className="section-cta glass-card" data-reveal>
            <div>
              <span className="eyebrow">Need custom software too?</span>
              <h3>We also build dashboards, admin panels, portals and custom business tools.</h3>
            </div>
            <div className="section-cta-actions">
              <a className="button button-primary" href="#contact">
                Start Your Project
              </a>
              <a className="button button-secondary" href={whatsappLink}>
                Get Quote
              </a>
            </div>
          </div>

          <div className="seo-links" data-reveal>
            <a href="/website-development-lucknow/">Website Development Lucknow</a>
            <a href="/digital-marketing-services/">Digital Marketing Services</a>
          </div>
        </section>

        <section className="section split-section" id="about" data-reveal>
          <div className="section-heading split-copy">
            <span className="eyebrow">Why choose us</span>
            <h2>Built for trust, speed and business growth</h2>
            <p>
              This layout is designed like a sales conversation: strong first impression,
              quick proof, clear offer and low-friction contact options.
            </p>
          </div>

          <div className="feature-grid">
            {differentiators.map((item, index) => (
              <article key={item.title} className="glass-card feature-card" data-reveal>
                <span className="feature-badge">0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="work" data-reveal>
          <div className="section-heading">
            <span className="eyebrow">Portfolio</span>
            <h2>Work snapshots that show results, not just decoration</h2>
            <p>
              Each concept is presented with a clean preview style and a clear business
              outcome to make trust feel immediate.
            </p>
          </div>

          <div className="portfolio-grid">
            {portfolio.map((item, index) => (
              <article key={item.name} className="glass-card project-card" data-reveal>
                <div className={`project-preview project-tone-${index + 1}`}>
                  <span className="project-tag">{item.category}</span>
                  {item.isFutureProject ? (
                    <a className="project-visual project-visual-future" href={item.liveUrl}>
                      <div className="future-preview-copy">
                        <span className="future-chip">Open spot</span>
                        <strong>Let&apos;s build your website</strong>
                        <p>
                          Modern design, stronger trust and a conversion-first journey
                          for your next client.
                        </p>
                      </div>
                    </a>
                  ) : (
                    <a
                      className="project-visual"
                      href={item.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.preview ? (
                        <img
                          src={item.preview}
                          alt={item.previewAlt}
                          loading="lazy"
                          decoding="async"
                          fetchPriority="low"
                          width={item.previewWidth}
                          height={item.previewHeight}
                        />
                      ) : (
                        <div className="project-image-placeholder">
                          <span>{item.placeholder}</span>
                          <small>Replace this block with your website preview image</small>
                        </div>
                      )}
                      <span className="project-overlay">
                        <span className="overlay-button">View Live</span>
                      </span>
                    </a>
                  )}
                </div>
                <div className="project-copy">
                  <h3>{item.name}</h3>
                  <p>{item.outcome}</p>
                  <small>{item.note}</small>
                  <div className="project-actions">
                    {!item.isFutureProject && (
                      <a href={item.liveUrl} target="_blank" rel="noreferrer">
                        Visit Live Website
                      </a>
                    )}
                    <a href="#contact">
                      {item.isFutureProject
                        ? "Let's build your website"
                        : 'Get this result for your business'}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="section-cta glass-card" data-reveal>
            <div>
              <span className="eyebrow">Ready for similar results?</span>
              <h3>Book a quick call or send your project brief and we will guide the next step.</h3>
            </div>
            <div className="section-cta-actions">
              <a className="button button-primary" href="#contact">
                Book Free Call
              </a>
              <a className="button button-secondary" href={whatsappLink}>
                Start on WhatsApp
              </a>
            </div>
          </div>
        </section>

        <section className="section" data-reveal>
          <div className="results-banner glass-card" data-reveal>
            <div>
              <span className="eyebrow">Conversion triggers</span>
              <h2>Less clutter. More trust. Faster action.</h2>
            </div>
            <div className="results-points">
              <span>Bold headlines</span>
              <span>Glassmorphism cards</span>
              <span>WhatsApp-first CTA</span>
              <span>Smooth micro-interactions</span>
            </div>
          </div>
        </section>

        <section className="section testimonials-section" data-reveal>
          <div className="section-heading">
            <span className="eyebrow">Testimonials</span>
            <h2>Social proof that removes hesitation</h2>
            <p>
              Strong testimonials reassure visitors that the premium look is backed by
              real outcomes and a reliable process.
            </p>
          </div>

          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <article key={item.name} className="glass-card testimonial-card" data-reveal>
                <p className="quote">"{item.quote}"</p>
                <div className="author">
                  <div className="author-head">
                    <span className="avatar">{item.avatar}</span>
                    <div>
                      <strong>{item.name}</strong>
                      <span>{item.role}</span>
                    </div>
                  </div>
                  <small>{item.business}</small>
                </div>
              </article>
            ))}
          </div>

          <div className="section-cta glass-card" data-reveal>
            <div>
              <span className="eyebrow">Want a trusted digital presence?</span>
              <h3>Let&apos;s build a website and brand system that makes clients take you seriously.</h3>
            </div>
            <div className="section-cta-actions">
              <a className="button button-primary" href="#contact">
                Start Your Project
              </a>
              <a className="button button-secondary" href={whatsappLink}>
                WhatsApp Now
              </a>
            </div>
          </div>
        </section>

        <section className="section" data-reveal>
          <div className="cta-panel" data-reveal>
            <span className="eyebrow">Final call to action</span>
            <h2>Your competitors are already online. Are you?</h2>
            <p>
              Let&apos;s launch a website that looks premium, feels trustworthy and makes
              it easier for clients to message you today.
            </p>
            <div className="cta-notes" aria-label="Urgency and offer">
              <span>Do not lose customers to competitors every day</span>
              <span>Free consultation available</span>
            </div>
            <div className="hero-actions">
              <a className="button button-primary" href={whatsappLink}>
                WhatsApp Now
              </a>
              <a className="button button-secondary" href="tel:+916393956624">
                Call Us
              </a>
            </div>
          </div>
        </section>

        <section className="section contact-section" id="contact" data-reveal>
          <div className="contact-layout">
            <div className="section-heading split-copy">
              <span className="eyebrow">Contact</span>
              <h2>Ready to launch a website that brings real enquiries?</h2>
              <p>
                Keep the next step simple with a quick WhatsApp chat, a direct call,
                or a short project brief.
              </p>
              <div className="contact-card glass-card" data-reveal>
                <a href={whatsappLink}>
                  <strong>WhatsApp</strong>
                  <span>Chat about your business website</span>
                </a>
                <a href="tel:+916393956624">
                  <strong>Call</strong>
                  <span>+91 6393956624</span>
                </a>
                <a href="mailto:graphicdesigner.harshit@gmail.com">
                  <strong>Email</strong>
                  <span>graphicdesigner.harshit@gmail.com</span>
                </a>
              </div>
            </div>

            <form className="glass-card lead-form" data-reveal onSubmit={handleLeadSubmit}>
              <span className="mini-label">Project enquiry</span>
              <h3>Share your details and we will plan the right website for your business.</h3>
              <label>
                <span>Name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={leadForm.name}
                  onChange={handleLeadFieldChange}
                />
              </label>
              <label>
                <span>Business type</span>
                <input
                  type="text"
                  name="businessType"
                  placeholder="Salon, clinic, agency..."
                  value={leadForm.businessType}
                  onChange={handleLeadFieldChange}
                />
              </label>
              <label>
                <span>WhatsApp number</span>
                <input
                  type="tel"
                  name="whatsapp"
                  placeholder="+91 98xxxxxx"
                  value={leadForm.whatsapp}
                  onChange={handleLeadFieldChange}
                />
              </label>
              <label>
                <span>Message</span>
                <textarea
                  name="message"
                  placeholder="Tell us what kind of website you want..."
                  value={leadForm.message}
                  onChange={handleLeadFieldChange}
                  rows="5"
                ></textarea>
              </label>
              {submitState.message && (
                <p className={`form-status form-status-${submitState.type}`}>{submitState.message}</p>
              )}
              <button className="button button-primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send Project Brief'}
              </button>
            </form>
          </div>
        </section>
        </main>
      </div>
      <a className="floating-whatsapp" href={whatsappLink} aria-label="Chat on WhatsApp">
        WhatsApp
      </a>
    </>
  )
}

export default App
