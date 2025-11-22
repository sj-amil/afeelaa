'use client';

import { motion } from 'framer-motion';
import TypingText from './TypingText';

interface Practice {
  icon: string;
  title: string;
  description: string;
}

interface SustainablePracticesSectionProps {
  title: string;
  subtitle?: string;
  practices: Practice[];
  backgroundColor?: string;
  titleColor?: string;
}

export default function SustainablePracticesSection({
  title,
  subtitle,
  practices,
  backgroundColor = '#F5F5F5',
  titleColor = '#2C5F2D',
}: SustainablePracticesSectionProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor }}>
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-green-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <TypingText
            text={title}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 px-4"
            speed={0.03}
          />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] mx-auto rounded-full mb-4 sm:mb-6"
          />
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto px-4"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Practices Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
          {practices.map((practice, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 text-center active:scale-95"
            >
              {/* Icon Container */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#5D8A3A] to-[#6FA446] mb-5 sm:mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500"
              >
                <i className={`${practice.icon} text-3xl sm:text-4xl text-white`}></i>
              </motion.div>

              <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 mb-3 sm:mb-4 group-hover:text-[#5D8A3A] transition-colors duration-300">
                {practice.title}
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                {practice.description}
              </p>

              {/* Decorative Gradient Line */}
              <div className="w-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] rounded-full mt-5 sm:mt-6 mx-auto group-hover:w-16 sm:group-hover:w-20 transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
