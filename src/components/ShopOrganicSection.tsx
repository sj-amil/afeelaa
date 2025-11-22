'use client';

import Link from 'next/link';

interface ShopCategory {
  icon: string; // Font Awesome class name
  title: string;
  description?: string;
}

interface ShopOrganicSectionProps {
  title: string;
  subtitle: string;
  description: string;
  categories: ShopCategory[];
  buttonText: string;
  buttonLink: string;
  backgroundColor?: string;
  titleColor?: string;
  buttonColor?: string;
}

export default function ShopOrganicSection({
  title,
  subtitle,
  description,
  categories,
  buttonText,
  buttonLink,
  backgroundColor = '#F5F5F5',
  titleColor = '#2C5F2D',
  buttonColor = '#2C5F2D',
}: ShopOrganicSectionProps) {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor }}>
      {/* Organic Dots Pattern Background */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232C5F2D' fill-opacity='1' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3Ccircle cx='23' cy='23' r='3'/%3E%3Ccircle cx='33' cy='33' r='3'/%3E%3Ccircle cx='13' cy='33' r='2'/%3E%3Ccircle cx='33' cy='13' r='2'/%3E%3Ccircle cx='23' cy='3' r='2'/%3E%3Ccircle cx='3' cy='23' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title with border */}
        <div className="flex justify-center mb-6">
          <div
            className="inline-block px-6 py-2 rounded-full border-4 text-xl md:text-2xl font-bold"
            style={{ borderColor: titleColor, color: titleColor }}
          >
            {title}
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-center text-base md:text-lg text-gray-800 mb-4 font-medium">
          {subtitle}
        </p>

        {/* Description */}
        <p className="text-center text-sm md:text-base text-gray-700 leading-relaxed mb-10 max-w-4xl mx-auto">
          {description}
        </p>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center border border-gray-200"
            >
              {/* Icon */}
              <div className="mb-4">
                <i
                  className={`${category.icon} text-6xl`}
                  style={{ color: titleColor }}
                ></i>
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
                {category.title}
              </h3>

              {/* Optional Description */}
              {category.description && (
                <p className="text-sm text-gray-600">{category.description}</p>
              )}
            </div>
          ))}
        </div>

        {/* Shop Now Button */}
        <div className="flex justify-center">
          <Link
            href={buttonLink}
            className="px-10 py-4 rounded-lg text-white font-bold text-lg transition-all hover:opacity-90 shadow-lg hover:shadow-xl"
            style={{ backgroundColor: buttonColor }}
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </section>
  );
}
