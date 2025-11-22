'use client';

import { useState } from 'react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  subtitle?: string;
  faqs: FAQ[];
  backgroundColor?: string;
}

export default function FAQSection({
  title,
  subtitle,
  faqs,
  backgroundColor = 'white',
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor }}>
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-emerald-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            {title}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] mx-auto rounded-full mb-6"></div>
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* FAQ Items */}
        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`group bg-white/80 backdrop-blur-sm border-2 rounded-2xl overflow-hidden transition-all duration-500 ${
                openIndex === index
                  ? 'border-[#5D8A3A] shadow-2xl shadow-emerald-500/20'
                  : 'border-gray-200 hover:border-emerald-300 shadow-lg hover:shadow-xl'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-7 py-6 flex items-center justify-between text-left hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-green-50/50 transition-all duration-300"
              >
                <div className="flex items-center gap-4 pr-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${
                    openIndex === index
                      ? 'bg-gradient-to-br from-[#5D8A3A] to-[#6FA446] scale-110 rotate-12'
                      : 'bg-gray-100 group-hover:bg-emerald-100'
                  }`}>
                    <i className={`fas fa-question text-lg ${
                      openIndex === index ? 'text-white' : 'text-gray-600 group-hover:text-[#5D8A3A]'
                    } transition-colors duration-300`}></i>
                  </div>
                  <span className={`font-bold text-lg transition-colors duration-300 ${
                    openIndex === index ? 'text-[#5D8A3A]' : 'text-gray-900'
                  }`}>
                    {faq.question}
                  </span>
                </div>
                <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-500 ${
                  openIndex === index
                    ? 'bg-gradient-to-br from-[#5D8A3A] to-[#6FA446] rotate-180'
                    : 'bg-gray-100 group-hover:bg-emerald-100'
                }`}>
                  <i className={`fas fa-chevron-down text-sm ${
                    openIndex === index ? 'text-white' : 'text-gray-600 group-hover:text-[#5D8A3A]'
                  } transition-all duration-500`}></i>
                </div>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-7 pb-6 pt-2">
                  <div className="pl-14 text-gray-700 leading-relaxed border-l-4 border-gradient-to-b from-[#5D8A3A] to-[#6FA446] ml-5">
                    <p className="pl-4">{faq.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
