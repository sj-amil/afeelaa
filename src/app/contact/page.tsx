'use client';

import Header from '@/components/Header';
import ContactHeroSection from '@/components/ContactHeroSection';
import ContactLocationsSection from '@/components/ContactLocationsSection';
import ContactFormSection from '@/components/ContactFormSection';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();

  const navLinks = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.about'), href: '/about' },
    { label: t('nav.projects'), href: '/projects' },
    { label: t('nav.shop'), href: '/#shop' },
    { label: t('nav.invest'), href: '/invest', isButton: true, buttonStyle: 'primary' as const },
    { label: t('nav.contact'), href: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Header
        logoSrc="/logo.png"
        logoAlt="Afeelaa Farms"
        navLinks={navLinks}


      />

      {/* Main Content - Add padding for fixed header */}
      <div className="pt-16 md:pt-20">
        {/* Hero Section */}
        <ContactHeroSection
        title={t('contactPage.heroTitle')}
        subtitle={t('contactPage.heroSubtitle')}
        backgroundColor="#FAFAFA"
        titleColor="#2C5F2D"
      />

      {/* Contact Locations */}
      <ContactLocationsSection
        headOffice={{
          title: t('contactPage.headOffice'),
          address: [
            "Furshdepur, Nachol",
            "Chapai Nawabganj, Rajshahi",
            "Bangladesh"
          ],
          contacts: [
            {
              icon: "fas fa-phone",
              text: "+880 1943-341106",
              href: "tel:+8801943341106"
            },
            {
              icon: "fas fa-envelope",
              text: "info@prymagro.com",
              href: "mailto:info@prymagro.com"
            }
          ],
          mapUrl: "https://maps.google.com/maps?q=Furshdepur,+Nachol,+Chapai+Nawabganj,+Rajshahi,+Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
        }}
        farmLocations={[
          {
            title: t('contactPage.nacholFarm'),
            address: [
              "Furshdepur",
              "Nachol, Chapai Nawabganj"
            ],
            contacts: [
              {
                icon: "fas fa-phone",
                text: "+880 1943-341106",
                href: "tel:+8801943341106"
              }
            ]
          },
          {
            title: t('contactPage.rajshahiOps'),
            address: [
              "Rajshahi Division",
              "Bangladesh"
            ],
            contacts: [
              {
                icon: "fas fa-phone",
                text: "+880 1943-341106",
                href: "tel:+8801943341106"
              }
            ]
          },
          {
            title: t('contactPage.porshaFarm'),
            address: [
              "Porsha, Naogaon",
              "Rajshahi Division"
            ],
            contacts: [
              {
                icon: "fas fa-phone",
                text: "+880 1810-470000",
                href: "tel:+8801810470000"
              }
            ]
          }
        ]}
        backgroundColor="#F5F5F5"
        titleColor="#2C5F2D"
      />

      {/* Contact Form */}
      <ContactFormSection
        backgroundColor="#FAFAFA"
        titleColor="#2C5F2D"
      />

      {/* Footer */}
      <Footer
        logoSrc="/logo.png"
        logoAlt="Afeelaa Farms"
        description={t('footer.description')}
        columns={[
          {
            title: t('footer.quickLinks'),
            links: [
              { label: t('footer.aboutUs'), href: '/about' },
              { label: t('footer.ourProjects'), href: '/projects' },
              { label: t('footer.shopOrganic'), href: '/#shop' },
              { label: t('footer.blog'), href: '#blog' },
            ],
          },
          {
            title: t('footer.invest'),
            links: [
              { label: t('footer.howItWorks'), href: '#' },
              { label: t('footer.investmentPlans'), href: '/invest' },
              { label: t('footer.returnsCalculator'), href: '#' },
              { label: t('footer.faqs'), href: '#' },
            ],
          },
          {
            title: t('footer.legal'),
            links: [
              { label: t('footer.termsConditions'), href: '#' },
              { label: t('footer.privacyPolicy'), href: '#' },
              { label: t('footer.refundPolicy'), href: '#' },
              { label: t('footer.tradeLicense'), href: '#' },
            ],
          },
        ]}
        contactInfo={[
          {
            icon: 'fas fa-map-marker-alt',
            text: 'Furshdepur, Nachol, Chapai Nawabganj, Rajshahi',
          },
          {
            icon: 'fas fa-phone',
            text: '+880 1943-341106',
            href: 'tel:+8801943341106',
          },
          {
            icon: 'fas fa-envelope',
            text: 'info@prymagro.com',
            href: 'mailto:info@prymagro.com',
          },
        ]}
        socialLinks={{
          facebook: 'https://facebook.com/prymagro',
          instagram: 'https://instagram.com/prymagro',
          youtube: 'https://youtube.com/@prymagro',
          linkedin: 'https://linkedin.com/company/prymagro',
        }}
        copyrightText={t('footer.copyright')}
        backgroundColor="#1F2937"
        textColor="#E5E7EB"
      />
      </div>
    </div>
  );
}
