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

const services = [
  {
    id: '01',
    title: 'Website Development',
    text: 'Landing pages, business sites, funnels and premium redesigns that feel fast and trustworthy.',
    meta: 'Starting from Rs. 6,999',
  },
  {
    id: '02',
    title: 'Social Media Marketing',
    text: 'Creative campaigns and content systems built to turn attention into calls, leads and repeat business.',
    meta: 'Campaigns built for lead flow',
  },
  {
    id: '03',
    title: 'SEO & GMB',
    text: 'Search visibility upgrades, local ranking setup and profiles that help nearby customers discover you first.',
    meta: 'Local ranking and search intent',
  },
  {
    id: '04',
    title: 'Video Editing',
    text: 'Short-form reels, promo edits and ad creatives polished for retention, clarity and conversion.',
    meta: 'Reels, promos and ad edits',
  },
  {
    id: '05',
    title: 'Software Development',
    text: 'Custom dashboards, admin panels, booking systems and business tools built around your workflow.',
    meta: 'CRM, portals and custom tools',
  },
  {
    id: '06',
    title: 'YouTube Automation',
    text: 'Channel strategy, content systems, thumbnails, scripting support and publishing workflows for consistent growth.',
    meta: 'Scaling channels with smart systems',
  },
  {
    id: '07',
    title: 'Logo Designing',
    text: 'Distinctive brand marks and logo systems designed to make your business look polished and memorable.',
    meta: 'Clean identity and strong recall',
  },
  {
    id: '08',
    title: 'Brand Marketing',
    text: 'Positioning, campaigns and creative messaging that help your business stand out and stay trusted.',
    meta: 'Awareness, trust and growth',
  },
]

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
    preview: '/hopefully.png',
    previewAlt: 'Insert Hopefully website screenshot here',
    placeholder: 'Insert Hopefully hero screenshot here',
  },
  {
    name: 'All World Express',
    category: 'Logistics system website',
    outcome: 'Custom business solution',
    note: 'Live project - real client work',
    liveUrl: 'https://allworldexpress.in/',
    preview: '/allworldexpress.png',
    previewAlt: 'Insert All World Express website screenshot here',
    placeholder: 'Insert All World Express hero screenshot here',
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
            <span className="eyebrow">Premium websites for businesses that want more clients</span>
            <h1>We Build Websites That Turn Visitors Into Paying Clients</h1>
            <p className="hero-text">
              Fast, modern and high-converting websites crafted to impress visitors,
              build trust instantly and turn clicks into WhatsApp conversations.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href={whatsappLink}>
                Get Started
              </a>
              <a className="button button-secondary" href="#work">
                View Work
              </a>
            </div>

            <p className="hero-urgency">3 websites booked this week. 2 launch slots left.</p>

            <div className="hero-trust-inline" aria-label="Trust indicators">
              <span>Trusted by 50+ businesses</span>
              <span>Delivered in 3-7 days</span>
            </div>

            <ul className="hero-points">
              <li>3-7 day launch timeline</li>
              <li>Starting at Rs. 6,999</li>
              <li>Mobile friendly and SEO ready</li>
            </ul>
          </div>

          <div className="hero-visual" aria-label="Creative Code Hub dashboard preview">
            <div className="visual-card visual-primary">
              <span className="visual-chip">Recent client wins</span>
              <h2>Proof that feels real the moment visitors look at it</h2>
              <div className="proof-list">
                <div className="proof-item">
                  <div>
                    <strong>Nova Dental</strong>
                    <span>Website redesign</span>
                  </div>
                  <b>+42% leads</b>
                </div>
                <div className="proof-item">
                  <div>
                    <strong>Urban Lift</strong>
                    <span>Landing page funnel</span>
                  </div>
                  <b>3x conversions</b>
                </div>
                <div className="proof-item">
                  <div>
                    <strong>Pixel Brew</strong>
                    <span>Premium brand refresh</span>
                  </div>
                  <b>Faster trust</b>
                </div>
              </div>
            </div>

            <div className="visual-card visual-floating">
              <span className="mini-label">WhatsApp preview</span>
              <div className="chat-preview" aria-hidden="true">
                <div className="chat-bubble incoming">Hi, I need a website for my clinic.</div>
                <div className="chat-bubble outgoing">Done. We can launch a premium page in 5 days.</div>
                <div className="chat-bubble incoming">What will it cost?</div>
                <div className="chat-bubble outgoing">Starting from Rs. 6,999 with WhatsApp-ready CTA.</div>
              </div>
              <p>Simple offer, visible proof and one clear next step remove friction and boost response.</p>
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

        <section className="section" id="services" data-reveal>
          <div className="section-heading">
            <span className="eyebrow">Services</span>
            <h2>Everything you need to look premium and convert better</h2>
            <p>
              Short copy, stronger visuals and smart CTA placement keep the experience
              focused on business results.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article key={service.title} className="glass-card service-card" data-reveal>
                <span className="card-id">{service.id}</span>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <span className="service-meta">{service.meta}</span>
              </article>
            ))}
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
                        <img src={item.preview} alt={item.previewAlt} loading="lazy" />
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
              <a className="button button-secondary" href="tel:+919000000000">
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
  )
}

export default App
