'use client';

interface Award {
  name: string;
  logo: string;
  description?: string;
}

interface AwardsRecognitionSectionProps {
  title: string;
  subtitle?: string;
  awards: Award[];
  backgroundColor?: string;
}

export default function AwardsRecognitionSection({
  title,
  subtitle,
  awards,
  backgroundColor = '#FAFAFA',
}: AwardsRecognitionSectionProps) {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor }}>
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-emerald-200 rounded-full blur-3xl"></div>
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

        {/* Awards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 items-center">
          {awards.map((award, index) => (
            <div
              key={index}
              className="group flex flex-col items-center justify-center p-6 bg-white/80 backdrop-blur-sm rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50"
              title={award.description || award.name}
            >
              <div className="relative w-full h-20 flex items-center justify-center mb-2">
                <img
                  src={award.logo}
                  alt={award.name}
                  className="max-h-16 w-auto object-contain grayscale group-hover:grayscale-0 transform group-hover:scale-110 transition-all duration-500"
                />
              </div>
              {award.description && (
                <p className="text-xs text-gray-600 text-center mt-2 font-medium">
                  {award.name}
                </p>
              )}

              {/* Hover Gradient Border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
