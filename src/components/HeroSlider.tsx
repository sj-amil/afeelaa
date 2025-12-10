"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface HeroSliderProps {
	images: string[];
	title: string;
	subtitle: string;
	tagline: string;
	description: string;
	primaryButtonText: string;
	primaryButtonLink: string;
	secondaryButtonText: string;
	secondaryButtonLink: string;
	stat1Value: string;
	stat1Label: string;
	stat2Value: string;
	stat2Label: string;
	stat3Value: string;
	stat3Label: string;
	stat4Value: string;
	stat4Label: string;
}

export default function HeroSlider({
	images,
	title,
	subtitle,
	tagline,
	description,
	primaryButtonText,
	primaryButtonLink,
	secondaryButtonText,
	secondaryButtonLink,
	stat1Value,
	stat1Label,
	stat2Value,
	stat2Label,
	stat3Value,
	stat3Label,
	stat4Value,
	stat4Label,
}: HeroSliderProps) {
	const [currentSlide, setCurrentSlide] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentSlide((prev) => (prev + 1) % images.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [images.length]);

	return (
		<section className="relative h-[600px] sm:h-[700px] md:h-[800px] lg:h-[900px] overflow-hidden">
			{/* Background Image Slider */}
			<AnimatePresence mode="wait">
				{images.map(
					(image, index) =>
						index === currentSlide && (
							<motion.div
								key={index}
								initial={{ opacity: 0, scale: 1.1 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ duration: 1, ease: "easeInOut" }}
								className="absolute inset-0"
							>
								<div className="relative w-full h-full">
									<img
										src={image}
										alt={`Hero ${index + 1}`}
										className="w-full h-full object-cover"
									/>
								</div>
								<div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-transparent"></div>
								<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
							</motion.div>
						)
				)}
			</AnimatePresence>

			{/* Hero Content */}
			<div className="relative h-full flex items-center z-10">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
					<div className="max-w-4xl">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="inline-block mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20"
						>
							<p className="text-xs sm:text-sm md:text-base text-white/90 font-medium">
								{tagline}
							</p>
						</motion.div>

						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white mb-4 sm:mb-6 leading-[1.1] tracking-tight"
						>
							{title}
						</motion.h1>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.4 }}
							className="text-lg sm:text-xl md:text-2xl text-emerald-100 mb-3 sm:mb-4 font-light"
						>
							{subtitle}
						</motion.p>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.5 }}
							className="text-sm sm:text-base md:text-lg lg:text-xl text-white/80 mb-8 sm:mb-10 md:mb-12 max-w-2xl leading-relaxed"
						>
							{description}
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.6 }}
							className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-10 sm:mb-12 md:mb-16"
						>
							<Link
								href={primaryButtonLink}
								className="group relative px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base md:text-lg transition-all hover:scale-105 hover:shadow-2xl inline-block text-center overflow-hidden active:scale-95"
								style={{
									background:
										"linear-gradient(135deg, #5D8A3A 0%, #6FA446 100%)",
									color: "white",
								}}
							>
								<span className="relative z-10 flex items-center justify-center gap-2">
									{primaryButtonText}
									<i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform text-sm sm:text-base"></i>
								</span>
								<div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
							</Link>
							<Link
								href={secondaryButtonLink}
								className="group px-6 sm:px-8 py-3 sm:py-4 bg-white/10 backdrop-blur-lg rounded-full font-bold text-sm sm:text-base md:text-lg transition-all hover:bg-white/20 hover:scale-105 border-2 border-white/30 inline-block text-center text-white active:scale-95"
							>
								<span className="flex items-center justify-center gap-2">
									{secondaryButtonText}
									<i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform text-sm sm:text-base"></i>
								</span>
							</Link>
						</motion.div>
					</div>
				</div>
			</div>

			{/* Slider Dots */}
			<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
				{images.map((_, index) => (
					<button
						key={index}
						onClick={() => setCurrentSlide(index)}
						className={`h-2 rounded-full transition-all ${
							index === currentSlide ? "bg-white w-8" : "bg-white/50 w-2"
						}`}
						aria-label={`Go to slide ${index + 1}`}
					/>
				))}
			</div>
		</section>
	);
}
