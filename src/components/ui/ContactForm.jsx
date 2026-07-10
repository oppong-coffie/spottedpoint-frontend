import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../api/axios';
import toast from 'react-hot-toast';
import use3DTilt from '../../hooks/use3DTilt';
import { BRAND } from '../../utils/constants';

export default function ContactForm({ style = {}, title, subtitle }) {
  const formRef = use3DTilt();
  const [searchParams] = useSearchParams();
  const planParam = searchParams.get('plan');
  const serviceParam = searchParams.get('service');

  const [formData, setFormData] = useState(() => {
    let initialService = 'General Inquiry';
    let initialMessage = '';

    if (serviceParam) {
      initialService = serviceParam;
    } else if (planParam) {
      const planUpper = planParam.toUpperCase();
      if (planUpper.includes('BRANDING') || planUpper.includes('BRAND')) {
        initialService = 'Brand Identity & Design';
      } else if (planUpper.includes('SOCIAL') || planUpper.includes('MEDIA')) {
        initialService = 'Social Media Management';
      } else if (planUpper.includes('ADS') || planUpper.includes('MARKETING') || planUpper.includes('PIXEL') || planUpper.includes('SEO') || planUpper.includes('SEM') || planUpper.includes('CONVERSION')) {
        initialService = 'Digital Marketing';
      } else if (planUpper.includes('ANIMATION') || planUpper.includes('MOTION')) {
        initialService = 'Video & Motion Production';
      } else if (planUpper.includes('FUNERAL') || planUpper.includes('CHURCH') || planUpper.includes('GRAPHIC') || planUpper.includes('POSTER') || planUpper.includes('FLYER') || planUpper.includes('BILLBOARD') || planUpper.includes('BROCHURE')) {
        initialService = 'Brand Identity & Design';
      }
      initialMessage = `Hello, I am interested in ordering the "${planParam}" plan. Please get in touch with me to discuss details.`;
    }

    return {
      name: '',
      email: '',
      service: initialService,
      message: initialMessage
    };
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    const toastId = toast.loading('Sending your message...');

    try {
      await api.post('/contact', formData);
      toast.success('Thank you! Your message has been sent successfully.', { id: toastId });
      setFormData({
        name: '',
        email: '',
        service: 'General Inquiry',
        message: ''
      });
    } catch (err) {
      console.error('Contact submission error:', err);
      toast.error('Failed to send message. Please check your network and try again.', { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form 
      ref={formRef}
      onSubmit={handleSubmit}
      className="morph-card"
      style={{ 
        background: BRAND.offWhite, 
        borderRadius: 24, 
        padding: '40px 36px', 
        border: `1px solid ${BRAND.blue}10`,
        boxShadow: '0 8px 30px rgba(40,59,144,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        width: '100%',
        maxWidth: 550,
        ...style
      }}
    >
      <h3 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, color: BRAND.blue, fontSize: '1.4rem', marginBottom: 6 }}>
        {title || 'Send a Message'}
      </h3>
      <p style={{ color: BRAND.gray, fontSize: '.88rem', marginBottom: 10 }}>
        {subtitle || 'Fill out the form below, and our team will get back to you within 24 hours.'}
      </p>

      {/* Name */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label htmlFor="name" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.8rem', color: BRAND.blue }}>Full Name *</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          required 
          placeholder="Enter your name"
          style={{ 
            padding: '13px 16px', borderRadius: 10, border: `1px solid ${BRAND.blue}20`, 
            background: '#fff', color: BRAND.blue, fontFamily: "'Poppins',sans-serif", 
            fontSize: '.9rem', outline: 'none', transition: 'border-color .25s' 
          }}
          onFocus={e => e.target.style.borderColor = BRAND.orange}
          onBlur={e => e.target.style.borderColor = `${BRAND.blue}20`}
        />
      </div>

      {/* Email */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label htmlFor="email" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.8rem', color: BRAND.blue }}>Email Address *</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          required 
          placeholder="name@company.com"
          style={{ 
            padding: '13px 16px', borderRadius: 10, border: `1px solid ${BRAND.blue}20`, 
            background: '#fff', color: BRAND.blue, fontFamily: "'Poppins',sans-serif", 
            fontSize: '.9rem', outline: 'none', transition: 'border-color .25s' 
          }}
          onFocus={e => e.target.style.borderColor = BRAND.orange}
          onBlur={e => e.target.style.borderColor = `${BRAND.blue}20`}
        />
      </div>

      {/* Service Dropdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label htmlFor="service" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.8rem', color: BRAND.blue }}>Interested In</label>
        <select 
          id="service" 
          name="service" 
          value={formData.service} 
          onChange={handleChange}
          style={{ 
            padding: '13px 16px', borderRadius: 10, border: `1px solid ${BRAND.blue}20`, 
            background: '#fff', color: BRAND.blue, fontFamily: "'Poppins',sans-serif", 
            fontSize: '.9rem', outline: 'none', cursor: 'pointer', transition: 'border-color .25s' 
          }}
          onFocus={e => e.target.style.borderColor = BRAND.orange}
          onBlur={e => e.target.style.borderColor = `${BRAND.blue}20`}
        >
          <option value="General Inquiry">General Inquiry</option>
          <option value="Brand Identity & Design">Brand Identity & Design</option>
          <option value="Web & App Development">Web & App Development</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Video & Motion Production">Video & Motion Production</option>
          <option value="Social Media Management">Social Media Management</option>
          <option value="IT Solutions & Networking">IT Solutions & Networking</option>
          <option value="Spotted Point Academy">Spotted Point Academy</option>
        </select>
      </div>

      {/* Message */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label htmlFor="message" style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: '.8rem', color: BRAND.blue }}>Message *</label>
        <textarea 
          id="message" 
          name="message" 
          rows="5"
          value={formData.message} 
          onChange={handleChange} 
          required 
          placeholder="Tell us about your project or inquiry..."
          style={{ 
            padding: '13px 16px', borderRadius: 10, border: `1px solid ${BRAND.blue}20`, 
            background: '#fff', color: BRAND.blue, fontFamily: "'Poppins',sans-serif", 
            fontSize: '.9rem', outline: 'none', resize: 'vertical', transition: 'border-color .25s' 
          }}
          onFocus={e => e.target.style.borderColor = BRAND.orange}
          onBlur={e => e.target.style.borderColor = `${BRAND.blue}20`}
        />
      </div>

      {/* Submit button */}
      <button 
        type="submit" 
        disabled={submitting}
        className="btn btn-primary btn-morph"
        style={{ 
          marginTop: 10, 
          justifyContent: 'center', 
          cursor: submitting ? 'not-allowed' : 'pointer',
          opacity: submitting ? 0.8 : 1,
          width: '100%'
        }}
      >
        {submitting ? 'Sending...' : 'Send Message →'}
      </button>
    </form>
  );
}
