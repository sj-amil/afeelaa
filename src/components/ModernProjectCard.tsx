'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface ModernProjectCardProps {
  imageSrc: string;
  title: string;
  location: string;
  returnRate: string;
  minInvestment: string;
  duration: string;
  raisedPercentage: number;
  totalInvestors?: number;
  link: string;
}

export default function ModernProjectCard({
  imageSrc,
  title,
  location,
  returnRate,
  minInvestment,
  duration,
  raisedPercentage,
  totalInvestors = 0,
  link,
}: ModernProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
      className="group relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 active:scale-95"
    >
      {/* Project Image */}
      <div className="relative h-48 sm:h-52 md:h-56 overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

        {/* Return Rate Badge */}
        <div className="absolute top-3 sm:top-5 right-3 sm:right-5 bg-white/10 backdrop-blur-xl border border-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl sm:rounded-2xl shadow-lg">
          <div className="text-center">
            <p className="text-lg sm:text-xl md:text-2xl font-extrabold text-white">{returnRate}</p>
            <p className="text-[10px] sm:text-xs text-emerald-100 font-medium">Returns</p>
          </div>
        </div>

        {/* Location Badge */}
        <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 bg-white/10 backdrop-blur-xl border border-white/20 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full flex items-center gap-1.5 sm:gap-2">
          <i className="fas fa-map-marker-alt text-emerald-300 text-xs sm:text-sm"></i>
          <span className="text-xs sm:text-sm text-white font-medium">{location}</span>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-5 sm:p-6 md:p-7 bg-gradient-to-b from-white to-gray-50">
        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-4 sm:mb-5 group-hover:text-[#5D8A3A] transition-colors duration-300 line-clamp-2">
          {title}
        </h3>

        {/* Investment Details */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-5">
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100">
            <p className="text-[10px] sm:text-xs text-gray-500 mb-1 font-medium">Min. Investment</p>
            <p className="text-sm sm:text-base font-extrabold text-gray-900">{minInvestment}</p>
          </div>
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-sm border border-gray-100">
            <p className="text-[10px] sm:text-xs text-gray-500 mb-1 font-medium">Duration</p>
            <p className="text-sm sm:text-base font-extrabold text-gray-900">{duration}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-5 sm:mb-6">
          <div className="flex justify-between text-[10px] sm:text-xs font-semibold text-gray-600 mb-2 sm:mb-3">
            <span className="flex items-center gap-1">
              <i className="fas fa-chart-line text-[#5D8A3A] text-xs"></i>
              <span className="hidden sm:inline">Funded: </span>{raisedPercentage}%
            </span>
            {totalInvestors > 0 && (
              <span className="flex items-center gap-1">
                <i className="fas fa-users text-[#5D8A3A] text-xs"></i>
                {totalInvestors}<span className="hidden sm:inline"> Investors</span>
              </span>
            )}
          </div>
          <div className="relative w-full bg-gray-200 rounded-full h-2.5 sm:h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.min(raisedPercentage, 100)}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] rounded-full shadow-lg"
            ></motion.div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50"></div>
          </div>
        </div>

        {/* Invest Button */}
        <Link
          href={link}
          className="group/btn relative w-full py-3 sm:py-4 rounded-full font-extrabold text-sm sm:text-base text-white text-center block overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #5D8A3A 0%, #6FA446 100%)' }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Invest Now
            <i className="fas fa-arrow-right group-hover/btn:translate-x-1 transition-transform text-xs sm:text-sm"></i>
          </span>
          <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-20 transition-opacity"></div>
        </Link>
      </div>
    </motion.div>
  );
}
