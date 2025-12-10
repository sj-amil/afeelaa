'use client';

import Header from '@/components/Header';
import AboutHeroSection from '@/components/AboutHeroSection';
import WhatWeDoSection from '@/components/WhatWeDoSection';
import GAPCertificationSection from '@/components/GAPCertificationSection';
import OurTeamSection from '@/components/OurTeamSection';
import SustainablePracticesSection from '@/components/SustainablePracticesSection';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutPage() {
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
        {/* About Hero Section */}
        <AboutHeroSection
        title={t('aboutPage.heroTitle')}
        paragraphs={[
          t('aboutPage.para1'),
          t('aboutPage.para2'),
          t('aboutPage.para3'),
          t('aboutPage.para4')
        ]}
        visionMissionValues={[
          {
            label: t('about.vision'),
            content: t('about.visionText')
          },
          {
            label: t('about.mission'),
            content: t('about.missionText')
          },
          {
            label: t('about.values'),
            content: t('about.valuesText')
          }
        ]}
        backgroundColor="#FAFAFA"
        titleColor="#2C5F2D"
      />

      {/* What We Do Section */}
      <WhatWeDoSection
        title={t('aboutPage.whatWeDoTitle')}
        subtitle={t('aboutPage.whatWeDoSubtitle')}
        projects={[
          {
            icon: "fas fa-cow",
            title: t('aboutPage.livestock'),
            subtitle: t('aboutPage.livestockSub'),
            description: t('aboutPage.livestockDesc')
          },
          {
            icon: "fas fa-seedling",
            title: t('aboutPage.crops'),
            subtitle: t('aboutPage.cropsSub'),
            description: t('aboutPage.cropsDesc')
          },
          {
            icon: "fas fa-fish",
            title: t('aboutPage.fish'),
            subtitle: t('aboutPage.fishSub'),
            description: t('aboutPage.fishDesc')
          },
          {
            icon: "fas fa-flask",
            title: t('aboutPage.manufacturing'),
            subtitle: "",
            description: t('aboutPage.manufacturingDesc')
          },
          {
            icon: "fas fa-tree",
            title: t('aboutPage.ecoResort'),
            subtitle: t('aboutPage.ecoResortSub'),
            description: t('aboutPage.ecoResortDesc')
          },
          {
            icon: "fas fa-hand-holding-heart",
            title: t('aboutPage.investment'),
            subtitle: "",
            description: t('aboutPage.investmentDesc')
          }
        ]}
        backgroundColor="#F5F5F5"
        titleColor="#2C5F2D"
      />

      {/* GAP Certification Section */}
      <GAPCertificationSection
        title={t('aboutPage.gapTitle')}
        content={[
          t('aboutPage.gap1'),
          t('aboutPage.gap2'),
          t('aboutPage.gap3'),
          t('aboutPage.gap4')
        ]}
        backgroundColor="#FAFAFA"
        titleColor="#2C5F2D"
      />

      {/* Our Team Section */}
      <OurTeamSection
        title={t('aboutPage.teamTitle')}
        subtitle={t('aboutPage.teamSubtitle')}
        categories={[
          {
            categoryTitle: t('aboutPage.leadership'),
            categoryIcon: "fas fa-users",
            members: [
              {
                name: "Mr. Atif Md. Siddiqur Rahman",
                title: "Co-CEO",
                specialization: "With over a decade in agriculture, he leads overall management, operations, and infrastructure - ensuring every Afeelaa initiative promotes sustainable growth and community impact."
              },
              {
                name: "Dr. Md. Shariful Islam",
                title: "Co-CEO",
                specialization: "An agricultural and rural development expert, he provides strategic and scientific oversight to uphold efficiency, productivity, and environmental balance."
              },
              {
                name: "Rishad Azim",
                title: "Chief Strategy Officer (CSO)",
                specialization: "A forward-thinking strategist focusing on innovation, business development, and long-term sustainability."
              }
            ]
          },
          {
            categoryTitle: t('aboutPage.coreTeam'),
            categoryIcon: "fas fa-user-friends",
            description: t('aboutPage.coreTeamDesc'),
            members: []
          },
          {
            categoryTitle: t('aboutPage.advisory'),
            categoryIcon: "fas fa-user-graduate",
            description: t('aboutPage.advisoryDesc'),
            members: [
              { name: "Kbd. Dr. Mahfuz Mirdha", title: "Field Crops" },
              { name: "Kbd. Ismail Ahmed Khan", title: "Plantation Crops" },
              { name: "Kbd. Md. Mahbubur Rahman", title: "Livestock" },
              { name: "Kbd. Bacchu Mizan", title: "Fisheries" },
              { name: "Kbd. Kalyan Fouzder", title: "Poultry" },
              { name: "Kbd. Prof. Dr. Mostafizur Rahman", title: "Veterinary Doctor" },
              { name: "Mr. Habibullah Shekh", title: "On-Farm Specialist" },
              { name: "Kbd. Mizanur Rahman", title: "Crops Economist" }
            ]
          },
          {
            categoryTitle: t('aboutPage.united'),
            categoryIcon: "fas fa-globe",
            description: t('aboutPage.unitedDesc'),
            members: []
          }
        ]}
        backgroundColor="#F5F5F5"
        titleColor="#2C5F2D"
      />

      {/* Sustainable Practices Section */}
      <SustainablePracticesSection
        title={t('aboutPage.practicesTitle')}
        subtitle={t('aboutPage.practicesSubtitle')}
        practices={[
          {
            icon: "fas fa-leaf",
            title: t('aboutPage.practice1Title'),
            description: t('aboutPage.practice1Desc')
          },
          {
            icon: "fas fa-carrot",
            title: t('aboutPage.practice2Title'),
            description: t('aboutPage.practice2Desc')
          },
          {
            icon: "fas fa-tint",
            title: t('aboutPage.practice3Title'),
            description: t('aboutPage.practice3Desc')
          },
          {
            icon: "fas fa-handshake",
            title: t('aboutPage.practice4Title'),
            description: t('aboutPage.practice4Desc')
          },
          {
            icon: "fas fa-mosque",
            title: t('aboutPage.practice5Title'),
            description: t('aboutPage.practice5Desc')
          },
          {
            icon: "fas fa-chart-line",
            title: t('aboutPage.practice6Title'),
            description: t('aboutPage.practice6Desc')
          }
        ]}
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
            text: t('footer.address'),
          },
          {
            icon: 'fas fa-phone',
            text: '+880 1810-470000',
            href: 'tel:+8801810470000',
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
