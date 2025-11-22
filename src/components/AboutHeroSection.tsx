'use client';

import { motion } from 'framer-motion';
import TypingText from './TypingText';

interface VisionMissionValue {
  label: string;
  content: string;
}

interface AboutHeroSectionProps {
  title: string;
  paragraphs: string[];
  visionMissionValues: VisionMissionValue[];
  backgroundColor?: string;
  titleColor?: string;
}

export default function AboutHeroSection({
  title,
  paragraphs,
  visionMissionValues,
  backgroundColor = '#FAFAFA',
  titleColor = '#2C5F2D',
}: AboutHeroSectionProps) {
  return (
    <>
      {/* Hero Banner Section */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/hero/Pi7_image_tool.jpeg"
            alt="Afeelaa Farms"
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
              <p className="text-xs sm:text-sm font-semibold text-emerald-100">About Afeelaa Farms</p>
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
              className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-white/80 to-emerald-100 mx-auto rounded-full"
            />
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
      </section>

      {/* Content Section */}
      <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor }}>
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-200 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Paragraphs with Staggered Animation */}
          <div className="space-y-4 sm:space-y-5 mb-12 sm:mb-14 md:mb-16">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed text-center max-w-4xl mx-auto flex items-start gap-3"
              >
                <i className="fas fa-leaf text-[#5D8A3A] mt-1 flex-shrink-0 text-sm sm:text-base"></i>
                <span>{paragraph}</span>
              </motion.p>
            ))}
          </div>

          {/* Vision/Mission/Values Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 md:gap-8">
            {visionMissionValues.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group relative"
              >
                {/* Gradient Background Card */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] rounded-2xl sm:rounded-3xl opacity-20 blur group-hover:opacity-30 transition-opacity duration-500"></div>

                <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-7 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 active:scale-95 h-full flex flex-col">
                  {/* Icon */}
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#5D8A3A] to-[#6FA446] flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <i className={`fas ${index === 0 ? 'fa-eye' : index === 1 ? 'fa-bullseye' : 'fa-heart'} text-2xl sm:text-3xl text-white`}></i>
                  </div>

                  <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 mb-3 sm:mb-4 group-hover:text-[#5D8A3A] transition-colors duration-300">
                    {item.label}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed flex-1">
                    {item.content}
                  </p>

                  {/* Decorative Gradient Line */}
                  <div className="w-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] rounded-full mt-5 sm:mt-6 group-hover:w-full transition-all duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
