import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { useSmoothScroll, useScrollAnimations } from '../hooks/useGSAP';
import { BRAND } from '../utils/constants';
import HeroCarousel from '../components/ui/HeroCarousel';

const CATEGORIES = [
  {
    id: 'web-software',
    tabName: 'Web & Software',
    title: 'Web Design & Software Development',
    icon: '🌐',
    desc: 'From simple landing pages to feature-packed business websites with custom admin dashboards, scalable e-commerce portals, mobile apps, SaaS, and fintech systems.',
    specificServices: [
      {
        name: 'Starter Website (Landing Page)',
        desc: 'Ideal for product launches, single services, or targeted lead generation campaigns.',
        popular: false,
        features: [
          '1 Page / High-Converting Landing Page',
          'Fully Responsive Modern Layout',
          'Basic SEO & Meta Configuration',
          'Contact Form & Lead Capture Integration',
          '1 Month Maintenance & Support'
        ]
      },
      {
        name: 'Business Website (Informative)',
        desc: 'Comprehensive multi-page website designed to build company credibility and present services.',
        popular: false,
        features: [
          'Up to 5 Custom Designed Pages',
          'Custom UI/UX Layout & Typography',
          'Standard SEO Configuration',
          'Social Media & Map Integration',
          '3 Months Support & Maintenance'
        ]
      },
      {
        name: 'Business Website (With Admin)',
        desc: 'Complete web application with a back-office administrative portal for content control.',
        popular: true,
        features: [
          'Up to 10 Custom Designed Pages',
          'Custom Admin Dashboard & Control Panel',
          'Secure User Authentication & Roles',
          'Database & CMS Integration (Strapi / WordPress)',
          '3 Months Support & Technical Assistance'
        ]
      },
      {
        name: 'E-Commerce Portal',
        desc: 'Full-fledged digital storefront with payment processing, shopping cart, and order tracking.',
        popular: false,
        features: [
          'Unlimited Products & Category Management',
          'Paystack & PayPal Payment Gateways',
          'Shopping Cart & Secure Checkout',
          'Order Tracking & Customer Login Portals',
          'Advanced Search & Filter Settings',
          '6 Months Maintenance & Technical Support'
        ]
      },
      {
        name: 'Custom Management System',
        desc: 'Tailored enterprise software for schools, churches, hospitals, and corporate organizations.',
        popular: false,
        features: [
          'Custom Workflow Modules (School/Church/Hospital)',
          'Role-Based Access Control (RBAC)',
          'Activity Logging & Audit Trails',
          'Reporting & Analytics Dashboard',
          'Secure Scalable Database Architecture'
        ]
      },
      {
        name: 'Cross-Platform Mobile App',
        desc: 'Native-feeling mobile apps for iOS and Android designed to engage users on the move.',
        popular: false,
        features: [
          'Single Codebase for iOS & Android',
          'Custom Modern Mobile UI/UX',
          'Push Notification Systems',
          'Apple App Store & Google Play Publishing',
          'API Backend & Database Integration'
        ]
      },
      {
        name: 'Custom SaaS Platform',
        desc: 'Scalable multi-tenant cloud software tailored to your specific business logic and subscriptions.',
        popular: false,
        features: [
          'Tailored Business Logic & Workflows',
          'Secure User Auth & Subscription Controls',
          'Custom Admin Dashboard & Reporting',
          'Cloud Infrastructure Setup (AWS / Vercel)'
        ]
      },
      {
        name: 'Bank-Grade Fintech System',
        desc: 'High-security financial software built for transaction ledgers, payments, and compliance.',
        popular: false,
        features: [
          'Secure Payment Gateway Integrations',
          'KYC & AML Validation Flows',
          'Multi-Tenant System Architecture',
          'High-Frequency Transaction Ledger',
          'Bank-Grade Compliance & Security'
        ]
      }
    ]
  },
  {
    id: 'brand-identity',
    tabName: 'Brand & Identity',
    title: 'Brand Strategy & Visual Identity',
    icon: '🎯',
    desc: 'Lay a powerful foundation for your business with visual brand systems that command trust and stand out.',
    specificServices: [
      {
        name: 'Basic Branding Package',
        desc: 'Essential visual identity foundation for new businesses and startups.',
        popular: false,
        features: [
          'Initial Logo Concepts (2 Options)',
          'Revisions: 3 Rounds Included',
          'High Resolution (4096px)',
          'Transparent PNG File Format',
          'Standard Graphic Assets Suite'
        ]
      },
      {
        name: 'Standard Branding System',
        desc: 'Expanded brand visual identity for growing companies needing vector assets and 3D mockups.',
        popular: true,
        features: [
          'Initial Logo Concepts (3 Options)',
          'Revisions: 3 Rounds Included',
          'High Resolution Assets (4096px)',
          'Vector Files (Dark, White & Coloured)',
          '3D Merchandise & Visual Mockups'
        ]
      },
      {
        name: 'Premium Corporate Brand Suite',
        desc: 'Complete corporate identity kit with full guidebook and social media collateral.',
        popular: false,
        features: [
          'Initial Logo Concepts (4 Options)',
          'Revisions: 3 Rounds Included',
          'Vector Files Suite (Dark, White & Coloured)',
          '3D Product & Merchandise Mockups',
          'Full Brand Manual & Style Guidebook',
          'Social Media Kit (Banners & Covers)'
        ]
      },
      {
        name: 'Corporate Brochure & Profile Layout',
        desc: 'Multi-page corporate profile and catalog design for presentations and clients.',
        popular: false,
        features: [
          'Multi-Page Corporate Profile Design',
          'Professional Styling & Typography',
          'Delivered Print-Ready + Digital PDF'
        ]
      },
      {
        name: 'Product Package & Label Design',
        desc: 'Bespoke physical product packaging, box designs, and 3D visual packshots.',
        popular: false,
        features: [
          'Custom Box & Label Packaging Blueprint',
          'Creative Pattern Modeling',
          '3D Packshot Visual Illustration Renders'
        ]
      }
    ]
  },
  {
    id: 'digital-marketing',
    tabName: 'Digital Marketing',
    title: 'Digital Marketing & Paid Ads',
    icon: '📈',
    desc: 'Data-driven marketing, Google local search optimization, and Meta ad campaigns backed by server-side tracking.',
    specificServices: [
      {
        name: 'FB & IG Paid Ads Campaign',
        desc: 'Targeted social advertising campaigns designed to drive leads and sales.',
        popular: false,
        features: [
          'Facebook & Instagram Ad Setup',
          'Targeted Audience Definition & Segmentation',
          'A/B Testing Ad Creatives',
          'Budget Optimization Strategy'
        ]
      },
      {
        name: 'Conversion API (CAPI) Integration',
        desc: 'Server-side tracking setup to bypass browser adblockers and measure true ROI.',
        popular: false,
        features: [
          'Meta Conversion API Setup',
          'Server-Side Event Tracking',
          'Bypass Browser Adblockers',
          'Accurate ROI & Revenue Measurement'
        ]
      },
      {
        name: 'FB Pixel & Conversion API Bundle',
        desc: 'Combined client and server tracking for maximum data accuracy and ad optimization.',
        popular: true,
        features: [
          'Meta Pixel Installation & CAPI Setup',
          'Complete Event Deduplication Check',
          'Advanced Match Parameters',
          'Attribution Modeling Setup'
        ]
      },
      {
        name: 'Google Ads & PPC Management',
        desc: 'Capture high-intent buyers searching for your products on Google.',
        popular: false,
        features: [
          'Google Search & Display Ads Setup',
          'Keyword Research & Match Types',
          'Negative Keyword Lists',
          'Conversion Action Tracking'
        ]
      },
      {
        name: 'Google Merchant & Business Profile',
        desc: 'Dominate local map searches and show physical products on Google Shopping.',
        popular: false,
        features: [
          'Google Business Profile Optimization',
          'Google Maps Listing Configuration',
          'Google Merchant Center Configuration',
          'Free Product Listing Activation'
        ]
      },
      {
        name: 'Premium Local Search Kit',
        desc: 'Comprehensive local digital footprint for maximum search engine authority.',
        popular: false,
        features: [
          'Google Merchant Center & Business Profile',
          'Google Search Console Verification',
          'Google Analytics Integration',
          'YouTube Brand Channel Setup'
        ]
      },
      {
        name: 'SEO / SEM Growth Package',
        desc: 'Boost organic search rankings and drive consistent non-paid search traffic.',
        popular: false,
        features: [
          'Organic Search Ranking Optimization',
          'Search Traffic Generation Strategy',
          'On-Page Content & Meta Optimization',
          'Technical Speed Check & Competitor Tracking'
        ]
      }
    ]
  },
  {
    id: 'social-media',
    tabName: 'Social Media',
    title: 'Social Media Management & Setup',
    icon: '📱',
    desc: 'Build, customize, and optimize your business social handles while managing content creation and community engagement.',
    specificServices: [
      {
        name: 'Social Platform Account Setup',
        desc: 'Turnkey creation and branding for 1, 2, 3, or 4+ social business handles.',
        popular: false,
        features: [
          'Account Registration (1 to 4+ Platforms)',
          'Profile & Logo Optimization',
          'Strategic Bio Copywriting & Link-in-Bio',
          'Custom Banner Covers & Page Indexing'
        ]
      },
      {
        name: 'Basic Social Management',
        desc: 'Essential ongoing social media presence and visual design support.',
        popular: false,
        features: [
          '6 Custom Graphic Designs per Month',
          '1 Special Design for Events/Programs',
          'Monthly Engagement Check',
          'Content Planning Support'
        ]
      },
      {
        name: 'Standard Social Management',
        desc: 'Active content creation, custom graphics, and community engagement support.',
        popular: true,
        features: [
          '12 Custom Graphic Designs per Month',
          '3 Special Designs for Programs',
          'Standard Engagement Check',
          'Content Planning & Community Support'
        ]
      },
      {
        name: 'Premium Social Management',
        desc: 'Full end-to-end social media growth, motion graphics, and paid ads setup.',
        popular: false,
        features: [
          '12 Custom Graphic Designs per Month',
          '3 Special Designs for Programs',
          'Dynamic Animation / Motion Clips',
          'Priority Content Planning',
          'Full Community Management & Ads Setup'
        ]
      }
    ]
  },
  {
    id: 'motion-graphics',
    tabName: 'Motion & CGI',
    title: 'Motion Graphics & 3D CGI Animation',
    icon: '🎬',
    desc: 'Captivate your audience with 2D motion explainer ads and high-fidelity 3D CGI product reveal animations.',
    specificServices: [
      {
        name: '2D Motion Graphics & Explainer Ads',
        desc: 'Engaging animated explainer videos and social media promotional clips.',
        popular: false,
        features: [
          '2D Explainer Video or Promo Ads',
          'Custom Vector Shapes & Illustrations',
          'Subtle Transitions & Motion Effects',
          'Custom Sound Effects & Audio Editing'
        ]
      },
      {
        name: '3D CGI Product Reveal Animation',
        desc: 'High-end 3D product renders and cinematic promotional video reveals.',
        popular: true,
        features: [
          'High-Fidelity 3D CGI Product Reveal',
          'Studio Lighting & Texturing Effects',
          'Cinematic Camera Motion Moves',
          '4K Cinematic High-Res Render Output'
        ]
      }
    ]
  },
  {
    id: 'event-promo',
    tabName: 'Event & Creative',
    title: 'Event Promotions & Creative Assets',
    icon: '📅',
    desc: 'Honour occasions and pull crowds to events, crusades, and conferences with complete visual packages and print collateral.',
    specificServices: [
      {
        name: 'Funeral Event Promotion Package',
        desc: 'High-quality graphic assets and printed collateral to celebrate loved ones.',
        popular: false,
        features: [
          'Poster & Invitation Card Design',
          'Event Banner & Billboard Design',
          'Event Brochure / Program Booklet',
          'Event Souvenirs Artwork (Mugs, T-Shirts, etc.)'
        ]
      },
      {
        name: 'Church Event Promotion Package',
        desc: 'Engage congregations and pull crowds to conferences and crusades.',
        popular: true,
        features: [
          'Flyer & Poster Design',
          'Invitation Card & Banner Design',
          'Program Booklet Outline & Conference Brochure',
          'Billboard Setup & Souvenirs Artwork'
        ]
      },
      {
        name: 'Flyer or Poster Design',
        desc: 'Bespoke high-impact graphic design asset for events or marketing campaigns.',
        popular: false,
        features: [
          'High Quality Print-Ready Graphic Design',
          '1 Review Cycle Included',
          'Delivered in High-Res JPG & PDF'
        ]
      },
      {
        name: 'Billboard Layout Design',
        desc: 'Large-scale outdoor advertising blueprints and realistic mock placements.',
        popular: false,
        features: [
          'Large Scale Vector Blueprint',
          'Billboard Mockup Placement',
          'Delivered in Ultra-High Resolution'
        ]
      }
    ]
  },
  {
    id: 'it-cybersecurity',
    tabName: 'IT & Infrastructure',
    title: 'IT Solutions & Infrastructure',
    icon: '🔒',
    desc: 'Robust IT infrastructure, networking, server configuration, cloud setups, and technical support.',
    specificServices: [
      {
        name: 'Network Architecture & Cabling',
        desc: 'Business cabling, router/switch installation, and enterprise Wi-Fi configuration.',
        popular: false,
        features: [
          'Network Design & Infrastructure Cabling',
          'Router & Switch Hardware Mounting',
          'Enterprise Wi-Fi Coverage Optimization'
        ]
      },
      {
        name: 'Cloud Infrastructure & Server Setup',
        desc: 'Secure server setup, cloud migration, and domain/SSL management.',
        popular: false,
        features: [
          'Cloud Server Setup (AWS / Vercel / Heroku)',
          'Secure Database Configuration',
          'SSL Certificates & Domain Integration'
        ]
      },
      {
        name: 'IT Support & Systems Maintenance',
        desc: 'Reliable helpdesk support, system updates, and hardware diagnostics.',
        popular: false,
        features: [
          'Helpdesk Technical Support',
          'Hardware & Software Maintenance',
          'Data Backup & Disaster Recovery Setup'
        ]
      }
    ]
  }
];

export default function ServicesPage() {
  useSmoothScroll();
  useScrollAnimations();
  const [active, setActive] = useState(0);

  const currentCategory = CATEGORIES[active] || CATEGORIES[0];

  return (
    <>
      <Navbar />

      {/* Hero */}
      <section style={{
        paddingTop: 130, paddingBottom: 80,
        background: `linear-gradient(135deg, ${BRAND.blueDark}, ${BRAND.blue})`,
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <HeroCarousel images={[
          'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1400&q=85',
          'https://images.unsplash.com/photo-1626785774625-0b1c2c4eab67?w=1400&q=85',
          'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1400&q=85'
        ]} />
        <div style={{ position: 'absolute', inset: 0, opacity: .01, backgroundImage: `linear-gradient(rgba(255,255,255,.6) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.6) 1px,transparent 1px)`, backgroundSize: '60px 60px' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '.72rem', letterSpacing: '.22em', color: BRAND.orange, textTransform: 'uppercase', marginBottom: 10 }}>What We Offer</p>
          <h1 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(2.2rem,5vw,3.8rem)', color: '#fff', marginBottom: 16 }}>
            Our <span style={{ color: BRAND.orange }}>Services</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,.65)', maxWidth: 580, margin: '0 auto', lineHeight: 1.85 }}>
            Full-stack solutions across marketing, technology, software engineering, and creative media — everything your business needs to command its space.
          </p>
        </div>
      </section>

      {/* Services Category Tabs */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          
          {/* Main Category Navigation Buttons */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 44, justifyContent: 'center' }}>
            {CATEGORIES.map(({ icon, tabName, title }, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 22px', borderRadius: 50, cursor: 'pointer',
                fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.82rem',
                background: active === i ? BRAND.blue : '#fff',
                color: active === i ? '#fff' : BRAND.blue,
                border: `1.5px solid ${active === i ? BRAND.blue : BRAND.blue}25`,
                transition: 'all .25s',
              }}>
                <span>{icon}</span>{tabName || title}
              </button>
            ))}
          </div>

          {/* Active Category Header */}
          <div style={{ textAlign: 'center', marginBottom: 44 }}>
            <div style={{ width: 64, height: 64, borderRadius: 16, background: `${BRAND.orange}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', margin: '0 auto 16px auto' }}>
              {currentCategory.icon}
            </div>
            <h2 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,3vw,2.5rem)', color: BRAND.blue, marginBottom: 12 }}>
              {currentCategory.title}
            </h2>
            <p style={{ color: BRAND.gray, maxWidth: 620, margin: '0 auto', lineHeight: 1.8, fontSize: '.96rem' }}>
              {currentCategory.desc}
            </p>
          </div>

          {/* Specific Services Grid of Cards */}
          <div style={{ animation: 'fadeIn .35s ease' }}>
            <div className="grid-3" style={{ gap: 28 }}>
              {currentCategory.specificServices.map((service, sIdx) => (
                <div
                  key={sIdx}
                  className="card"
                  style={{
                    padding: '30px 24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justify: 'space-between',
                    borderRadius: 20,
                    border: `1.5px solid ${BRAND.blue}15`,
                    background: '#fff',
                    boxShadow: '0 10px 30px rgba(0,0,0,.03)',
                    transition: 'transform .3s, box-shadow .3s'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                      <span style={{ fontSize: '1.6rem' }}>{currentCategory.icon}</span>
                      {service.popular && (
                        <span style={{
                          background: `${BRAND.orange}15`, color: BRAND.orange,
                          padding: '4px 12px', borderRadius: 50, fontSize: '.65rem',
                          fontWeight: 800, fontFamily: "'Montserrat',sans-serif",
                          textTransform: 'uppercase', letterSpacing: '.04em'
                        }}>
                          Most Popular
                        </span>
                      )}
                    </div>

                    <h3 style={{
                      fontFamily: "'Montserrat',sans-serif", fontWeight: 800,
                      color: BRAND.blue, fontSize: '1.15rem', marginBottom: 10
                    }}>
                      {service.name}
                    </h3>

                    <p style={{ color: BRAND.gray, fontSize: '.88rem', lineHeight: 1.6, marginBottom: 20 }}>
                      {service.desc}
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24, paddingTop: 14, borderTop: `1px solid ${BRAND.blue}10` }}>
                      {service.features.map((feature, fIdx) => (
                        <div key={fIdx} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                          <span style={{ color: BRAND.orange, fontSize: '.75rem', marginTop: 2 }}>✓</span>
                          <p style={{ color: BRAND.blueDark, fontFamily: "'Poppins',sans-serif", fontSize: '.86rem', fontWeight: 600, lineHeight: 1.45, margin: 0 }}>
                            {feature}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    to={`/contact?plan=${encodeURIComponent(`${currentCategory.title} - ${service.name}`)}`}
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center', fontSize: '.88rem' }}
                  >
                    Get a Quote →
                  </Link>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Comprehensive All Categories Overview */}
      <section className="section" style={{ background: BRAND.offWhite }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <p className="label gs-up">Full Overview</p>
            <h2 className="gs-up" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,3vw,2.5rem)', color: BRAND.blue }}>
              Everything We <span style={{ color: BRAND.orange }}>Offer</span>
            </h2>
            <p style={{ color: BRAND.gray, maxWidth: 560, margin: '12px auto 0 auto', fontSize: '.95rem' }}>
              Explore our complete suite of service packages designed to propel your organization forward.
            </p>
          </div>

          <div className="gs-stagger grid-3">
            {CATEGORIES.map((cat, idx) => (
              <div key={idx} className="card" style={{ padding: '30px 26px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '1.8rem', marginBottom: 14 }}>{cat.icon}</div>
                  <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: BRAND.blue, marginBottom: 10, fontSize: '1.1rem' }}>{cat.title}</h3>
                  <p style={{ color: BRAND.gray, fontSize: '.88rem', lineHeight: 1.7, marginBottom: 16 }}>{cat.desc}</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20, paddingTop: 12, borderTop: `1px solid ${BRAND.blue}10` }}>
                    {cat.specificServices.slice(0, 3).map((s, sI) => (
                      <div key={sI} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ color: BRAND.orange, fontSize: '.75rem' }}>✓</span>
                        <span style={{ fontSize: '.82rem', color: BRAND.blueDark, fontWeight: 600 }}>{s.name}</span>
                      </div>
                    ))}
                    {cat.specificServices.length > 3 && (
                      <span style={{ fontSize: '.78rem', color: BRAND.orange, fontWeight: 700, marginTop: 2 }}>
                        + {cat.specificServices.length - 3} more options available
                      </span>
                    )}
                  </div>
                </div>
                
                <Link
                  to={`/contact?plan=${encodeURIComponent(cat.title)}`}
                  className="btn btn-outline"
                  style={{ width: '100%', justifyContent: 'center', fontSize: '.85rem' }}
                >
                  Request Consultation →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: BRAND.orange, padding: '80px 24px', textAlign: 'center' }}>
        <h2 className="gs-up" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,3vw,2.6rem)', color: '#fff', marginBottom: 16 }}>
          Need a Custom Solution?
        </h2>
        <p className="gs-up" style={{ color: 'rgba(255,255,255,.85)', marginBottom: 32 }}>Let's talk — we'll recommend the right specific service and custom package for your goals.</p>
        <Link to="/contact" className="btn btn-white gs-up">Book a Free Consultation →</Link>
      </section>

      <Footer />
    </>
  );
}