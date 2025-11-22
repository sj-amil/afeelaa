'use client';

import Link from 'next/link';

interface AboutItem {
  label: string;
  content: string;
  highlights?: string[];
}

interface AboutSectionProps {
  title: string;
  location: {
    text: string;
    highlight: string;
  };
  description: string;
  achievements: string[];
  secondaryDescription?: string;
  buttonText?: string;
  buttonLink?: string;
  items?: AboutItem[];
  backgroundColor?: string;
  buttonColor?: string;
}

export default function AboutSection({
  title,
  location,
  description,
  achievements,
  secondaryDescription,
  buttonText = 'Learn More',
  buttonLink = '#',
  items = [],
  backgroundColor = '#F5F5F5',
  buttonColor = '#2C5F2D',
}: AboutSectionProps) {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor }}>
      {/* Leaf Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 10 Q40 30 50 50 Q60 30 50 10' fill='%232C5F2D'/%3E%3Cpath d='M50 50 Q40 70 50 90 Q60 70 50 50' fill='%232C5F2D'/%3E%3Cpath d='M10 50 Q30 40 50 50 Q30 60 10 50' fill='%232C5F2D'/%3E%3Cpath d='M50 50 Q70 40 90 50 Q70 60 50 50' fill='%232C5F2D'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#2C5F2D' }}>
          {title}
        </h2>

        <div className="space-y-4 mb-6">
          <p className="text-sm md:text-base text-gray-700 leading-relaxed">
            {location.text}{' '}
            <span className="font-bold text-gray-900">{location.highlight}</span>
            {achievements.length > 0 && (
              <>
                , Afeelaa Farms practices integrated, organic farming to deliver both{' '}
                {achievements.map((achievement, index) => (
                  <span key={index}>
                    <span className="font-bold text-gray-900">{achievement}</span>
                    {index < achievements.length - 1 && ' and '}
                  </span>
                ))}
                .
              </>
            )}
          </p>

          {description && (
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              {description}
            </p>
          )}

          {secondaryDescription && (
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              {secondaryDescription}
            </p>
          )}
        </div>

        {buttonText && buttonLink && (
          <div className="mb-12">
            <Link
              href={buttonLink}
              className="inline-block px-8 py-3 rounded-md text-white font-semibold transition-all hover:opacity-90 shadow-md"
              style={{ backgroundColor: buttonColor }}
            >
              {buttonText}
            </Link>
          </div>
        )}

        {items.length > 0 && (
          <div className="space-y-6 pt-8 border-t-2 border-gray-300">
            {items.map((item, index) => (
              <div key={index}>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {item.label}
                </h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  {item.content}
                  {item.highlights && item.highlights.length > 0 && (
                    <>
                      {' '}
                      {item.highlights.map((highlight, hIndex) => (
                        <span key={hIndex} className="font-semibold text-gray-900">
                          {highlight}
                          {hIndex < item.highlights.length - 1 && ', '}
                        </span>
                      ))}
                    </>
                  )}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
