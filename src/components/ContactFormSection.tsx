'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import TypingText from './TypingText';

interface ContactFormSectionProps {
  backgroundColor?: string;
  titleColor?: string;
}

export default function ContactFormSection({
  backgroundColor = '#FAFAFA',
  titleColor = '#2C5F2D',
}: ContactFormSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor }}>
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <TypingText
            text="Send Us a Message"
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 px-4"
            speed={0.03}
          />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] mx-auto rounded-full mb-4 sm:mb-5"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-sm sm:text-base md:text-lg text-gray-700 max-w-2xl mx-auto px-4"
          >
            Have questions? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] rounded-3xl opacity-20 blur"></div>
          <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl border-2 border-[#5D8A3A]/20">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <label htmlFor="name" className="flex items-center gap-2 text-sm sm:text-base font-bold text-gray-900 mb-2">
                    <i className="fas fa-user text-[#5D8A3A]"></i>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D8A3A]/50 focus:border-[#5D8A3A] transition-all duration-300 text-sm sm:text-base"
                    placeholder="Your full name"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <label htmlFor="email" className="flex items-center gap-2 text-sm sm:text-base font-bold text-gray-900 mb-2">
                    <i className="fas fa-envelope text-[#5D8A3A]"></i>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D8A3A]/50 focus:border-[#5D8A3A] transition-all duration-300 text-sm sm:text-base"
                    placeholder="your.email@example.com"
                  />
                </motion.div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 mb-5 sm:mb-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <label htmlFor="phone" className="flex items-center gap-2 text-sm sm:text-base font-bold text-gray-900 mb-2">
                    <i className="fas fa-phone text-[#5D8A3A]"></i>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D8A3A]/50 focus:border-[#5D8A3A] transition-all duration-300 text-sm sm:text-base"
                    placeholder="+880 1234-567890"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <label htmlFor="subject" className="flex items-center gap-2 text-sm sm:text-base font-bold text-gray-900 mb-2">
                    <i className="fas fa-tag text-[#5D8A3A]"></i>
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D8A3A]/50 focus:border-[#5D8A3A] transition-all duration-300 text-sm sm:text-base"
                    placeholder="How can we help?"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-6 sm:mb-8"
              >
                <label htmlFor="message" className="flex items-center gap-2 text-sm sm:text-base font-bold text-gray-900 mb-2">
                  <i className="fas fa-comment-alt text-[#5D8A3A]"></i>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 sm:px-5 py-3 sm:py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#5D8A3A]/50 focus:border-[#5D8A3A] transition-all duration-300 resize-none text-sm sm:text-base"
                  placeholder="Tell us more about your inquiry..."
                ></textarea>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex flex-col sm:flex-row items-center gap-4"
              >
                <button
                  type="submit"
                  className="group relative w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-extrabold text-center text-white transition-all hover:shadow-2xl shadow-lg text-base sm:text-lg overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446]"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6FA446] to-[#5D8A3A] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <span className="relative flex items-center justify-center gap-2">
                    <i className="fas fa-paper-plane"></i>
                    Send Message
                    <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform duration-300"></i>
                  </span>
                </button>
                <p className="text-xs sm:text-sm text-gray-600 flex items-center gap-2">
                  <i className="fas fa-shield-alt text-[#5D8A3A]"></i>
                  Your information is safe with us
                </p>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
