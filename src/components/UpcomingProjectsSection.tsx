'use client';

import { motion } from 'framer-motion';
import TypingText from './TypingText';

interface UpcomingProject {
  icon: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
}

interface UpcomingProjectsSectionProps {
  sectionTitle: string;
  projects: UpcomingProject[];
  backgroundColor?: string;
  titleColor?: string;
}

export default function UpcomingProjectsSection({
  sectionTitle,
  projects,
  backgroundColor = '#FAFAFA',
  titleColor = '#2C5F2D',
}: UpcomingProjectsSectionProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor }}>
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-emerald-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16">
          <TypingText
            text={sectionTitle}
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-7 md:gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-7 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-l-4 border-[#5D8A3A] active:scale-[0.99]"
            >
              {/* Project Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
                className="relative group/img mb-5 sm:mb-6"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] rounded-2xl opacity-20 blur-xl group-hover/img:opacity-30 transition-opacity duration-500"></div>
                <div className="relative h-[200px] sm:h-[250px] rounded-2xl overflow-hidden shadow-xl">
                  <img
                    src={index === 0 ? "/hero/Pi7_image_tool_1.jpeg" : "/hero/Pi7_image_tool.jpeg"}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover/img:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                  {/* Floating Badge on Image */}
                  <div className="absolute top-4 right-4 px-3 sm:px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                    <p className="text-xs sm:text-sm font-semibold text-white">Coming Soon</p>
                  </div>

                  {/* Icon Badge on Image */}
                  <div className="absolute bottom-4 left-4 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#5D8A3A] to-[#6FA446] flex items-center justify-center shadow-lg">
                    <i className={`${project.icon} text-xl sm:text-2xl text-white`}></i>
                  </div>
                </div>
              </motion.div>

              {/* Category Badge */}
              <div className="inline-block mb-3 px-3 sm:px-4 py-1 bg-gradient-to-r from-[#5D8A3A]/10 to-[#6FA446]/10 rounded-full border border-[#5D8A3A]/20">
                <p className="text-xs sm:text-sm font-semibold text-[#5D8A3A]">Upcoming Project</p>
              </div>

              {/* Project Header */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 mb-2 group-hover:text-[#5D8A3A] transition-colors duration-300">
                {project.title}
              </h3>

              {/* Subtitle */}
              <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-600 mb-4 sm:mb-5 italic">
                {project.subtitle}
              </p>

              {/* Content */}
              <div className="space-y-3 sm:space-y-4">
                {project.paragraphs.map((paragraph, pIndex) => (
                  <motion.p
                    key={pIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: pIndex * 0.1 }}
                    className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed flex items-start gap-3"
                  >
                    <i className="fas fa-check-circle text-[#5D8A3A] mt-1 flex-shrink-0"></i>
                    <span>{paragraph}</span>
                  </motion.p>
                ))}
              </div>

              {/* Decorative Gradient Line */}
              <div className="w-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] rounded-full mt-5 sm:mt-6 group-hover:w-20 sm:group-hover:w-24 transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
