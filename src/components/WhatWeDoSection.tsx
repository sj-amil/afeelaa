'use client';

import { motion } from 'framer-motion';
import TypingText from './TypingText';

interface ProjectItem {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
}

interface WhatWeDoSectionProps {
  title: string;
  subtitle?: string;
  projects: ProjectItem[];
  backgroundColor?: string;
  titleColor?: string;
}

export default function WhatWeDoSection({
  title,
  subtitle,
  projects,
  backgroundColor = '#FAFAFA',
  titleColor = '#2C5F2D',
}: WhatWeDoSectionProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor }}>
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-emerald-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-0 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
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

        {/* Projects Cards */}
        <div className="space-y-6 sm:space-y-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 active:scale-95"
            >
              {/* Gradient Badge */}
              <div className="flex items-center gap-4 sm:gap-6 mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.2, type: "spring", stiffness: 200 }}
                  className="flex-shrink-0"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-[#5D8A3A] to-[#6FA446] flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <i className={`${project.icon} text-3xl sm:text-4xl md:text-5xl text-white`}></i>
                  </div>
                </motion.div>
                <div>
                  <div className="inline-block mb-2 px-3 sm:px-4 py-1 bg-gradient-to-r from-[#5D8A3A]/10 to-[#6FA446]/10 rounded-full border border-[#5D8A3A]/20">
                    <p className="text-xs sm:text-sm font-semibold text-[#5D8A3A]">{project.subtitle || 'Our Service'}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900 mb-4 sm:mb-5 group-hover:text-[#5D8A3A] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed flex items-start gap-3">
                  <i className="fas fa-check-circle text-[#5D8A3A] mt-1 flex-shrink-0"></i>
                  <span>{project.description}</span>
                </p>

                {/* Decorative Gradient Line */}
                <div className="w-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] rounded-full mt-5 sm:mt-6 group-hover:w-full transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
