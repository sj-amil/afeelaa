'use client';

import { motion } from 'framer-motion';
import TypingText from './TypingText';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface HowToGetInvolvedSectionProps {
  title: string;
  subtitle?: string;
  steps: Step[];
  mockupImage?: string;
  backgroundColor?: string;
}

export default function HowToGetInvolvedSection({
  title,
  subtitle,
  steps,
  mockupImage,
  backgroundColor = '#FAFAFA',
}: HowToGetInvolvedSectionProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor }}>
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-emerald-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 md:gap-16 items-center">
          {/* Steps Side */}
          <div className="space-y-6 sm:space-y-8">
            {steps.map((step) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: step.number * 0.1 }}
                className="group flex items-start gap-4 sm:gap-6"
              >
                {/* Step Number */}
                <div className="flex-shrink-0 relative">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#5D8A3A] to-[#6FA446] text-white flex items-center justify-center font-extrabold text-xl sm:text-2xl shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {step.number}
                  </div>
                  {/* Connector Line */}
                  {step.number < steps.length && (
                    <div className="hidden sm:block absolute top-20 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-[#6FA446] to-transparent opacity-30"></div>
                  )}
                </div>

                {/* Step Content */}
                <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-5 sm:p-6 shadow-md group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1 border border-white/50 active:scale-95">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#5D8A3A] transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Decorative Gradient Line */}
                  <div className="w-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] rounded-full mt-3 sm:mt-4 group-hover:w-12 sm:group-hover:w-16 transition-all duration-500"></div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Mockup Side */}
          <div className="relative group">
            {mockupImage ? (
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={mockupImage}
                    alt="Platform mockup"
                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            ) : (
              <div className="relative bg-gradient-to-br from-emerald-50 via-green-50 to-emerald-100 rounded-3xl p-16 flex items-center justify-center min-h-[500px] shadow-xl overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#5D8A3A] rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#6FA446] rounded-full blur-3xl"></div>
                </div>
                <div className="relative text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-[#5D8A3A] to-[#6FA446] rounded-3xl flex items-center justify-center shadow-2xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                    <i className="fas fa-mobile-alt text-6xl text-white"></i>
                  </div>
                  <p className="text-xl font-bold text-gray-700">Platform Preview</p>
                  <p className="text-sm text-gray-500 mt-2">Coming Soon</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
