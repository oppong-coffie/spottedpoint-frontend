import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import AOS from 'aos';
import AdminLayout from '../../components/admin/AdminLayout';
import { BRAND } from '../../utils/constants';
import api from '../../api/axios';
import toast from 'react-hot-toast';

export default function AdminGallery() {
  const [items, setItems]   = useState([]);
  const [uploading, setUploading] = useState(false);
  const [form, setForm]     = useState({ title: '', category: 'General' });
  const [preview, setPreview] = useState(null);
  const [filter, setFilter] = useState('All');
  const [selected, setSelected] = useState(null);
  const [viewMode, setViewMode] = useState('comfortable'); // 'comfortable', 'compact', 'list'
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'oldest', 'alphabetical'

  const load = () => api.get('/gallery').then(r => setItems(r.data)).catch(() => {});
  
  useEffect(() => {
    load();
  }, []);

  // Refresh AOS when items, filters, or views change
  useEffect(() => {
    AOS.refresh();
  }, [items, filter, viewMode, sortBy]);

  const onDrop = useCallback(async (files) => {
    if (!files.length) return;
    const file = files[0];
    setPreview(URL.createObjectURL(file));
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('title', form.title);
      fd.append('category', form.category);
      await api.post('/gallery', fd);
      toast.success('Media uploaded!');
      setForm({ title: '', category: 'General' });
      setPreview(null);
      load();
    } catch { toast.error('Upload failed'); }
    finally { setUploading(false); }
  }, [form]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { 'image/*': [], 'video/*': [] }, multiple: false });

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this item?')) return;
    try { await api.delete(`/gallery/${id}`); toast.success('Deleted'); load(); }
    catch { toast.error('Delete failed'); }
  };

  const categories = ['All', 'General', 'Branding', 'Web Design', 'Video', 'Photography', 'Events', 'Team'];
  const getCount = (cat) => cat === 'All' ? items.length : items.filter(i => i.category === cat).length;

  // Sorting logic
  const sortedItems = [...items].sort((a, b) => {
    if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === 'alphabetical') return (a.title || '').localeCompare(b.title || '');
    return 0;
  });

  const filteredItems = filter === 'All' ? sortedItems : sortedItems.filter(i => i.category === filter);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getGridStyle = () => {
    if (viewMode === 'compact') {
      return { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 12 };
    }
    if (viewMode === 'list') {
      return { display: 'flex', flexDirection: 'column', gap: 10 };
    }
    return { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 20 };
  };

  const inputS = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 10,
    border: `1.5px solid ${BRAND.blue}18`,
    fontFamily: "'Poppins',sans-serif",
    fontSize: '.9rem',
    color: BRAND.blue,
    background: '#fff',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  return (
    <AdminLayout title="Gallery Manager">
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.5fr', gap: 32, alignItems: 'start' }}>

        {/* Upload panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{ background: '#fff', borderRadius: 20, padding: 28, border: `1px solid ${BRAND.blue}08`, boxShadow: '0 10px 30px rgba(6,13,31,0.02)', position: 'sticky', top: 110 }}
        >
          <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: BRAND.blue, marginBottom: 20, fontSize: '1.2rem' }}>Upload Media</h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
            <div>
              <label style={{ fontSize: '.75rem', fontWeight: 700, color: BRAND.gray, display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.05em' }}>Title (Optional)</label>
              <input style={inputS} placeholder="e.g. Workspace meeting" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            </div>
            
            <div>
              <label style={{ fontSize: '.75rem', fontWeight: 700, color: BRAND.gray, display: 'block', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.05em' }}>Category</label>
              <select style={inputS} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                {['General', 'Branding', 'Web Design', 'Video', 'Photography', 'Events', 'Team'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {/* Dropzone */}
          <motion.div
            {...getRootProps()}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            style={{
              border: `2px dashed ${isDragActive ? BRAND.orange : `${BRAND.blue}25`}`,
              borderRadius: 14,
              padding: 32,
              textAlign: 'center',
              cursor: 'pointer',
              background: isDragActive ? `${BRAND.orange}06` : `${BRAND.blue}02`,
              transition: 'all .25s ease',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <input {...getInputProps()} />
            {preview ? (
              <div style={{ position: 'relative' }}>
                <img src={preview} alt="Preview" style={{ width: '100%', borderRadius: 10, maxHeight: 200, objectFit: 'cover' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.25)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '.85rem', fontWeight: 700 }}>
                  Click to replace
                </div>
              </div>
            ) : (
              <>
                <div style={{ fontSize: '3rem', marginBottom: 14, filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.05))' }}>
                  {isDragActive ? '📥' : '📁'}
                </div>
                <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: BRAND.blue, marginBottom: 8, fontSize: '.95rem' }}>
                  {isDragActive ? 'Drop it here!' : 'Drag & drop file'}
                </p>
                <p style={{ color: BRAND.gray, fontSize: '.8rem', marginBottom: 0 }}>
                  PNG, JPG, WebP, MP4, MOV (Max 10MB)
                </p>
              </>
            )}
          </motion.div>

          {uploading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: 20, background: `linear-gradient(135deg, ${BRAND.orange}12, ${BRAND.orange}20)`, borderRadius: 10, padding: 16, textAlign: 'center', border: `1px solid ${BRAND.orange}20` }}
            >
              <div style={{ display: 'inline-block', width: 20, height: 20, border: `2.5px solid ${BRAND.orange}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', marginRight: 10, verticalAlign: 'middle' }} />
              <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, color: BRAND.orange, fontSize: '.85rem', verticalAlign: 'middle' }}>
                Uploading to Cloudinary...
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Gallery grid area */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header & Filter tabs */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color: BRAND.blue, margin: 0, fontSize: '1.25rem' }}>
                All Media ({items.length})
              </h3>

              {/* View & Sort Controls */}
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                {/* Sort Option */}
                <select
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: `1.5px solid ${BRAND.blue}15`,
                    fontSize: '.78rem',
                    fontFamily: "'Poppins',sans-serif",
                    outline: 'none',
                    color: BRAND.blue,
                    background: '#fff',
                    cursor: 'pointer'
                  }}
                >
                  <option value="newest">📅 Newest First</option>
                  <option value="oldest">📅 Oldest First</option>
                  <option value="alphabetical">🔤 Title (A-Z)</option>
                </select>

                {/* Grid Density Toggles */}
                <div style={{ display: 'flex', background: 'rgba(40,59,144,0.04)', padding: 3, borderRadius: 8, border: `1px solid ${BRAND.blue}05` }}>
                  {[
                    { id: 'comfortable', label: '🖼️ Grid' },
                    { id: 'compact', label: '📱 Compact' },
                    { id: 'list', label: '📃 List' }
                  ].map(mode => (
                    <button
                      key={mode.id}
                      onClick={() => setViewMode(mode.id)}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 6,
                        border: 'none',
                        background: viewMode === mode.id ? '#fff' : 'transparent',
                        color: BRAND.blue,
                        cursor: 'pointer',
                        fontSize: '.75rem',
                        fontWeight: 700,
                        transition: 'all 0.2s',
                        boxShadow: viewMode === mode.id ? '0 2px 6px rgba(40,59,144,0.1)' : 'none'
                      }}
                    >
                      {mode.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', background: 'rgba(40,59,144,0.03)', padding: 6, borderRadius: 12, border: `1px solid ${BRAND.blue}05` }}>
              {categories.map(c => {
                const count = getCount(c);
                if (c !== 'All' && count === 0) return null; // Hide empty categories in filters
                return (
                  <button
                    key={c}
                    onClick={() => setFilter(c)}
                    style={{
                      position: 'relative',
                      padding: '8px 16px',
                      borderRadius: 8,
                      cursor: 'pointer',
                      fontFamily: "'Montserrat',sans-serif",
                      fontWeight: 700,
                      fontSize: '.78rem',
                      background: filter === c ? BRAND.blue : 'transparent',
                      color: filter === c ? '#fff' : BRAND.blue,
                      border: 'none',
                      transition: 'all .25s cubic-bezier(0.16, 1, 0.3, 1)',
                      outline: 'none',
                      boxShadow: filter === c ? `0 4px 12px ${BRAND.blue}25` : 'none',
                    }}
                  >
                    {c} <span style={{ opacity: 0.6, fontSize: '.7rem', marginLeft: 4 }}>({count})</span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                style={{ background: '#fff', borderRadius: 20, padding: '80px 0', textAlign: 'center', border: `1px dashed ${BRAND.blue}15`, boxShadow: '0 10px 30px rgba(6,13,31,0.01)' }}
              >
                <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>🖼️</div>
                <p style={{ color: BRAND.blue, fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '1.05rem', marginBottom: 4 }}>No media found</p>
                <p style={{ color: BRAND.gray, fontSize: '.85rem' }}>Upload files to start building your gallery</p>
              </motion.div>
            ) : (
              <motion.div
                layout
                style={getGridStyle()}
              >
                {filteredItems.map((item, index) => {
                  // Render Comfortable / Compact Grid Mode
                  if (viewMode === 'comfortable' || viewMode === 'compact') {
                    const isCompact = viewMode === 'compact';
                    return (
                      <motion.div
                        key={item._id}
                        layout
                        exit={{ opacity: 0, scale: 0.9, y: 15 }}
                        whileHover="hover"
                        onClick={() => setSelected(item)}
                        data-aos="fade-up"
                        data-aos-delay={(index % 4) * 80}
                        style={{
                          borderRadius: 16,
                          overflow: 'hidden',
                          background: '#fff',
                          border: `1px solid ${BRAND.blue}08`,
                          position: 'relative',
                          boxShadow: '0 4px 20px rgba(6,13,31,0.03)',
                          cursor: 'zoom-in',
                          display: 'flex',
                          flexDirection: 'column',
                        }}
                      >
                        {/* Media content */}
                        <div style={{ position: 'relative', height: isCompact ? 100 : 140, overflow: 'hidden', background: '#f5f6fa' }}>
                          {/* Floating Category pill */}
                          <span style={{
                            position: 'absolute',
                            top: isCompact ? 6 : 10,
                            left: isCompact ? 6 : 10,
                            zIndex: 5,
                            fontSize: isCompact ? '.55rem' : '.62rem',
                            background: 'rgba(255, 255, 255, 0.85)',
                            backdropFilter: 'blur(8px)',
                            color: BRAND.blue,
                            padding: isCompact ? '2px 6px' : '4px 10px',
                            borderRadius: 30,
                            fontFamily: "'Montserrat',sans-serif",
                            fontWeight: 800,
                            textTransform: 'uppercase',
                            letterSpacing: '.06em',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                          }}>
                            {item.category || 'General'}
                          </span>

                          {item.type === 'video' ? (
                            <motion.video
                              variants={{
                                hover: { scale: 1.08 }
                              }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              src={item.url}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                              muted
                            />
                          ) : (
                            <motion.img
                              variants={{
                                hover: { scale: 1.08 }
                              }}
                              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                              src={item.url}
                              alt={item.title}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                              loading="lazy"
                            />
                          )}

                          {/* Glassmorphic Play/View overlay */}
                          <motion.div
                            variants={{
                              hover: { opacity: 1, scale: 1 }
                            }}
                            initial={{ opacity: 0, scale: 0.85 }}
                            transition={{ duration: 0.25 }}
                            style={{
                              position: 'absolute',
                              inset: 0,
                              background: 'rgba(6, 13, 31, 0.35)',
                              backdropFilter: 'blur(3px)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#fff',
                              pointerEvents: 'none'
                            }}
                          >
                            <div style={{
                              width: isCompact ? 32 : 44,
                              height: isCompact ? 32 : 44,
                              borderRadius: '50%',
                              background: 'rgba(255,255,255,0.22)',
                              border: '1px solid rgba(255,255,255,0.4)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: isCompact ? '.8rem' : '1.1rem',
                              boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                            }}>
                              {item.type === 'video' ? '▶' : '🔍'}
                            </div>
                          </motion.div>
                        </div>

                        {/* Metadata & Actions */}
                        <div style={{ padding: isCompact ? '10px 12px 12px' : '14px 16px 16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                          <div style={{ marginBottom: isCompact ? 8 : 12 }}>
                            <p style={{
                              fontFamily: "'Montserrat',sans-serif",
                              fontWeight: 700,
                              fontSize: isCompact ? '.75rem' : '.82rem',
                              color: BRAND.blue,
                              marginBottom: 4,
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap'
                            }}>
                              {item.title || 'Untitled Media'}
                            </p>
                            {!isCompact && (
                              <p style={{ color: BRAND.gray, fontSize: '.7rem', margin: 0 }}>
                                Added {formatDate(item.createdAt)}
                              </p>
                            )}
                          </div>

                          <button
                            onClick={(e) => { e.stopPropagation(); handleDelete(item._id); }}
                            style={{
                              width: '100%',
                              padding: isCompact ? '6px' : '9px',
                              borderRadius: 8,
                              background: '#fef2f2',
                              border: 'none',
                              color: '#ef4444',
                              cursor: 'pointer',
                              fontFamily: "'Montserrat',sans-serif",
                              fontWeight: 700,
                              fontSize: isCompact ? '.7rem' : '.75rem',
                              transition: 'all .2s ease',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: 6
                            }}
                            onMouseEnter={e => {
                              e.currentTarget.style.background = '#ef4444';
                              e.currentTarget.style.color = '#fff';
                            }}
                            onMouseLeave={e => {
                              e.currentTarget.style.background = '#fef2f2';
                              e.currentTarget.style.color = '#ef4444';
                            }}
                          >
                            🗑 Delete
                          </button>
                        </div>
                      </motion.div>
                    );
                  }

                  // Render List View Mode
                  return (
                    <motion.div
                      key={item._id}
                      layout
                      exit={{ opacity: 0, scale: 0.95 }}
                      onClick={() => setSelected(item)}
                      data-aos="fade-up"
                      data-aos-delay={index * 30}
                      style={{
                        borderRadius: 12,
                        overflow: 'hidden',
                        background: '#fff',
                        border: `1px solid ${BRAND.blue}08`,
                        boxShadow: '0 2px 10px rgba(6,13,31,0.02)',
                        cursor: 'zoom-in',
                        display: 'flex',
                        alignItems: 'center',
                        padding: 12,
                        gap: 16,
                        transition: 'transform 0.2s, box-shadow 0.2s'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'translateX(4px)';
                        e.currentTarget.style.boxShadow = '0 4px 15px rgba(6,13,31,0.05)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'none';
                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(6,13,31,0.02)';
                      }}
                    >
                      {/* Thumbnail */}
                      <div style={{ width: 60, height: 60, borderRadius: 8, overflow: 'hidden', background: '#f5f6fa', flexShrink: 0 }}>
                        {item.type === 'video' ? (
                          <video src={item.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} muted />
                        ) : (
                          <img src={item.url} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                        )}
                      </div>
                      
                      {/* Details */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.85rem', color: BRAND.blue, margin: '0 0 4px 0', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {item.title || 'Untitled Media'}
                        </p>
                        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '.65rem', background: `${BRAND.blue}10`, color: BRAND.blue, padding: '2px 8px', borderRadius: 4, fontWeight: 700, textTransform: 'uppercase' }}>
                            {item.category || 'General'}
                          </span>
                          <span style={{ color: BRAND.gray, fontSize: '.7rem' }}>
                            Added {formatDate(item.createdAt)}
                          </span>
                        </div>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(item._id); }}
                        style={{
                          padding: '8px 14px',
                          borderRadius: 8,
                          background: '#fef2f2',
                          border: 'none',
                          color: '#ef4444',
                          cursor: 'pointer',
                          fontFamily: "'Montserrat',sans-serif",
                          fontWeight: 700,
                          fontSize: '.75rem',
                          transition: 'all .2s ease',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.background = '#ef4444';
                          e.currentTarget.style.color = '#fff';
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.background = '#fef2f2';
                          e.currentTarget.style.color = '#ef4444';
                        }}
                      >
                        Delete
                      </button>
                    </motion.div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Immersive Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(6, 13, 31, 0.95)',
              zIndex: 2000,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 24,
              cursor: 'zoom-out',
              backdropFilter: 'blur(10px)'
            }}
          >
            <motion.div
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              style={{ position: 'relative', maxWidth: '90vw', maxHeight: '85vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setSelected(null)}
                style={{
                  position: 'absolute',
                  top: -60,
                  right: 0,
                  background: BRAND.orange,
                  color: '#fff',
                  border: 'none',
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  fontSize: '1.2rem',
                  fontWeight: 900,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  transition: 'transform 0.2s ease'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1) rotate(90deg)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1) rotate(0deg)'}
              >
                ✕
              </button>

              <div style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.6)', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {selected.type === 'video' ? (
                  <video src={selected.url} controls autoPlay style={{ maxWidth: '90vw', maxHeight: '75vh', display: 'block' }} />
                ) : (
                  <img src={selected.url} alt={selected.title} style={{ maxWidth: '90vw', maxHeight: '75vh', objectFit: 'contain', display: 'block' }} />
                )}
              </div>

              {/* Title & Info Card */}
              <div style={{
                marginTop: 20,
                textAlign: 'center',
                color: '#fff',
                fontFamily: "'Montserrat', sans-serif"
              }}>
                <h4 style={{ fontWeight: 800, fontSize: '1.2rem', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
                  {selected.title || 'Untitled Media'}
                </h4>
                <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
                  <span style={{ fontSize: '.7rem', background: `${BRAND.orange}33`, color: BRAND.orange, padding: '3px 10px', borderRadius: 20, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.06em' }}>
                    {selected.category || 'General'}
                  </span>
                  <span style={{ opacity: 0.5, fontSize: '.75rem' }}>
                    Uploaded {formatDate(selected.createdAt)}
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global CSS spinner rule */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </AdminLayout>
  );
}