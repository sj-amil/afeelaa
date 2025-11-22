'use client';

import { motion } from 'framer-motion';
import TypingText from './TypingText';
import { useLanguage } from '@/contexts/LanguageContext';

interface InvestHeroSectionProps {
  title: string;
  subtitle: string;
  backgroundColor?: string;
  titleColor?: string;
}

export default function InvestHeroSection({
  title,
  subtitle,
  backgroundColor = '#FAFAFA',
  titleColor = '#2C5F2D',
}: InvestHeroSectionProps) {
  const { t } = useLanguage();
  return (
    <section className="relative h-[500px] sm:h-[600px] md:h-[700px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero/Pi7_image_tool.jpeg"
          alt="Invest with Afeelaa Farms"
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
            <p className="text-xs sm:text-sm font-semibold text-emerald-100">Investment Opportunities</p>
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
            className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-3xl mx-auto px-4"
          >
            {subtitle}
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-3xl mx-auto mt-8 sm:mt-12"
          >
            {[
              { valueKey: "investPage.heroStat1Value", labelKey: "investPage.heroStat1Label" },
              { valueKey: "investPage.heroStat2Value", labelKey: "investPage.heroStat2Label" },
              { valueKey: "investPage.heroStat3Value", labelKey: "investPage.heroStat3Label" }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-1">{t(stat.valueKey)}</div>
                <div className="text-xs sm:text-sm text-white/80">{t(stat.labelKey)}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
    </section>
  );
}
