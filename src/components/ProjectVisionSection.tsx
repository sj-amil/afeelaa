'use client';

import { motion } from 'framer-motion';
import TypingText from './TypingText';

interface ProjectVisionSectionProps {
  title: string;
  description: string;
  missionPoints: string[];
  backgroundColor?: string;
  titleColor?: string;
}

export default function ProjectVisionSection({
  title,
  description,
  missionPoints,
  backgroundColor = '#2C5F2D',
  titleColor = '#FFFFFF',
}: ProjectVisionSectionProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor }}>
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8 md:mb-10">
          <TypingText
            text={title}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 px-4"
            speed={0.03}
          />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-white/80 to-white/60 mx-auto rounded-full"
          />
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-sm sm:text-base md:text-lg leading-relaxed mb-8 sm:mb-10 md:mb-12 px-4 text-white/90"
        >
          {description}
        </motion.p>

        {/* Mission Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 border border-white/20 shadow-2xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-base sm:text-lg md:text-xl font-semibold mb-5 sm:mb-6 text-white"
          >
            Together, these projects represent Afeelaa's mission:
          </motion.p>

          <ul className="space-y-3 sm:space-y-4">
            {missionPoints.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.15 }}
                className="text-sm sm:text-base md:text-lg leading-relaxed text-white/90 flex items-start gap-3"
              >
                <span className="flex-shrink-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-white to-white/60 rounded-full mt-2"></span>
                <span className="flex-1">{point}</span>
              </motion.li>
            ))}
          </ul>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.6 }}
            className="flex justify-center mt-6 sm:mt-8"
          >
            <div className="flex gap-2 sm:gap-3">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white/60 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white/60 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white/60 rounded-full"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
