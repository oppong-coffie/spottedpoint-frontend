import { useState, useEffect }       from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster }         from 'react-hot-toast';
import AOS                 from 'aos';
import 'aos/dist/aos.css';

// ── Animation system ─────────────────────────────────────────────────────────
import { MotionProvider }  from './animations/MotionProvider';
import AdvancedCursor      from './animations/AdvancedCursor';

// ── Global UI ────────────────────────────────────────────────────────────────
import ScrollProgress      from './components/ui/ScrollProgress';
import AuroraBackground    from './components/ui/AuroraBackground';
import Preloader           from './components/ui/Preloader';
import PageTransition      from './components/ui/PageTransition';

// ── Public pages ─────────────────────────────────────────────────────────────
import Home                from './pages/Home';
import AboutPage           from './pages/AboutPage';
import ServicesPage        from './pages/ServicesPage';
import PortfolioPage       from './pages/PortfolioPage';
import GalleryPage         from './pages/GalleryPage';
import BlogPage            from './pages/BlogPage';
import BlogSingle          from './pages/BlogSingle';
import ContactPage         from './pages/ContactPage';

// ── Admin pages ──────────────────────────────────────────────────────────────
import AdminLogin          from './pages/admin/AdminLogin';
import AdminDashboard      from './pages/admin/AdminDashboard';
import AdminProjects       from './pages/admin/AdminProjects';
import AdminGallery        from './pages/admin/AdminGallery';
import AdminBlog           from './pages/admin/AdminBlog';
import AdminTeam           from './pages/admin/AdminTeam';
import AdminMessages       from './pages/admin/AdminMessages';
import AdminRoute          from './components/admin/AdminRoute';

// ─────────────────────────────────────────────────────────────────────────────
// Animated routes — AnimatePresence needs the location key to detect page changes
// ─────────────────────────────────────────────────────────────────────────────
function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

        {/* ── Public ── */}
        <Route path="/"           element={<PageTransition><Home /></PageTransition>} />
        <Route path="/about"      element={<PageTransition><AboutPage /></PageTransition>} />
        <Route path="/services"   element={<PageTransition><ServicesPage /></PageTransition>} />
        <Route path="/portfolio"  element={<PageTransition><PortfolioPage /></PageTransition>} />
        <Route path="/gallery"    element={<PageTransition><GalleryPage /></PageTransition>} />
        <Route path="/blog"       element={<PageTransition><BlogPage /></PageTransition>} />
        <Route path="/blog/:slug" element={<PageTransition><BlogSingle /></PageTransition>} />
        <Route path="/contact"    element={<PageTransition><ContactPage /></PageTransition>} />

        {/* ── Admin ── */}
        <Route path="/admin/login"    element={<AdminLogin />} />
        <Route path="/admin"          element={<AdminRoute><AdminDashboard /></AdminRoute>} />
        <Route path="/admin/projects" element={<AdminRoute><AdminProjects /></AdminRoute>} />
        <Route path="/admin/gallery"  element={<AdminRoute><AdminGallery /></AdminRoute>} />
        <Route path="/admin/blog"     element={<AdminRoute><AdminBlog /></AdminRoute>} />
        <Route path="/admin/team"     element={<AdminRoute><AdminTeam /></AdminRoute>} />
        <Route path="/admin/messages" element={<AdminRoute><AdminMessages /></AdminRoute>} />

      </Routes>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root App
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <BrowserRouter>
      <MotionProvider>

        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              fontFamily: 'Montserrat',
              fontWeight: 600,
              background: '#0a1628',
              color: '#fff',
              border: '1px solid rgba(248,149,33,.3)',
            },
          }}
        />

        {/* Preloader — shows before site content */}
        {!ready && <Preloader onComplete={() => setReady(true)} />}

        {/* Global always-on elements */}
        <AdvancedCursor />
        <ScrollProgress />
        <AuroraBackground />

        {/* Main site — fades in after preloader finishes */}
        <div style={{
          opacity:    ready ? 1 : 0,
          transition: 'opacity .6s ease',
          position:   'relative',
          zIndex:     1,
        }}>
          <AnimatedRoutes />
        </div>

      </MotionProvider>
    </BrowserRouter>
  );
}