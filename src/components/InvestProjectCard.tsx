'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface InvestmentDetail {
  label: string;
  value: string;
}

interface WhyInvestPoint {
  text: string;
}

interface InvestProjectCardProps {
  icon: string;
  title: string;
  subtitle: string;
  description: string[];
  investmentDetails: InvestmentDetail[];
  whyInvest: WhyInvestPoint[];
  callToAction: string;
  titleColor?: string;
  buttonColor?: string;
  imageUrl?: string;
  index?: number;
}

export default function InvestProjectCard({
  icon,
  title,
  subtitle,
  description,
  investmentDetails,
  whyInvest,
  callToAction,
  titleColor = '#2C5F2D',
  buttonColor = '#2C5F2D',
  imageUrl,
  index = 0,
}: InvestProjectCardProps) {
  const images = ["/hero/Pi7_image_tool.jpeg", "/hero/Pi7_image_tool_2.jpeg", "/hero/Pi7_image_tool_1.jpeg"];
  const projectImage = imageUrl || images[index % images.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-[#5D8A3A]/20 active:scale-[0.99]"
    >
      {/* Two Column Layout: Image + Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8">
        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: index * 0.15 + 0.2 }}
          className="relative group/img"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] rounded-2xl opacity-20 blur-xl group-hover/img:opacity-30 transition-opacity duration-500"></div>
          <div className="relative h-[250px] sm:h-[300px] lg:h-full min-h-[280px] rounded-2xl overflow-hidden shadow-xl">
            <img
              src={projectImage}
              alt={title}
              className="w-full h-full object-cover transform group-hover/img:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            {/* Floating Badge on Image */}
            <div className="absolute top-4 right-4 px-3 sm:px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <p className="text-xs sm:text-sm font-semibold text-white">Open for Investment</p>
            </div>

            {/* Icon Badge */}
            <div className="absolute bottom-4 left-4 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#5D8A3A] to-[#6FA446] flex items-center justify-center shadow-lg">
              <i className={`${icon} text-2xl sm:text-3xl text-white`}></i>
            </div>
          </div>
        </motion.div>

        {/* Header Content */}
        <div className="flex flex-col justify-center">
          <div className="inline-block mb-3 px-3 sm:px-4 py-1 bg-gradient-to-r from-[#5D8A3A]/10 to-[#6FA446]/10 rounded-full border border-[#5D8A3A]/20 self-start">
            <p className="text-xs sm:text-sm font-semibold text-[#5D8A3A]">Investment Opportunity</p>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 group-hover:text-[#5D8A3A] transition-colors duration-300">
            {title}
          </h2>
          <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-600 italic">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-4 mb-8">
        {description.map((paragraph, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed flex items-start gap-3"
          >
            <i className="fas fa-check-circle text-[#5D8A3A] mt-1 flex-shrink-0"></i>
            <span>{paragraph}</span>
          </motion.p>
        ))}
      </div>

      {/* Investment Details - Premium Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative mb-8"
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] rounded-2xl opacity-20 blur"></div>
        <div className="relative bg-gradient-to-br from-[#2C5F2D] via-[#3D7A3E] to-[#5D8A3A] text-white rounded-2xl p-6 sm:p-8">
          <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold mb-5 flex items-center gap-2">
            <i className="fas fa-chart-line"></i>
            Investment Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {investmentDetails.map((detail, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-xs sm:text-sm text-white/80 mb-1">{detail.label}</div>
                <div className="text-base sm:text-lg font-bold text-white">{detail.value}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Why Invest */}
      <div className="mb-8">
        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-5 flex items-center gap-2">
          <i className="fas fa-lightbulb text-[#5D8A3A]"></i>
          Why Invest in {title.split('—')[0].trim()}?
        </h3>
        <div className="space-y-3">
          {whyInvest.map((point, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex items-start gap-3 text-sm sm:text-base md:text-lg text-gray-700 bg-gray-50/50 rounded-xl p-4"
            >
              <i className="fas fa-check-circle text-[#5D8A3A] mt-1 flex-shrink-0"></i>
              <span>{point.text}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="text-center p-6 sm:p-8 rounded-2xl mb-6 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-[#5D8A3A]/20">
        <p className="text-base sm:text-lg font-bold text-gray-900 mb-2">
          {callToAction}
        </p>
        <p className="text-xs sm:text-sm text-gray-600 flex items-center justify-center gap-2">
          <i className="fas fa-leaf text-[#5D8A3A]"></i>
          Pure Investment. Real Impact. Halal Growth.
        </p>
      </div>

      {/* Invest Button */}
      <Link
        href="/auth/register"
        className="group/btn relative w-full py-4 sm:py-5 rounded-xl font-extrabold text-center block text-white transition-all hover:shadow-2xl shadow-lg text-base sm:text-lg overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#6FA446] to-[#5D8A3A] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>
        <span className="relative flex items-center justify-center gap-2">
          <i className="fas fa-hand-holding-usd"></i>
          Invest in {title.split('—')[0].trim()} Now
          <i className="fas fa-arrow-right transform group-hover/btn:translate-x-1 transition-transform duration-300"></i>
        </span>
      </Link>
    </motion.div>
  );
}
