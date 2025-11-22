'use client';

import { useState } from 'react';

interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
  rating?: number;
}

interface TestimonialsSectionProps {
  title: string;
  subtitle?: string;
  testimonials: Testimonial[];
  backgroundColor?: string;
}

export default function TestimonialsSection({
  title,
  subtitle,
  testimonials,
  backgroundColor = 'white',
}: TestimonialsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor }}>
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-emerald-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            {title}
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] mx-auto rounded-full mb-6"></div>
          {subtitle && (
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>

        {/* Testimonial Display */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Left Testimonial (Previous) */}
            <div className="hidden md:block opacity-50 transform scale-90">
              {testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length] && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                  <p className="text-sm text-gray-600 italic mb-4 line-clamp-3">
                    "{testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length].quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length].image}
                      alt={testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length].name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200"
                    />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">
                        {testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length].name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {testimonials[(currentIndex - 1 + testimonials.length) % testimonials.length].role}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Center Testimonial (Current) */}
            <div className="transform scale-100 md:scale-110">
              <div className="relative bg-white rounded-3xl p-10 shadow-2xl overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#5D8A3A]/10 to-[#6FA446]/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-100/50 to-green-100/50 rounded-full -ml-12 -mb-12"></div>

                <div className="relative z-10">
                  {/* Quote Icon */}
                  <div className="absolute -top-2 -left-2 text-6xl text-[#5D8A3A]/10 font-serif">"</div>

                  <div className="mb-6">
                    <div className="relative inline-block">
                      <img
                        src={currentTestimonial.image}
                        alt={currentTestimonial.name}
                        className="w-28 h-28 rounded-full object-cover mx-auto mb-4 ring-4 ring-gradient-to-r from-[#5D8A3A] to-[#6FA446] shadow-xl"
                      />
                      <div className="absolute -bottom-1 -right-1 w-10 h-10 bg-gradient-to-br from-[#5D8A3A] to-[#6FA446] rounded-full flex items-center justify-center shadow-lg">
                        <i className="fas fa-quote-right text-white text-sm"></i>
                      </div>
                    </div>

                    {currentTestimonial.rating && (
                      <div className="flex justify-center gap-1.5 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star text-lg ${
                              i < currentTestimonial.rating! ? 'text-yellow-400' : 'text-gray-300'
                            }`}
                          ></i>
                        ))}
                      </div>
                    )}
                  </div>

                  <p className="text-lg text-gray-700 italic mb-6 text-center leading-relaxed">
                    "{currentTestimonial.quote}"
                  </p>

                  <div className="text-center">
                    <p className="font-extrabold text-gray-900 text-xl mb-1">
                      {currentTestimonial.name}
                    </p>
                    <p className="text-sm text-gray-600 font-medium">
                      {currentTestimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Testimonial (Next) */}
            <div className="hidden md:block opacity-50 transform scale-90">
              {testimonials[(currentIndex + 1) % testimonials.length] && (
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/50">
                  <p className="text-sm text-gray-600 italic mb-4 line-clamp-3">
                    "{testimonials[(currentIndex + 1) % testimonials.length].quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonials[(currentIndex + 1) % testimonials.length].image}
                      alt={testimonials[(currentIndex + 1) % testimonials.length].name}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200"
                    />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">
                        {testimonials[(currentIndex + 1) % testimonials.length].name}
                      </p>
                      <p className="text-xs text-gray-600">
                        {testimonials[(currentIndex + 1) % testimonials.length].role}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5D8A3A] to-[#6FA446] hover:scale-110 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="Previous testimonial"
            >
              <i className="fas fa-chevron-left text-white"></i>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] w-10'
                      : 'bg-gray-300 hover:bg-gray-400 w-2.5'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5D8A3A] to-[#6FA446] hover:scale-110 flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
              aria-label="Next testimonial"
            >
              <i className="fas fa-chevron-right text-white"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
