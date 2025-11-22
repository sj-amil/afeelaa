"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface NavLink {
	label: string;
	href: string;
	isButton?: boolean;
	buttonStyle?: "primary" | "secondary";
}

interface HeaderProps {
	logoSrc: string;
	logoAlt: string;
	navLinks: NavLink[];
}

export default function Header({ logoSrc, logoAlt, navLinks }: HeaderProps) {
	const { language, setLanguage } = useLanguage();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 20);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const toggleLanguage = () => {
		setLanguage(language === "en" ? "bn" : "en");
	};

	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	const closeMobileMenu = () => {
		setMobileMenuOpen(false);
	};

	return (
		<nav
			className={`fixed w-full top-0 z-50 transition-all duration-500 ${
				scrolled
					? "bg-white/95 backdrop-blur-lg shadow-lg shadow-gray-200/50"
					: "bg-white/80 backdrop-blur-sm shadow-sm"
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16 md:h-20">
					{/* Logo */}
					<div className="flex items-center">
						<Link href="/" onClick={closeMobileMenu}>
							<img
								src={logoSrc}
								alt={logoAlt}
								className="h-20 md:h-40 w-auto"
							/>
						</Link>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden lg:flex items-center space-x-1">
						{navLinks.map((link, index) =>
							link.isButton ? (
								<Link
									key={index}
									href={link.href}
									className="relative px-6 py-3 ml-3 rounded-full font-bold text-white transition-all hover:scale-105 hover:shadow-xl group overflow-hidden"
									style={{
										background:
											link.buttonStyle === "primary"
												? "linear-gradient(135deg, #5D8A3A 0%, #6FA446 100%)"
												: "linear-gradient(135deg, #6FA446 0%, #7FB556 100%)",
									}}
								>
									<span className="relative z-10">{link.label}</span>
									<div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
								</Link>
							) : (
								<Link
									key={index}
									href={link.href}
									className="relative px-4 py-2 text-gray-700 font-medium hover:text-[#5D8A3A] transition-all group"
								>
									<span className="relative z-10">{link.label}</span>
									<span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#5D8A3A] to-[#6FA446] group-hover:w-full transition-all duration-300"></span>
								</Link>
							)
						)}

						{/* Desktop Language Switcher */}
						<button
							onClick={toggleLanguage}
							className="flex items-center gap-2 px-4 py-2.5 ml-3 rounded-full font-semibold text-gray-700 hover:text-[#5D8A3A] border-2 border-gray-200 hover:border-[#5D8A3A] transition-all hover:scale-105 group"
						>
							<i className="fas fa-language text-lg group-hover:rotate-12 transition-transform"></i>
							<span className="text-sm">
								{language === "en" ? "বাংলা" : "English"}
							</span>
						</button>
					</div>

					{/* Mobile Menu Button */}
					<div className="flex items-center lg:hidden">
						<button
							onClick={toggleMobileMenu}
							className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500"
							aria-expanded={mobileMenuOpen}
						>
							<span className="sr-only">Open main menu</span>
							{!mobileMenuOpen ? (
								<svg
									className="block h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							) : (
								<svg
									className="block h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M6 18L18 6M6 6l12 12"
									/>
								</svg>
							)}
						</button>
					</div>
				</div>
			</div>

			{/* Mobile Menu */}
			<div
				className={`lg:hidden transition-all duration-300 ${
					mobileMenuOpen
						? "max-h-screen opacity-100"
						: "max-h-0 opacity-0 overflow-hidden"
				}`}
			>
				<div className="px-4 pt-4 pb-6 space-y-2 bg-gradient-to-b from-white to-gray-50 border-t border-gray-100 shadow-2xl">
					{/* Mobile Navigation Links */}
					{navLinks.map((link, index) =>
						link.isButton ? (
							<Link
								key={index}
								href={link.href}
								onClick={closeMobileMenu}
								className="block px-6 py-3 rounded-xl text-center font-bold text-white transition-all hover:scale-105 shadow-lg"
								style={{
									background:
										link.buttonStyle === "primary"
											? "linear-gradient(135deg, #5D8A3A 0%, #6FA446 100%)"
											: "linear-gradient(135deg, #6FA446 0%, #7FB556 100%)",
								}}
							>
								{link.label}
							</Link>
						) : (
							<Link
								key={index}
								href={link.href}
								onClick={closeMobileMenu}
								className="block px-6 py-3 text-base font-semibold text-gray-700 hover:bg-white hover:text-[#5D8A3A] rounded-xl transition-all shadow-sm"
							>
								{link.label}
							</Link>
						)
					)}

					{/* Mobile Language Switcher */}
					<div className="pt-3">
						<button
							onClick={toggleLanguage}
							className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold border-2 border-[#5D8A3A] text-[#5D8A3A] hover:bg-[#5D8A3A] hover:text-white transition-all"
						>
							<i className="fas fa-language text-lg"></i>
							<span>{language === "en" ? "বাংলা" : "English"}</span>
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}
