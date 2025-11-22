'use client';

import { motion } from 'framer-motion';
import TypingText from './TypingText';

interface TeamMember {
  name: string;
  title: string;
  specialization?: string;
}

interface TeamCategory {
  categoryTitle: string;
  categoryIcon: string;
  members: TeamMember[];
  description?: string;
}

interface OurTeamSectionProps {
  title: string;
  subtitle?: string;
  categories: TeamCategory[];
  backgroundColor?: string;
  titleColor?: string;
}

export default function OurTeamSection({
  title,
  subtitle,
  categories,
  backgroundColor = '#FAFAFA',
  titleColor = '#2C5F2D',
}: OurTeamSectionProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor }}>
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-emerald-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
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

        {/* Team Categories */}
        <div className="space-y-8 sm:space-y-10">
          {categories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-7">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-[#5D8A3A] to-[#6FA446] flex items-center justify-center shadow-lg">
                  <i className={`${category.categoryIcon} text-2xl sm:text-3xl text-white`}></i>
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-900">
                  {category.categoryTitle}
                </h3>
              </div>

              {/* Category Description */}
              {category.description && (
                <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-7 leading-relaxed">
                  {category.description}
                </p>
              )}

              {/* Team Members Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {category.members.map((member, memIndex) => (
                  <motion.div
                    key={memIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.3, delay: memIndex * 0.05 }}
                    className="group bg-gray-50/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-4 sm:p-5 border-l-4 border-[#5D8A3A] hover:shadow-lg hover:-translate-y-1 transition-all duration-300 active:scale-95"
                  >
                    <h4 className="font-extrabold text-gray-900 text-sm sm:text-base md:text-lg group-hover:text-[#5D8A3A] transition-colors duration-300">
                      {member.name}
                    </h4>
                    <p className="text-sm sm:text-base font-semibold text-[#5D8A3A] mt-1 sm:mt-2">
                      {member.title}
                    </p>
                    {member.specialization && (
                      <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-relaxed">
                        {member.specialization}
                      </p>
                    )}

                    {/* Decorative Gradient Line */}
                    <div className="w-0 h-0.5 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] rounded-full mt-3 group-hover:w-12 transition-all duration-500"></div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
