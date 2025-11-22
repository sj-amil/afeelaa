'use client';

import { motion } from 'framer-motion';
import TypingText from './TypingText';

interface WhyInvestCard {
  imageSrc: string;
  title: string;
  description: string;
}

interface WhyInvestSectionProps {
  title: string;
  subtitle?: string;
  cards: WhyInvestCard[];
  backgroundColor?: string;
}

export default function WhyInvestSection({
  title,
  subtitle,
  cards,
  backgroundColor = '#FAFAFA',
}: WhyInvestSectionProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor }}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 active:scale-95"
            >
              {/* Image Container */}
              <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
                <img
                  src={card.imageSrc}
                  alt={card.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-all duration-500"></div>

                {/* Floating Number Badge */}
                <div className="absolute top-4 sm:top-6 right-4 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl flex items-center justify-center border border-white/20 shadow-lg">
                  <span className="text-xl sm:text-2xl font-extrabold text-white">{index + 1}</span>
                </div>
              </div>

              {/* Content Container */}
              <div className="relative p-6 sm:p-7 md:p-8 bg-gradient-to-b from-white to-gray-50">
                {/* Decorative Line */}
                <div className="w-12 sm:w-16 h-0.5 sm:h-1 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] rounded-full mb-4 sm:mb-5"></div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-3 sm:mb-4 group-hover:text-[#5D8A3A] transition-colors duration-300 line-clamp-2">
                  {card.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                  {card.description}
                </p>

                {/* Hover Arrow */}
                <div className="mt-5 sm:mt-6 flex items-center text-[#5D8A3A] font-bold opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all duration-300">
                  <span className="text-xs sm:text-sm">Learn More</span>
                  <i className="fas fa-arrow-right ml-2 text-xs sm:text-sm"></i>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
