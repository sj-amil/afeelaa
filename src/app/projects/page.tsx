'use client';

import Header from '@/components/Header';
import ProjectHeroSection from '@/components/ProjectHeroSection';
import OngoingProjectsSection from '@/components/OngoingProjectsSection';
import UpcomingProjectsSection from '@/components/UpcomingProjectsSection';
import ProjectVisionSection from '@/components/ProjectVisionSection';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProjectsPage() {
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
        <ProjectHeroSection
        title={t('projectsPage.heroTitle')}
        subtitle={t('projectsPage.heroSubtitle')}
        description={t('projectsPage.heroDescription')}
        backgroundColor="#FAFAFA"
        titleColor="#2C5F2D"
      />

      {/* Ongoing Projects */}
      <OngoingProjectsSection
        sectionTitle={t('projectsPage.ongoingTitle')}
        projects={[
          {
            icon: "fas fa-cow",
            title: t('projectsPage.bathan.title'),
            subtitle: t('projectsPage.bathan.subtitle'),
            paragraphs: [
              t('projectsPage.bathan.para1'),
              t('projectsPage.bathan.para2'),
              t('projectsPage.bathan.para3'),
              t('projectsPage.bathan.para4')
            ]
          },
          {
            icon: "fas fa-apple-alt",
            title: t('projectsPage.fawakih.title'),
            subtitle: t('projectsPage.fawakih.subtitle'),
            paragraphs: [
              t('projectsPage.fawakih.para1'),
              t('projectsPage.fawakih.para2'),
              t('projectsPage.fawakih.para3'),
              t('projectsPage.fawakih.para4')
            ]
          },
          {
            icon: "fas fa-fish",
            title: t('projectsPage.matsya.title'),
            subtitle: t('projectsPage.matsya.subtitle'),
            paragraphs: [
              t('projectsPage.matsya.para1'),
              t('projectsPage.matsya.para2'),
              t('projectsPage.matsya.para3'),
              t('projectsPage.matsya.para4')
            ]
          }
        ]}
        backgroundColor="#F5F5F5"
        titleColor="#2C5F2D"
      />

      {/* Upcoming Projects */}
      <UpcomingProjectsSection
        sectionTitle={t('projectsPage.upcomingTitle')}
        projects={[
          {
            icon: "fas fa-sheep",
            title: t('projectsPage.bathanExpansion.title'),
            subtitle: t('projectsPage.bathanExpansion.subtitle'),
            paragraphs: [
              t('projectsPage.bathanExpansion.para1'),
              t('projectsPage.bathanExpansion.para2'),
              t('projectsPage.bathanExpansion.para3')
            ]
          },
          {
            icon: "fas fa-spa",
            title: t('projectsPage.nirvana.title'),
            subtitle: t('projectsPage.nirvana.subtitle'),
            paragraphs: [
              t('projectsPage.nirvana.para1'),
              t('projectsPage.nirvana.para2')
            ]
          }
        ]}
        backgroundColor="#FAFAFA"
        titleColor="#2C5F2D"
      />

      {/* Vision Section */}
      <ProjectVisionSection
        title={t('projectsPage.visionTitle')}
        description={t('projectsPage.visionDescription')}
        missionPoints={[
          t('projectsPage.visionPoint1'),
          t('projectsPage.visionPoint2')
        ]}
        backgroundColor="#2C5F2D"
        titleColor="#FFFFFF"
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
