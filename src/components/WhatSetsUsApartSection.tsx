'use client';

import { motion } from 'framer-motion';

interface WhatSetsUsApartSectionProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
}

export default function WhatSetsUsApartSection({
  title,
  description,
  imageSrc,
  imageAlt = 'Agriculture',
}: WhatSetsUsApartSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7 }}
            className="relative group order-2 lg:order-1"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] rounded-2xl sm:rounded-3xl opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500"></div>
            <div className="relative h-[350px] sm:h-[450px] md:h-[550px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={imageSrc}
                alt={imageAlt}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative bg-gradient-to-br from-[#2C5F2D] via-[#3D7A3E] to-[#5D8A3A] text-white p-8 sm:p-10 md:p-14 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>

              <div className="relative z-10">
                <div className="inline-block mb-4 sm:mb-6 px-4 sm:px-5 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                  <p className="text-xs sm:text-sm font-semibold text-emerald-100">Why Choose Us</p>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 sm:mb-6 leading-tight bg-gradient-to-r from-white to-emerald-100 bg-clip-text text-transparent">
                  {title}
                </h2>

                <div className="space-y-4 sm:space-y-5 text-sm sm:text-base md:text-lg leading-relaxed text-white/90">
                  {description.split('\n').map((paragraph, index) => (
                    paragraph && (
                      <p key={index} className="flex items-start gap-2 sm:gap-3">
                        <i className="fas fa-check-circle text-emerald-300 mt-0.5 sm:mt-1 flex-shrink-0 text-sm sm:text-base"></i>
                        <span>{paragraph}</span>
                      </p>
                    )
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
