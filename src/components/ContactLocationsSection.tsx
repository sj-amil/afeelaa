'use client';

import { motion } from 'framer-motion';
import TypingText from './TypingText';

interface ContactInfo {
  icon: string;
  text: string;
  href?: string;
}

interface Location {
  title: string;
  address: string[];
  contacts: ContactInfo[];
  mapUrl?: string;
}

interface ContactLocationsSectionProps {
  headOffice: Location;
  farmLocations: Location[];
  backgroundColor?: string;
  titleColor?: string;
}

export default function ContactLocationsSection({
  headOffice,
  farmLocations,
  backgroundColor = '#F5F5F5',
  titleColor = '#2C5F2D',
}: ContactLocationsSectionProps) {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor }}>
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-emerald-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Head Office */}
        <div className="mb-16">
          <div className="text-center mb-12 sm:mb-14">
            <TypingText
              text={headOffice.title}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4"
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border-2 border-[#5D8A3A]/20"
            >
              {/* Header Badge */}
              <div className="inline-block mb-5 px-3 sm:px-4 py-1 bg-gradient-to-r from-[#5D8A3A]/10 to-[#6FA446]/10 rounded-full border border-[#5D8A3A]/20">
                <p className="text-xs sm:text-sm font-semibold text-[#5D8A3A]">Headquarters</p>
              </div>

              <div className="space-y-5">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#5D8A3A] to-[#6FA446] flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-map-marker-alt text-lg sm:text-xl text-white"></i>
                  </div>
                  <div>
                    {headOffice.address.map((line, index) => (
                      <p key={index} className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Contacts */}
                {headOffice.contacts.map((contact, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-[#5D8A3A] to-[#6FA446] flex items-center justify-center flex-shrink-0">
                      <i className={`${contact.icon} text-lg sm:text-xl text-white`}></i>
                    </div>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className="text-sm sm:text-base md:text-lg text-gray-700 hover:text-[#5D8A3A] transition-colors duration-300 font-medium"
                      >
                        {contact.text}
                      </a>
                    ) : (
                      <span className="text-sm sm:text-base md:text-lg text-gray-700 font-medium">{contact.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Google Map */}
            {headOffice.mapUrl && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative group"
              >
                <div className="absolute -inset-2 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative bg-white rounded-2xl overflow-hidden shadow-xl border-2 border-[#5D8A3A]/20">
                  <iframe
                    src={headOffice.mapUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0, minHeight: '400px' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Farm Locations */}
        <div>
          <div className="text-center mb-12 sm:mb-14">
            <TypingText
              text="Farm Locations"
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4"
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {farmLocations.map((location, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="group bg-white/90 backdrop-blur-sm rounded-2xl p-6 sm:p-7 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-l-4 border-[#5D8A3A] active:scale-[0.99]"
              >
                {/* Farm Badge */}
                <div className="inline-block mb-4 px-3 sm:px-4 py-1 bg-gradient-to-r from-[#5D8A3A]/10 to-[#6FA446]/10 rounded-full border border-[#5D8A3A]/20">
                  <p className="text-xs sm:text-sm font-semibold text-[#5D8A3A]">Farm Location</p>
                </div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 mb-4 group-hover:text-[#5D8A3A] transition-colors duration-300">
                  {location.title}
                </h3>

                <div className="space-y-3">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#5D8A3A] to-[#6FA446] flex items-center justify-center flex-shrink-0">
                      <i className="fas fa-map-marker-alt text-sm sm:text-base text-white"></i>
                    </div>
                    <div>
                      {location.address.map((line, idx) => (
                        <p key={idx} className="text-sm sm:text-base text-gray-700 leading-relaxed">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Contacts */}
                  {location.contacts.map((contact, cIdx) => (
                    <div key={cIdx} className="flex items-center gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-[#5D8A3A] to-[#6FA446] flex items-center justify-center flex-shrink-0">
                        <i className={`${contact.icon} text-sm sm:text-base text-white`}></i>
                      </div>
                      {contact.href ? (
                        <a
                          href={contact.href}
                          className="text-sm sm:text-base text-gray-700 hover:text-[#5D8A3A] transition-colors duration-300 font-medium"
                        >
                          {contact.text}
                        </a>
                      ) : (
                        <span className="text-sm sm:text-base text-gray-700 font-medium">{contact.text}</span>
                      )}
                    </div>
                  ))}
                </div>

                {/* Decorative Gradient Line */}
                <div className="w-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] rounded-full mt-5 sm:mt-6 group-hover:w-16 sm:group-hover:w-20 transition-all duration-500"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
