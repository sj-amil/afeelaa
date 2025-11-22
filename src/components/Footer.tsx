"use client";

import Link from "next/link";

interface FooterLink {
	label: string;
	href: string;
}

interface FooterColumn {
	title: string;
	links: FooterLink[];
}

interface ContactInfo {
	icon: string;
	text: string;
	href?: string;
}

interface FooterProps {
	logoSrc: string;
	logoAlt: string;
	description: string;
	columns: FooterColumn[];
	contactInfo: ContactInfo[];
	socialLinks?: {
		facebook?: string;
		twitter?: string;
		instagram?: string;
		linkedin?: string;
		youtube?: string;
	};
	copyrightText: string;
	backgroundColor?: string;
	textColor?: string;
}

export default function Footer({
	logoSrc,
	logoAlt,
	description,
	columns,
	contactInfo,
	socialLinks,
	copyrightText,
	backgroundColor = "#0F172A",
	textColor = "#E2E8F0",
}: FooterProps) {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="relative overflow-hidden" style={{ backgroundColor }}>
			{/* Decorative Background Elements */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute top-0 right-0 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
				<div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
			</div>

			<div className="relative z-10">
				{/* Main Footer Content */}
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
						{/* Brand Section */}
						<div className="lg:col-span-4">
							<Link
								href="/"
								className="inline-block mb-6 transform hover:scale-105 transition-transform"
							>
								<img
									src={logoSrc}
									alt={logoAlt}
									className="h-20 md:h-60 w-auto"
								/>
							</Link>
							<p className="text-gray-400 leading-relaxed mb-6 text-sm">
								{description}
							</p>

							{/* Social Links */}
							{socialLinks && (
								<div className="flex gap-3">
									{socialLinks.facebook && (
										<a
											href={socialLinks.facebook}
											target="_blank"
											rel="noopener noreferrer"
											className="group"
										>
											<div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-gradient-to-r hover:from-[#5D8A3A] hover:to-[#6FA446] transition-all group-hover:scale-110 group-hover:shadow-lg">
												<i className="fab fa-facebook-f text-gray-300 group-hover:text-white"></i>
											</div>
										</a>
									)}
									{socialLinks.instagram && (
										<a
											href={socialLinks.instagram}
											target="_blank"
											rel="noopener noreferrer"
											className="group"
										>
											<div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-500 transition-all group-hover:scale-110 group-hover:shadow-lg">
												<i className="fab fa-instagram text-gray-300 group-hover:text-white"></i>
											</div>
										</a>
									)}
									{socialLinks.youtube && (
										<a
											href={socialLinks.youtube}
											target="_blank"
											rel="noopener noreferrer"
											className="group"
										>
											<div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-gradient-to-r hover:from-red-500 hover:to-red-600 transition-all group-hover:scale-110 group-hover:shadow-lg">
												<i className="fab fa-youtube text-gray-300 group-hover:text-white"></i>
											</div>
										</a>
									)}
									{socialLinks.linkedin && (
										<a
											href={socialLinks.linkedin}
											target="_blank"
											rel="noopener noreferrer"
											className="group"
										>
											<div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 transition-all group-hover:scale-110 group-hover:shadow-lg">
												<i className="fab fa-linkedin-in text-gray-300 group-hover:text-white"></i>
											</div>
										</a>
									)}
								</div>
							)}
						</div>

						{/* Link Columns */}
						{columns.map((column, index) => (
							<div key={index} className="lg:col-span-2">
								<h3 className="text-white font-bold text-lg mb-6 relative inline-block">
									{column.title}
									<span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] rounded-full"></span>
								</h3>
								<ul className="space-y-3">
									{column.links.map((link, linkIndex) => (
										<li key={linkIndex}>
											<Link
												href={link.href}
												className="text-gray-400 hover:text-white transition-all hover:translate-x-1 inline-block text-sm group"
											>
												<span className="group-hover:text-[#6FA446]">
													{link.label}
												</span>
											</Link>
										</li>
									))}
								</ul>
							</div>
						))}

						{/* Contact Section */}
						<div className="lg:col-span-4">
							<h3 className="text-white font-bold text-lg mb-6 relative inline-block">
								Get in Touch
								<span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] rounded-full"></span>
							</h3>
							<ul className="space-y-4">
								{contactInfo.map((info, index) => (
									<li key={index}>
										{info.href ? (
											<a
												href={info.href}
												className="flex items-start gap-3 text-gray-400 hover:text-white transition-colors group text-sm"
											>
												<i
													className={`${info.icon} mt-1 text-[#6FA446] group-hover:scale-110 transition-transform`}
												></i>
												<span>{info.text}</span>
											</a>
										) : (
											<div className="flex items-start gap-3 text-gray-400 text-sm">
												<i className={`${info.icon} mt-1 text-[#6FA446]`}></i>
												<span>{info.text}</span>
											</div>
										)}
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Divider */}
					<div className="border-t border-white/10 pt-8">
						<div className="flex flex-col md:flex-row justify-between items-center gap-4">
							<p className="text-gray-400 text-sm text-center md:text-left">
								© {currentYear} Afeelaa Farms. All rights reserved.
							</p>
							<div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-500">
								<Link href="#" className="hover:text-white transition-colors">
									Privacy Policy
								</Link>
								<span>•</span>
								<Link href="#" className="hover:text-white transition-colors">
									Terms of Service
								</Link>
								<span>•</span>
								<Link href="#" className="hover:text-white transition-colors">
									Cookie Policy
								</Link>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Accent */}
				<div className="h-1 bg-gradient-to-r from-[#5D8A3A] via-[#6FA446] to-[#5D8A3A]"></div>
			</div>
		</footer>
	);
}
