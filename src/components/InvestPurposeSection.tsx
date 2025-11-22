'use client';

interface HighlightText {
  text: string;
  color?: string;
  bold?: boolean;
}

interface PurposeItem {
  normalText: string;
  highlights: HighlightText[];
}

interface InvestPurposeSectionProps {
  title: string;
  items: PurposeItem[];
  backgroundColor?: string;
  textColor?: string;
}

export default function InvestPurposeSection({
  title,
  items,
  backgroundColor = '#FAFAFA',
  textColor = '#2C2C2C',
}: InvestPurposeSectionProps) {
  return (
    <section
      className="py-16 md:py-24 relative overflow-hidden"
      style={{ backgroundColor }}
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232C5F2D' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2
          className="text-2xl md:text-3xl font-bold text-center mb-8"
          style={{ color: textColor }}
        >
          {title}
        </h2>

        <div className="space-y-6">
          {items.map((item, index) => (
            <div key={index} className="text-center">
              <p className="text-sm md:text-base leading-relaxed" style={{ color: textColor }}>
                {item.normalText}{' '}
                {item.highlights.map((highlight, hIndex) => (
                  <span key={hIndex}>
                    <span
                      className={highlight.bold ? 'font-bold' : 'font-semibold'}
                      style={{ color: highlight.color || '#2C5F2D' }}
                    >
                      {highlight.text}
                    </span>
                    {hIndex < item.highlights.length - 1 && ' '}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
