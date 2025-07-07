import React, { useEffect, useState } from "react";
import { useLang } from '../context/LanguageContext';
import config from "../data/config.json";

// PromoCarousel component: cycles through featured promos
export default function PromoCarousel() {
	const { t } = useLang();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [imgLoaded, setImgLoaded] = useState(false);
	const promos = config.promos.map((p, i) => ({
		id: i,
		imageUrl: `/images/${p.image}`,
		caption: t(`promo${i + 1}`),
	}));

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prev) => (prev + 1) % promos.length);
		}, 5000);
		return () => clearInterval(interval);
	}, [promos.length]);

	useEffect(() => {
		setImgLoaded(false);
		// Fallback timeout to ensure image shows even if onLoad doesn't fire
		const fallbackTimer = setTimeout(() => {
			setImgLoaded(true);
		}, 1000);
		return () => clearTimeout(fallbackTimer);
	}, [currentIndex]);

	const currentPromo = promos[currentIndex];

	return (
		<div className="max-w-[375px] w-full mx-auto mb-4 sm:max-w-md md:max-w-lg lg:max-w-xl">
			<div className="relative w-full rounded-xl overflow-hidden shadow-xl aspect-video bg-gray-100 dark:bg-gray-800">
				{/* Promo image */}
				<img
					key={currentPromo.imageUrl}
					src={currentPromo.imageUrl}
					alt="Promo"
					className={`w-full h-full object-cover fade-in${imgLoaded ? " loaded" : ""}`}
					onLoad={() => setImgLoaded(true)}
					onError={() => setImgLoaded(true)}
				/>
				{/* Caption overlay */}
				<div className="absolute bottom-0 left-0 w-full bg-black/40 text-white text-xs sm:text-sm font-semibold text-center px-2 sm:px-4 py-2 sm:py-3 z-10 backdrop-blur-sm">
					{currentPromo.caption}
				</div>
			</div>
			{/* Carousel indicators */}
			<div className="flex justify-center mt-2 space-x-2">
				{promos.map((promo, idx) => (
					<div
						key={promo.id}
						className={`h-2 w-2 rounded-full transition-all duration-300 ${
							idx === currentIndex ? "bg-teal-500 scale-125" : "bg-gray-300"
						}`}
					/>
				))}
			</div>
		</div>
	);
}
