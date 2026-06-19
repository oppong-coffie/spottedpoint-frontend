export const BRAND = {
  blue:      '#283B90',
  orange:    '#F89521',
  blueDark:  '#1a2760',
  blueLight: '#3a52b8',
  navy:      '#060d1f',
  navyMid:   '#0a1628',
  navyLight: '#0d1f4a',
  offWhite:  '#f8f9ff',
  gray:      '#8892a4',
  darkBg:    '#030a18',
};

export const API_URL = '/api';

// ── Hero slideshow images (replace with your own) ──────────────
// Add your team/work photos here. Use relative paths from /public/
export const HERO_IMAGES = [
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1920&q=80', // graphic design
  'https://images.unsplash.com/photo-1626785774625-0b1c2c4eab67?w=1920&q=80', // branding
  'https://images.unsplash.com/photo-1558655146-d09347e92766?w=1920&q=80', // design workspace
  'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1920&q=80', // digital/social
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80', // team working
];

// ── Directors ──────────────────────────────────────────────────
// Replace photo paths once you add images to /public/directors/
export const DIRECTORS = [
  {
    name:    'Prof. JNK Mensah',
    role:    'Lead Software Engineer & Technical Director',
    skills:  ['Web & App Development', 'Desktop & Mobile Apps', 'Data Analysis', 'Networking & IT Support'],
    photo: '/directors/mensah.jpg',         // replace with: '/directors/mensah.jpg'
    initials: 'JM',
    color:   '#283B90',
  },
  {
    name:    'Samuel Emissang',
    role:    'Creative Director & Lead Graphic Designer',
    skills:  ['Brand Identity', 'Graphic Design', 'Animation Design', 'Motion Graphics'],
    photo: '/directors/samuel.jpg',          // replace with: '/directors/samuel.jpg'
    initials: 'SE',
    color:   '#1a3a7a',
  },
  {
    name:    'Isaac Oteng',
    role:    'Digital Marketing Director',
    skills:  ['Digital Marketing Strategy', 'Social Media Management', 'Content Creation', 'SEO & Growth'],
    photo: '/directors/isaac.jpg',         // replace with: '/directors/isaac.jpg'
    initials: 'IO',
    color:   '#0f2d6e',
  },
];

// ── Services (no cybersecurity) ────────────────────────────────
export const SERVICES_DATA = [
  { icon: '🎨', title: 'Brand Identity & Design',    desc: 'Logos, brand systems, and visual identities that command attention and build lasting trust.' },
  { icon: '🌐', title: 'Web & App Development',       desc: 'High-performance websites, web apps, mobile apps, and desktop applications built to scale.' },
  { icon: '📈', title: 'Digital Marketing',           desc: 'Data-driven campaigns across search, social, and display that deliver measurable ROI.' },
  { icon: '🎬', title: 'Video & Motion Production',   desc: 'Corporate films, product demos, motion graphics, and social-first video content.' },
  { icon: '📱', title: 'Social Media Management',     desc: 'Strategic content creation and community management across all major platforms.' },
  { icon: '🖥️', title: 'IT Solutions & Networking',  desc: 'Network design, installation, maintenance, IT support, and data analysis for all organisations.' },
];