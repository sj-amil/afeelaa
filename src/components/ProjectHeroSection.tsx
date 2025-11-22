'use client';

import { motion } from 'framer-motion';
import TypingText from './TypingText';

interface ProjectHeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  backgroundColor?: string;
  titleColor?: string;
}

export default function ProjectHeroSection({
  title,
  subtitle,
  description,
  backgroundColor = '#FAFAFA',
  titleColor = '#2C5F2D',
}: ProjectHeroSectionProps) {
  return (
    <section className="relative h-[500px] sm:h-[600px] md:h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero/Pi7_image_tool_2.jpeg"
          alt="Our Projects"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#2C5F2D]/90 via-[#3D7A3E]/85 to-[#5D8A3A]/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-4 sm:mb-6 px-4 sm:px-5 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
          >
            <p className="text-xs sm:text-sm font-semibold text-emerald-100">Our Investment Projects</p>
          </motion.div>

          <TypingText
            text={title}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 sm:mb-6 px-4"
            speed={0.03}
          />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-white/80 to-emerald-100 mx-auto rounded-full mb-6 sm:mb-8"
          />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-lg sm:text-xl md:text-2xl font-semibold text-white/90 mb-4 sm:mb-5 px-4"
          >
            {subtitle}
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-sm sm:text-base md:text-lg text-white/80 leading-relaxed max-w-3xl mx-auto px-4"
          >
            {description}
          </motion.p>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
    </section>
  );
}
