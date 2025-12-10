"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TypingText from "@/components/TypingText";
import HeroSlider from "@/components/HeroSlider";
import Header from "@/components/Header";
import ServicesSection from "@/components/ServicesSection";
import WhatSetsUsApartSection from "@/components/WhatSetsUsApartSection";
import WhyInvestSection from "@/components/WhyInvestSection";
import ModernProjectCard from "@/components/ModernProjectCard";
import HowToGetInvolvedSection from "@/components/HowToGetInvolvedSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BlogSection from "@/components/BlogSection";
import AwardsRecognitionSection from "@/components/AwardsRecognitionSection";
import FAQSection from "@/components/FAQSection";
import NewsletterCTASection from "@/components/NewsletterCTASection";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";

export default function LandingPage() {
	const { t } = useLanguage();

	const heroImages = [
		"/hero/Pi7_image_tool.jpeg",
		"/hero/Pi7_image_tool_1.jpeg",
		"/hero/Pi7_image_tool_2.jpeg",
	];

	const navLinks = [
		{ label: t("nav.home"), href: "/" },
		{ label: t("nav.about"), href: "/about" },
		{ label: t("nav.projects"), href: "/projects" },
		{ label: t("nav.shop"), href: "#shop" },
		{
			label: t("nav.invest"),
			href: "/invest",
			isButton: true,
			buttonStyle: "primary" as const,
		},
		{ label: t("nav.contact"), href: "/contact" },
	];

	return (
		<div className="min-h-screen bg-white">
			{/* Navigation */}
			<Header logoSrc="/logo.png" logoAlt="Afeelaa Farms" navLinks={navLinks} />

			{/* Main Content - Add padding for fixed header */}
			<div className="pt-16 md:pt-20">
				{/* Hero Section */}
				<HeroSlider
					images={heroImages}
					title={t("hero.title")}
					subtitle={t("hero.subtitle")}
					tagline={t("hero.tagline")}
					description={t("hero.description")}
					primaryButtonText={t("hero.primaryBtn")}
					primaryButtonLink="/invest"
					secondaryButtonText={t("hero.secondaryBtn")}
					secondaryButtonLink="#shop"
					stat1Value={t("hero.stat1Value")}
					stat1Label={t("hero.stat1Label")}
					stat2Value={t("hero.stat2Value")}
					stat2Label={t("hero.stat2Label")}
					stat3Value={t("hero.stat3Value")}
					stat3Label={t("hero.stat3Label")}
					stat4Value={t("hero.stat4Value")}
					stat4Label={t("hero.stat4Label")}
				/>

				{/* Services Section */}
				<ServicesSection
					title={t("home.servicesTitle")}
					services={[
						{
							icon: "fas fa-seedling",
							title: t("home.service1Title"),
							description: t("home.service1Desc"),
						},
						{
							icon: "fas fa-hand-holding-usd",
							title: t("home.service2Title"),
							description: t("home.service2Desc"),
						},
						{
							icon: "fas fa-chart-line",
							title: t("home.service3Title"),
							description: t("home.service3Desc"),
						},
						{
							icon: "fas fa-leaf",
							title: t("home.service4Title"),
							description: t("home.service4Desc"),
						},
					]}
				/>

				{/* What Sets Us Apart Section */}
				<WhatSetsUsApartSection
					title={t("home.setsApartTitle")}
					description={`${t("home.setsApartDesc1")}\n\n${t("home.setsApartDesc2")}`}
					imageSrc="/hero/Pi7_image_tool_1.jpeg"
				/>

				{/* Why Invest Section */}
				<WhyInvestSection
					title={t("home.whyInvestTitle")}
					cards={[
						{
							imageSrc: "/hero/Pi7_image_tool.jpeg",
							title: t("home.whyCard1Title"),
							description: t("home.whyCard1Desc"),
						},
						{
							imageSrc: "/hero/Pi7_image_tool_1.jpeg",
							title: t("home.whyCard2Title"),
							description: t("home.whyCard2Desc"),
						},
						{
							imageSrc: "/hero/Pi7_image_tool_2.jpeg",
							title: t("home.whyCard3Title"),
							description: t("home.whyCard3Desc"),
						},
					]}
				/>

				{/* Exclusive Projects Section */}
				<section className="relative py-20 md:py-28 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
					{/* Background Decoration */}
					<div className="absolute inset-0 opacity-20">
						<div className="absolute top-0 left-1/3 w-96 h-96 bg-emerald-200 rounded-full blur-3xl"></div>
						<div className="absolute bottom-0 right-1/3 w-96 h-96 bg-green-200 rounded-full blur-3xl"></div>
					</div>

					<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
						<div className="text-center mb-12 sm:mb-14 md:mb-16">
							<TypingText
								text={t("home.projectsTitle")}
								className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-3 sm:mb-4 px-4"
								speed={0.03}
							/>
							<motion.div
								initial={{ scaleX: 0 }}
								whileInView={{ scaleX: 1 }}
								viewport={{ once: true }}
								transition={{ duration: 0.8, delay: 0.5 }}
								className="w-20 sm:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] mx-auto rounded-full mb-4 sm:mb-6"
							/>
							<motion.p
								initial={{ opacity: 0, y: 10 }}
								whileInView={{ opacity: 1, y: 0 }}
								viewport={{ once: true }}
								transition={{ duration: 0.5, delay: 0.8 }}
								className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4"
							>
								{t("home.projectsSubtitle")}
							</motion.p>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
							<ModernProjectCard
								imageSrc="/hero/Pi7_image_tool.jpeg"
								title={t("home.project1Title")}
								location={t("home.project1Location")}
								returnRate="16-20%"
								minInvestment="BDT 50,000"
								duration="3 Years"
								raisedPercentage={65}
								totalInvestors={45}
								link="/invest"
							/>
							<ModernProjectCard
								imageSrc="/hero/Pi7_image_tool_2.jpeg"
								title={t("home.project2Title")}
								location={t("home.project2Location")}
								returnRate="20-24%"
								minInvestment="BDT 50,000"
								duration="5 Years"
								raisedPercentage={48}
								totalInvestors={32}
								link="/invest"
							/>
							<ModernProjectCard
								imageSrc="/hero/Pi7_image_tool_1.jpeg"
								title={t("home.project3Title")}
								location={t("home.project3Location")}
								returnRate="16-24%"
								minInvestment="BDT 50,000"
								duration="3-5 Years"
								raisedPercentage={72}
								totalInvestors={58}
								link="/invest"
							/>
						</div>
					</div>
				</section>

				{/* How to Get Involved */}
				<HowToGetInvolvedSection
					title={t("home.involvedTitle")}
					subtitle={t("home.involvedSubtitle")}
					steps={[
						{
							number: 1,
							title: t("home.step1Title"),
							description: t("home.step1Desc"),
						},
						{
							number: 2,
							title: t("home.step2Title"),
							description: t("home.step2Desc"),
						},
						{
							number: 3,
							title: t("home.step3Title"),
							description: t("home.step3Desc"),
						},
						{
							number: 4,
							title: t("home.step4Title"),
							description: t("home.step4Desc"),
						},
					]}
				/>

				{/* Testimonials */}
				<TestimonialsSection
					title={t("home.testimonialsTitle")}
					subtitle={t("home.testimonialsSubtitle")}
					testimonials={[
						{
							name: t("home.testimonial1Name"),
							role: t("home.testimonial1Role"),
							image: "/hero/Pi7_image_tool.jpeg",
							quote: t("home.testimonial1Quote"),
							rating: 5,
						},
						{
							name: t("home.testimonial2Name"),
							role: t("home.testimonial2Role"),
							image: "/hero/Pi7_image_tool_1.jpeg",
							quote: t("home.testimonial2Quote"),
							rating: 5,
						},
						{
							name: t("home.testimonial3Name"),
							role: t("home.testimonial3Role"),
							image: "/hero/Pi7_image_tool_2.jpeg",
							quote: t("home.testimonial3Quote"),
							rating: 5,
						},
					]}
				/>

				{/* Blog Section */}
				<BlogSection
					title={t("home.blogTitle")}
					subtitle={t("home.blogSubtitle")}
					posts={[
						{
							title: t("home.blog1Title"),
							excerpt: t("home.blog1Excerpt"),
							date: "Nov 5, 2025",
							category: t("home.blog1Category"),
							link: "#",
							image: "/hero/Pi7_image_tool.jpeg",
						},
						{
							title: t("home.blog2Title"),
							excerpt: t("home.blog2Excerpt"),
							date: "Nov 1, 2025",
							category: t("home.blog2Category"),
							link: "#",
							image: "/hero/Pi7_image_tool_1.jpeg",
						},
						{
							title: t("home.blog3Title"),
							excerpt: t("home.blog3Excerpt"),
							date: "Oct 28, 2025",
							category: t("home.blog3Category"),
							link: "#",
							image: "/hero/Pi7_image_tool_2.jpeg",
						},
					]}
					viewAllText={t("home.blogViewAll")}
				/>

				{/* Awards & Recognition */}
				<AwardsRecognitionSection
					title={t("home.awardsTitle")}
					subtitle={t("home.awardsSubtitle")}
					awards={[
						{ name: "GlobalG.A.P.", logo: "/logo.png" },
						{ name: "Organic Certification", logo: "/logo.png" },
						{ name: "Halal Certified", logo: "/logo.png" },
						{ name: "ISO 9001", logo: "/logo.png" },
						{ name: "Bangladesh Agriculture", logo: "/logo.png" },
						{ name: "Green Business", logo: "/logo.png" },
					]}
				/>

				{/* FAQ Section */}
				<FAQSection
					title={t("home.faqTitle")}
					subtitle={t("home.faqSubtitle")}
					faqs={[
						{
							question: t("home.faq1Q"),
							answer: t("home.faq1A"),
						},
						{
							question: t("home.faq2Q"),
							answer: t("home.faq2A"),
						},
						{
							question: t("home.faq3Q"),
							answer: t("home.faq3A"),
						},
						{
							question: t("home.faq4Q"),
							answer: t("home.faq4A"),
						},
					]}
				/>

				{/* Newsletter CTA */}
				<NewsletterCTASection
					title={t("home.ctaTitle")}
					subtitle={t("home.ctaSubtitle")}
					buttonText={t("home.ctaButton")}
					placeholderText={t("home.ctaPlaceholder")}
					backgroundImage="/hero/Pi7_image_tool.jpeg"
				/>

				{/* Footer */}
				<Footer
					logoSrc="/logo.png"
					logoAlt="Afeelaa Farms"
					description={t("footer.description")}
					columns={[
						{
							title: t("footer.quickLinks"),
							links: [
								{ label: t("footer.aboutUs"), href: "/about" },
								{ label: t("footer.ourProjects"), href: "/projects" },
								{ label: t("footer.shopOrganic"), href: "#shop" },
								{ label: t("footer.blog"), href: "#blog" },
							],
						},
						{
							title: t("footer.invest"),
							links: [
								{ label: t("footer.howItWorks"), href: "#" },
								{ label: t("footer.investmentPlans"), href: "/invest" },
								{ label: t("footer.returnsCalculator"), href: "#" },
								{ label: t("footer.faqs"), href: "#" },
							],
						},
						{
							title: t("footer.legal"),
							links: [
								{ label: t("footer.termsConditions"), href: "#" },
								{ label: t("footer.privacyPolicy"), href: "#" },
								{ label: t("footer.refundPolicy"), href: "#" },
								{ label: t("footer.tradeLicense"), href: "#" },
							],
						},
					]}
					contactInfo={[
						{
							icon: "fas fa-map-marker-alt",
							text: t("footer.address"),
						},
						{
							icon: "fas fa-phone",
							text: "+880 1810-470000",
							href: "tel:+8801810470000",
						},
						{
							icon: "fas fa-envelope",
							text: "info@prymagro.com",
							href: "mailto:info@prymagro.com",
						},
					]}
					socialLinks={{
						facebook: "https://facebook.com/prymagro",
						instagram: "https://instagram.com/prymagro",
						youtube: "https://youtube.com/@prymagro",
						linkedin: "https://linkedin.com/company/prymagro",
					}}
					copyrightText={t("footer.copyright")}
					backgroundColor="#1F2937"
					textColor="#E5E7EB"
				/>
			</div>
		</div>
	);
}
