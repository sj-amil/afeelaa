'use client';

import { motion } from 'framer-motion';
import TypingText from './TypingText';

interface GAPCertificationSectionProps {
  title: string;
  content: string[];
  backgroundColor?: string;
  titleColor?: string;
}

export default function GAPCertificationSection({
  title,
  content,
  backgroundColor = '#F5F5F5',
  titleColor = '#2C5F2D',
}: GAPCertificationSectionProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor }}>
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-emerald-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 lg:p-16 shadow-2xl border-4 border-[#5D8A3A]"
        >
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full mb-5 sm:mb-6 bg-gradient-to-br from-[#5D8A3A] to-[#6FA446] shadow-xl"
            >
              <i className="fas fa-certificate text-4xl sm:text-5xl md:text-6xl text-white"></i>
            </motion.div>

            <TypingText
              text={title}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 px-4"
              speed={0.03}
            />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] mx-auto rounded-full"
            />
          </div>

          <div className="space-y-4 sm:space-y-5">
            {content.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex justify-center mt-8 sm:mt-10 md:mt-12"
          >
            <div className="flex gap-2 sm:gap-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] rounded-full"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
