'use client';

import { motion } from 'framer-motion';
import TypingText from './TypingText';

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface ServicesSectionProps {
  title: string;
  services: Service[];
  backgroundColor?: string;
}

export default function ServicesSection({
  title,
  services,
  backgroundColor = '#FAFAFA',
}: ServicesSectionProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor }}>
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-green-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
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
            className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] mx-auto rounded-full"
          />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-7 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/20 active:scale-95"
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#5D8A3A]/5 to-[#6FA446]/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="mb-5 sm:mb-6">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#5D8A3A] to-[#6FA446] flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg">
                    <i className={`${service.icon} text-2xl sm:text-3xl text-white`}></i>
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2 sm:mb-3 group-hover:text-[#5D8A3A] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
