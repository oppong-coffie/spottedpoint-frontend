import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useSmoothScroll, useScrollAnimations } from '../hooks/useGSAP';
import { BRAND } from '../utils/constants';

// Fixed conversion rate for GHS-only prices to USD
const EXCHANGE_RATE = 14.5;

const CATEGORIES = [
  { id: 'media-branding', label: 'Media & Branding', icon: '🎨' },
  { id: 'marketing-seo', label: 'Marketing & SEO', icon: '📈' },
  { id: 'software-web', label: 'Web & Software', icon: '💻' },
  { id: 'event-promo', label: 'Event Promotions', icon: '📅' },
  { id: 'alacarte-creative', label: 'A-La-Carte & Design', icon: '⚙️' }
];

const PRICING_DATA = {
  'media-branding': [
    {
      sectionTitle: 'Social Media Management',
      sectionDesc: 'Command your online presence with professional custom designs, scheduling, and management.',
      layout: 'grid', // 'grid' for standard card plans
      plans: [
        {
          name: 'Basic',
          priceGhs: 350,
          priceUsd: 70,
          features: [
            '6 Custom Designs',
            '1 Special design for program',
            'Monthly engagement check',
            'Content planning'
          ],
          popular: false
        },
        {
          name: 'Standard',
          priceGhs: 500,
          priceUsd: 100,
          features: [
            '12 Custom Designs',
            '3 Special designs for programs',
            'Standard engagement check',
            'Content planning',
            'Community management support'
          ],
          popular: true
        },
        {
          name: 'Premium',
          priceGhs: 700,
          priceUsd: 150,
          features: [
            '12 Custom Designs',
            '3 Special designs for programs',
            'Dynamic Animation / Motion Clip',
            'Priority content planning',
            'Full community management & ads setup'
          ],
          popular: false
        }
      ]
    },
    {
      sectionTitle: 'Branding & Corporate Identity',
      sectionDesc: 'Lay a powerful foundation for your business. Build a lasting visual identity that commands trust.',
      layout: 'grid',
      plans: [
        {
          name: 'Basic',
          priceGhs: 400,
          priceUsd: 100,
          features: [
            'Initial Concepts (2 options)',
            'Revisions: 3 rounds',
            'High Resolution (4096px)',
            'Transparent PNG file format',
            'Standard Graphic assets'
          ],
          popular: false
        },
        {
          name: 'Standard',
          priceGhs: 750,
          priceUsd: 250,
          features: [
            'Initial Concepts (3 options)',
            'Revisions: 3 rounds',
            'High Resolution (4096px)',
            'Transparent PNG format',
            'Standard Graphic assets',
            'Vector Files (All variations dark, white & coloured)',
            '3D Mockups'
          ],
          popular: true
        },
        {
          name: 'Premium',
          priceGhs: 1000,
          priceUsd: 700,
          features: [
            'Initial Concepts (4 options)',
            'Revisions: 3 rounds',
            'High Resolution (4096px)',
            'Transparent PNG format',
            'Standard Graphic assets',
            'Vector Files (All variations dark, white & coloured)',
            '3D Mockups',
            'Full Brand Manual & Guidebook',
            'Social Media Kit (Banners & covers)'
          ],
          popular: false
        }
      ]
    }
  ],
  'marketing-seo': [
    {
      sectionTitle: 'Digital Marketing & Paid Ads',
      sectionDesc: 'Launch high-converting search and social media advertising campaigns designed to grow your business.',
      layout: 'list', // list/grid mix for custom marketing configurations
      plans: [
        {
          name: 'Conversion API Integration',
          priceGhs: 400,
          priceUsd: 50,
          features: ['Meta Conversion API setup', 'Server-side event tracking', 'Bypass browser adblockers', 'Accurate ROI measurement'],
          popular: false
        },
        {
          name: 'FB Paid Ads Campaign',
          priceGhs: 500,
          priceUsd: 100,
          features: ['Facebook & Instagram Ad setup', 'Targeted audience definition', 'A/B testing ad creatives', 'Budget optimization advice'],
          popular: false
        },
        {
          name: 'FB Pixel Account Setup',
          priceGhs: 600,
          priceUsd: 100,
          features: ['Meta Pixel installation', 'Standard event configuration', 'Custom audience creation', 'Retargeting setup'],
          popular: false
        },
        {
          name: 'Google Ads Setup',
          priceGhs: 800,
          priceUsd: 150,
          features: ['Google Search/Display Ads setup', 'Keyword research & matching', 'Negative keywords lists', 'Conversion action tracking'],
          popular: false
        },
        {
          name: 'FB Pixel & Conversion API Bundle',
          priceGhs: 900,
          priceUsd: 150,
          features: ['Pixel installation & CAPI setup', 'Complete deduplication check', 'Advanced match parameters', 'Best-practice attribution modeling'],
          popular: true
        },
        {
          name: 'FB Paid Ads & Full Report',
          priceGhs: 1200,
          priceUsd: 200,
          features: ['Full campaign setup & run monitoring', 'Creative graphic ads design', 'Custom audience retargeting', 'Comprehensive analytics PDF report'],
          popular: false
        }
      ]
    },
    {
      sectionTitle: 'Google Ecosystem Services',
      sectionDesc: 'Put your local business in front of searching buyers. Boost your rankings and listing completeness.',
      layout: 'grid',
      plans: [
        {
          name: 'Google Merchant Setup',
          priceGhs: 350,
          priceUsd: null, // Only GHS provided in PDF
          features: ['Google Merchant Center configuration', 'Product feed upload & sync', 'Fix merchant warning flags', 'Free product listing activation'],
          popular: false
        },
        {
          name: 'Google Merchant & Business Profile',
          priceGhs: 500,
          priceUsd: null,
          features: ['Google Merchant Setup', 'Google Business Profile optimization', 'Local search visibility setup', 'Google Maps listing configuration'],
          popular: true
        },
        {
          name: 'Premium Local Search Kit',
          priceGhs: 700,
          priceUsd: null,
          features: ['Google Merchant Center & Business Profile', 'Google Search Console verification', 'Google Analytics integration', 'YouTube Brand Channel setup & customization'],
          popular: false
        }
      ]
    },
    {
      sectionTitle: 'SEO & SEM Solutions',
      sectionDesc: 'Search Engine Optimization (SEO) & Search Engine Marketing (SEM) to place you top of search results.',
      layout: 'grid',
      plans: [
        {
          name: 'SEO/SEM Standard Plan',
          priceGhs: 2000,
          priceUsd: null,
          features: [
            'Increase your organic search rankings',
            'Search traffic generation',
            'On-page content optimization',
            'Technical speed check',
            'Competitor analysis & tracking'
          ],
          popular: true
        }
      ]
    }
  ],
  'event-promo': [
    {
      sectionTitle: 'Funeral Event Promotion',
      sectionDesc: 'Honour and celebrate loved ones with high-quality graphic assets and printed collateral.',
      layout: 'grid',
      plans: [
        {
          name: 'Basic Event Plan',
          priceGhs: 100,
          priceUsd: null,
          features: [
            'Poster Design',
            'Invitation Card Design',
            'Event Banner Design'
          ],
          popular: false
        },
        {
          name: 'Standard Event Plan',
          priceGhs: 250,
          priceUsd: null,
          features: [
            'Poster Design',
            'Invitation Card Design',
            'Event Banner Design',
            'Event Brochure / Program booklet'
          ],
          popular: true
        },
        {
          name: 'Premium Event Plan',
          priceGhs: 450,
          priceUsd: null,
          features: [
            'Poster Design',
            'Invitation Card Design',
            'Event Banner Design',
            'Event Brochure Design',
            'Billboard Mockup & Design',
            'Event Souvenirs Artwork (mugs, tshirts, etc.)'
          ],
          popular: false
        }
      ]
    },
    {
      sectionTitle: 'Church Event Promotion',
      sectionDesc: 'Engage your congregation and pull crowds to conferences and crusades with graphic systems.',
      layout: 'grid',
      plans: [
        {
          name: 'Basic Church Plan',
          priceGhs: 100,
          priceUsd: null,
          features: [
            'Flyer / Poster Design',
            'Invitation Card Design',
            'Program booklet outline'
          ],
          popular: false
        },
        {
          name: 'Standard Church Plan',
          priceGhs: 250,
          priceUsd: null,
          features: [
            'Flyer / Poster Design',
            'Invitation Card Design',
            'Program booklet outline',
            'Conference Brochure design'
          ],
          popular: true
        },
        {
          name: 'Premium Church Plan',
          priceGhs: 450,
          priceUsd: null,
          features: [
            'Flyer / Poster Design',
            'Invitation Card Design',
            'Banner Design',
            'Program booklet design',
            'Billboard design & setup',
            'Church Souvenirs Artwork (Custom prints)'
          ],
          popular: false
        }
      ]
    }
  ],
  'alacarte-creative': [
    {
      sectionTitle: 'Social Platform Account Setup',
      sectionDesc: 'Let us build, customize, and optimize your business social handles on various platforms.',
      layout: 'grid',
      plans: [
        { name: '1 Platform Setup', priceGhs: 100, priceUsd: null, features: ['Account Registration', 'Profile / Logo optimization', 'Basic bio copywriting', 'Initial post placeholder'], popular: false },
        { name: '2 Platforms Setup', priceGhs: 150, priceUsd: null, features: ['Registration on 2 platforms', 'Cover arts / banner optimization', 'Strategic bio & link-in-bio setup', 'Basic post placeholders'], popular: false },
        { name: '3 Platforms Setup', priceGhs: 200, priceUsd: null, features: ['Registration on 3 platforms', 'Bespoke banners for each', 'Short bio configurations', 'Search visibility index settings'], popular: true },
        { name: '4+ Platforms Setup', priceGhs: 300, priceUsd: null, features: ['Registration on 4 or more platforms', 'Consistent cross-platform handles', 'Premium custom cover graphics', 'Full page index submission', 'Social linking mapping'], popular: false }
      ]
    },
    {
      sectionTitle: 'Graphic Design & Creative Assets',
      sectionDesc: 'Bespoke designs for individual marketing collateral on a per-asset model.',
      layout: 'grid',
      plans: [
        { name: 'Flyer or Poster Design', priceGhs: 100, priceUsd: null, features: ['High quality design print-ready', '1 review cycle included', 'Delivered in high-res JPG/PDF'], popular: false },
        { name: 'Package & Label Design', priceGhs: 200, priceUsd: null, features: ['Custom box/label design', 'Creative pattern modeling', '3D packshot visual illustration'], popular: false },
        { name: 'Billboard Layout Design', priceGhs: 150, priceUsd: null, features: ['Large scale vector blueprint', 'Billboard mock placement', 'Delivered in high resolution'], popular: false },
        { name: 'Corporate Brochure Layout', priceGhs: 300, priceUsd: null, features: ['Multi-page corporate profile', 'Professional style formatting', 'Delivered print-ready + PDF'], popular: true }
      ]
    },
    {
      sectionTitle: 'Motion Graphics & Animations',
      sectionDesc: 'Bring your products and services to life with stunning animation assets.',
      layout: 'grid',
      plans: [
        { name: '2D Motion Graphics', priceGhs: 500, priceUsd: null, features: ['2D Explainer Video or Ads', 'Custom illustrations and shapes', 'Subtle transitions & sound effects'], popular: false },
        { name: '3D CGI Animation', priceGhs: 1000, priceUsd: null, features: ['High-fidelity 3D CGI product reveal', 'Studio lighting & texturing effects', '4K cinematic render output'], popular: true }
      ]
    }
  ],
  'software-web': [
    {
      sectionTitle: 'Web & App Development',
      sectionDesc: 'From simple landing pages to complex e-commerce portals and custom web applications.',
      layout: 'grid',
      plans: [
        {
          name: 'Starter Web',
          priceGhs: 3500,
          priceUsd: 350,
          features: [
            '1 Page / Landing Page design',
            'Fully responsive layout',
            'Basic SEO optimization',
            'Contact form integration',
            '1 Month support'
          ],
          popular: false
        },
        {
          name: 'Business Web',
          priceGhs: 7500,
          priceUsd: 750,
          features: [
            'Up to 5 Pages',
            'Custom UI/UX layout design',
            'CMS Integration (WordPress/Strapi)',
            'Standard SEO configuration',
            'Social media integration',
            '3 Months support'
          ],
          popular: true
        },
        {
          name: 'E-Commerce Portal',
          priceGhs: 15000,
          priceUsd: 1500,
          features: [
            'Unlimited products page',
            'Shopping cart & payment gateway (Paystack/PayPal)',
            'Order tracking dashboard',
            'Secure customer login portals',
            'Advanced search & filter settings',
            '6 Months support & maintenance'
          ],
          popular: false
        }
      ]
    },
    {
      sectionTitle: 'Custom Software & Mobile Apps',
      sectionDesc: 'Bespoke native mobile applications and custom CRM/ERP backend management systems.',
      layout: 'grid',
      plans: [
        {
          name: 'Mobile App',
          priceGhs: 25000,
          priceUsd: 2500,
          features: [
            'Cross-platform iOS & Android',
            'Custom modern user interface',
            'Push notification systems',
            'Google/Apple store publishing',
            'API backend database integration'
          ],
          popular: false
        },
        {
          name: 'Custom SaaS / Web App',
          priceGhs: 35000,
          priceUsd: 3500,
          features: [
            'Tailored workflows & business logic',
            'Secure user authentication',
            'Custom Admin Dashboard & Reporting',
            'Third-party software integrations',
            'Cloud hosting setup (AWS/Vercel/Heroku)'
          ],
          popular: true
        }
      ]
    }
  ]
};

const FAQS = [
  { q: 'How does currency conversion work on the pricing page?', a: 'Some plans in the PDF document are explicitly priced in USD. For the remaining plans that are strictly Ghanaian Cedi-based, we provide an estimated conversion based on current standard rates to help international clients gauge estimates.' },
  { q: 'Do these prices include printing costs?', a: 'No, all prices listed on our pricing plans are strictly for professional digital design and design production. If you require physical printing and delivery, we can provide a custom quote.' },
  { q: 'Can I customise a pricing plan for my specific needs?', a: 'Absolutely! Our standard plans cover typical company demands, but we build custom packages for various projects. Reach out via the Contact page or click "Custom Quote" and we will draft a proposal.' },
  { q: 'What is the delivery timeline for these packages?', a: 'Flyers and individual graphic designs typically take 2-4 business days. Social media campaigns and branding packages generally take between 7-15 business days depending on design complexities and active feedback rounds.' }
];

export default function PricingPage() {
  useSmoothScroll();
  useScrollAnimations();

  const [activeTab, setActiveTab] = useState('media-branding');
  const [currency, setCurrency] = useState('GHS'); // 'GHS' or 'USD'

  const formatPrice = (plan) => {
    if (currency === 'USD') {
      if (plan.priceUsd !== null) {
        return `$${plan.priceUsd}`;
      } else {
        // Convert GHS price to USD using exchange rate
        const converted = Math.round(plan.priceGhs / EXCHANGE_RATE);
        return `$${converted}*`;
      }
    } else {
      return `¢${plan.priceGhs}`;
    }
  };

  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <>
      <Navbar />

      {/* Hero Header */}
      <section style={{
        paddingTop: 140, paddingBottom: 60,
        background: `linear-gradient(135deg, ${BRAND.blueDark}, ${BRAND.blue})`,
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        {/* Subtle grid pattern overlay */}
        <div style={{ position: 'absolute', inset: 0, opacity: .015, backgroundImage: `linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div style={{ position: 'absolute', left: -80, bottom: -80, width: 350, height: 350, borderRadius: '50%', background: 'rgba(248,149,33,.05)', filter: 'blur(40px)' }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className="label gs-up" style={{ color: BRAND.orange }}>PRICELIST</p>
          <h1 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(2.2rem,5vw,3.8rem)', color: '#fff', marginBottom: 16 }}>
            CHOOSE YOUR <span style={{ color: BRAND.orange }}>PLAN</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.7)', maxWidth: 580, margin: '0 auto', lineHeight: 1.85, fontSize: '.95rem' }}>
            Transparent pricing built for businesses, events, and organizations. Toggle currencies or filter categories to find the perfect plan.
          </p>
        </div>
      </section>

      {/* Pricing Interactive Dashboard */}
      <section className="section" style={{ background: '#060d1f', paddingTop: 40, borderTop: `1px solid ${BRAND.orange}10` }}>
        <div className="container">
          
          {/* Controls Bar (Tabs & Currency switch) */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            flexWrap: 'wrap', gap: 24, marginBottom: 50, borderBottom: `1px solid rgba(255,255,255,.05)`,
            paddingBottom: 24
          }}>
            
            {/* Category tabs */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              {CATEGORIES.map(({ id, label, icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '12px 22px', borderRadius: 50, cursor: 'pointer',
                    fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.84rem',
                    background: activeTab === id ? BRAND.orange : 'rgba(255,255,255,.04)',
                    color: '#fff',
                    border: `1px solid ${activeTab === id ? BRAND.orange : 'rgba(255,255,255,.1)'}`,
                    transition: 'all .25s',
                  }}
                  onMouseEnter={e => { if (activeTab !== id) e.currentTarget.style.background = 'rgba(255,255,255,.08)'; }}
                  onMouseLeave={e => { if (activeTab !== id) e.currentTarget.style.background = 'rgba(255,255,255,.04)'; }}
                >
                  <span>{icon}</span>{label}
                </button>
              ))}
            </div>

            {/* Currency switch */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: '.8rem', fontWeight: 700, color: 'rgba(255,255,255,.6)', fontFamily: "'Montserrat',sans-serif", textTransform: 'uppercase', letterSpacing: '.05em' }}>Currency:</span>
              <div style={{ display: 'flex', background: 'rgba(255,255,255,.04)', padding: 4, borderRadius: 50, border: '1px solid rgba(255,255,255,.1)' }}>
                <button 
                  onClick={() => setCurrency('GHS')}
                  style={{
                    padding: '6px 16px', borderRadius: 50, border: 'none', cursor: 'pointer',
                    fontSize: '.75rem', fontWeight: 800, fontFamily: "'Montserrat',sans-serif",
                    background: currency === 'GHS' ? BRAND.orange : 'transparent',
                    color: '#fff', transition: 'all .2s'
                  }}
                >
                  ¢ Cedi (GHS)
                </button>
                <button 
                  onClick={() => setCurrency('USD')}
                  style={{
                    padding: '6px 16px', borderRadius: 50, border: 'none', cursor: 'pointer',
                    fontSize: '.75rem', fontWeight: 800, fontFamily: "'Montserrat',sans-serif",
                    background: currency === 'USD' ? BRAND.orange : 'transparent',
                    color: '#fff', transition: 'all .2s'
                  }}
                >
                  $ Dollar (USD)
                </button>
              </div>
            </div>

          </div>

          {/* Active category tables */}
          <div className="gs-stagger" style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
            {PRICING_DATA[activeTab].map((section, sectionIdx) => (
              <div key={sectionIdx} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                
                {/* Section title & desc */}
                <div style={{ textAlign: 'left', borderLeft: `3px solid ${BRAND.orange}`, paddingLeft: 16 }}>
                  <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: '#fff', fontSize: '1.45rem', marginBottom: 6 }}>
                    {section.sectionTitle}
                  </h3>
                  <p style={{ color: BRAND.gray, fontSize: '.92rem', maxWidth: 700, lineHeight: 1.6 }}>
                    {section.sectionDesc}
                  </p>
                </div>

                {/* Grid of pricing cards */}
                <div className={section.layout === 'list' ? 'grid-2' : 'grid-3'} style={{ gap: 32, marginTop: 20 }}>
                  {section.plans.map((plan, planIdx) => (
                    <div
                      key={planIdx}
                      className="pricing-card-slide"
                    >
                      {/* Angled orange tier banner tag wrap */}
                      <div className="pricing-ribbon">
                        {plan.name}
                      </div>

                      {/* Popular / Best Value badge */}
                      {plan.popular && (
                        <div style={{
                          position: 'absolute',
                          top: 26,
                          right: 24,
                          background: `${BRAND.orange}20`,
                          border: `1.5px solid ${BRAND.orange}`,
                          borderRadius: 50,
                          padding: '3px 12px',
                          color: BRAND.orange,
                          fontSize: '.62rem',
                          fontWeight: 900,
                          fontFamily: "'Montserrat',sans-serif",
                          textTransform: 'uppercase',
                          letterSpacing: '.06em'
                        }}>
                          Best Value
                        </div>
                      )}

                      {/* Header content */}
                      <div style={{ width: '100%' }}>
                        {/* Price rendering (stacked Cedi & USD matching screenshot) */}
                        <div style={{ margin: '14px 0 28px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                          <div className="price-tag-ghs">
                            ¢{plan.priceGhs}
                          </div>
                          {plan.priceUsd !== null ? (
                            <div className="price-tag-usd">
                              ${plan.priceUsd}
                            </div>
                          ) : (
                            <div className="price-tag-usd" style={{ fontSize: '1.6rem', color: '#3a52b8' }}>
                              ~${Math.round(plan.priceGhs / EXCHANGE_RATE)}*
                            </div>
                          )}
                        </div>

                        {/* Feature lists with Triangle bullets */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32, paddingLeft: 8 }}>
                          {plan.features.map((feature, featureIdx) => (
                            <div key={featureIdx} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', textAlign: 'left' }}>
                              <span style={{
                                color: BRAND.orange,
                                fontSize: '.8rem',
                                marginTop: 2,
                                display: 'inline-block'
                              }}>
                                ➤
                              </span>
                              <p style={{
                                color: '#1a2760', // Dark Navy text color for high contrast
                                fontFamily: "'Poppins',sans-serif",
                                fontSize: '.94rem',
                                fontWeight: 600,
                                lineHeight: 1.45
                              }}>
                                {feature}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Call-to-action button */}
                      <Link
                        to={`/contact?plan=${encodeURIComponent(`${section.sectionTitle} - ${plan.name}`)}`}
                        className="btn btn-dark-navy"
                        style={{
                          width: '100%',
                          justifyContent: 'center',
                          fontSize: '.88rem'
                        }}
                      >
                        Order Plan →
                      </Link>

                    </div>
                  ))}
                </div>

                {/* Asterisk note for currency conversion */}
                {currency === 'USD' && section.plans.some(p => p.priceUsd === null) && (
                  <p style={{ color: BRAND.gray, fontSize: '.74rem', textAlign: 'left', fontStyle: 'italic', marginTop: -8 }}>
                    * USD prices with an asterisk are calculated estimates based on standard conversion rates (1 USD = {EXCHANGE_RATE} GHS).
                  </p>
                )}

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FAQs Section */}
      <section className="section" style={{ background: '#030a18', borderTop: `1px solid rgba(255,255,255,.03)` }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p className="label gs-up">QUESTIONS</p>
            <h2 className="gs-up" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,3vw,2.5rem)', color: '#fff' }}>
              Frequently Asked <span style={{ color: BRAND.orange }}>Questions</span>
            </h2>
          </div>

          <div style={{ maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {FAQS.map((faq, i) => (
              <div 
                key={i} 
                className="gs-up"
                style={{
                  background: 'rgba(255,255,255,.02)',
                  border: '1px solid rgba(255,255,255,.05)',
                  borderRadius: 16,
                  padding: '20px 24px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'background .3s'
                }}
                onClick={() => toggleFaq(i)}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.04)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,.02)'}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                  <h4 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: '#fff', fontSize: '1rem', margin: 0 }}>
                    {faq.q}
                  </h4>
                  <span style={{ color: BRAND.orange, fontSize: '1.2rem', fontWeight: 900, transition: 'transform .3s', transform: openFaq === i ? 'rotate(45deg)' : 'none' }}>
                    +
                  </span>
                </div>
                
                {openFaq === i && (
                  <p style={{
                    color: BRAND.gray,
                    fontSize: '.9rem',
                    lineHeight: 1.7,
                    marginTop: 14,
                    borderTop: '1px solid rgba(255,255,255,.06)',
                    paddingTop: 12,
                    animation: 'fadeUp .35s ease'
                  }}>
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section style={{ background: `linear-gradient(135deg, ${BRAND.orange}, #f47d1b)`, padding: '80px 24px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '10%', top: -20, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,.06)' }} />
        <div style={{ position: 'absolute', right: '15%', bottom: -40, width: 220, height: 220, borderRadius: '50%', background: 'rgba(255,255,255,.06)' }} />
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="gs-up" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#fff', marginBottom: 16 }}>
            Need a Custom Configuration?
          </h2>
          <p className="gs-up" style={{ color: 'rgba(255,255,255,.9)', maxWidth: 600, margin: '0 auto 32px auto', fontSize: '.96rem', lineHeight: 1.8 }}>
            Whether you have multi-platform custom designs, large scale animations, or special digital marketing bundles, our strategy team is ready to draft a custom quotation for you.
          </p>
          <Link to="/contact?plan=Custom%20Quotation" className="btn btn-white gs-up" style={{ background: '#fff', color: BRAND.blue, borderRadius: 50, padding: '14px 34px', fontSize: '.9rem' }}>
            Request Custom Quote →
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
