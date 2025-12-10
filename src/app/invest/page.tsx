'use client';

import Header from '@/components/Header';
import InvestHeroSection from '@/components/InvestHeroSection';
import InvestProjectCard from '@/components/InvestProjectCard';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function InvestPage() {
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
        <InvestHeroSection
        title={t('investPage.heroTitle')}
        subtitle={t('investPage.heroSubtitle')}
        backgroundColor="#FAFAFA"
        titleColor="#2C5F2D"
      />

      {/* Investment Projects */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {/* Project Bathan */}
            <InvestProjectCard
              icon="fas fa-cow"
              title={t('investPage.bathan.title')}
              subtitle={t('investPage.bathan.subtitle')}
              description={[
                t('investPage.bathan.desc1'),
                t('investPage.bathan.desc2'),
                t('investPage.bathan.desc3')
              ]}
              investmentDetails={[
                { label: t('investPage.bathan.duration'), value: t('investPage.bathan.durationValue') },
                { label: t('investPage.bathan.minInvestment'), value: t('investPage.bathan.minInvestmentValue') },
                { label: t('investPage.bathan.expectedReturn'), value: t('investPage.bathan.expectedReturnValue') },
                { label: t('investPage.bathan.profitDist'), value: t('investPage.bathan.profitDistValue') },
                { label: t('investPage.bathan.returnType'), value: t('investPage.bathan.returnTypeValue') },
                { label: t('investPage.bathan.transparency'), value: t('investPage.bathan.transparencyValue') }
              ]}
              whyInvest={[
                { text: t('investPage.bathan.why1') },
                { text: t('investPage.bathan.why2') },
                { text: t('investPage.bathan.why3') },
                { text: t('investPage.bathan.why4') }
              ]}
              callToAction={t('investPage.bathan.cta')}
              titleColor="#2C5F2D"
              buttonColor="#2C5F2D"
              index={0}
            />

            {/* Project Fawakih */}
            <InvestProjectCard
              icon="fas fa-apple-alt"
              title={t('investPage.fawakih.title')}
              subtitle={t('investPage.fawakih.subtitle')}
              description={[
                t('investPage.fawakih.desc1'),
                t('investPage.fawakih.desc2'),
                t('investPage.fawakih.desc3')
              ]}
              investmentDetails={[
                { label: t('investPage.bathan.duration'), value: t('investPage.fawakih.durationValue') },
                { label: t('investPage.bathan.minInvestment'), value: t('investPage.bathan.minInvestmentValue') },
                { label: t('investPage.bathan.expectedReturn'), value: t('investPage.fawakih.expectedReturnValue') },
                { label: t('investPage.bathan.profitDist'), value: t('investPage.bathan.profitDistValue') },
                { label: t('investPage.bathan.returnType'), value: t('investPage.fawakih.returnTypeValue') },
                { label: t('investPage.bathan.transparency'), value: t('investPage.fawakih.transparencyValue') }
              ]}
              whyInvest={[
                { text: t('investPage.fawakih.why1') },
                { text: t('investPage.fawakih.why2') },
                { text: t('investPage.fawakih.why3') },
                { text: t('investPage.fawakih.why4') },
                { text: t('investPage.fawakih.why5') }
              ]}
              callToAction={t('investPage.fawakih.cta')}
              titleColor="#2C5F2D"
              buttonColor="#2C5F2D"
              index={1}
            />

            {/* Project Matsya */}
            <InvestProjectCard
              icon="fas fa-fish"
              title={t('investPage.matsya.title')}
              subtitle={t('investPage.matsya.subtitle')}
              description={[
                t('investPage.matsya.desc1'),
                t('investPage.matsya.desc2'),
                t('investPage.matsya.desc3')
              ]}
              investmentDetails={[
                { label: t('investPage.bathan.duration'), value: t('investPage.fawakih.durationValue') },
                { label: t('investPage.bathan.minInvestment'), value: t('investPage.bathan.minInvestmentValue') },
                { label: t('investPage.bathan.expectedReturn'), value: t('investPage.fawakih.expectedReturnValue') },
                { label: t('investPage.bathan.profitDist'), value: t('investPage.bathan.profitDistValue') },
                { label: t('investPage.matsya.investmentType'), value: t('investPage.matsya.investmentTypeValue') },
                { label: t('investPage.bathan.returnType'), value: t('investPage.fawakih.returnTypeValue') },
                { label: t('investPage.bathan.transparency'), value: t('investPage.fawakih.transparencyValue') }
              ]}
              whyInvest={[
                { text: t('investPage.matsya.why1') },
                { text: t('investPage.matsya.why2') },
                { text: t('investPage.matsya.why3') },
                { text: t('investPage.matsya.why4') },
                { text: t('investPage.matsya.why5') }
              ]}
              callToAction={t('investPage.matsya.cta')}
              titleColor="#2C5F2D"
              buttonColor="#2C5F2D"
              index={2}
            />
          </div>
        </div>
      </section>

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
