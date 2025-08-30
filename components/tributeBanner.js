// components/TributeBanner.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import bannerBg from "@/public/fon/fon-8.jpeg"; // Replace with your image path

export default function TributeBanner() {
  return (
    <section className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] overflow-hidden">
      {/* Background image */}
      <Image
        src={bannerBg}
        alt="Fon Galega II Banner"
        fill
        className="object-cover"
        priority
      />

      {/* Red overlay with low opacity */}
      <div className="absolute inset-0 bg-primary/50 flex items-center justify-center md:justify-start">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="
            bg-secondary 
            w-[90%] sm:w-4/5 md:max-w-2xl 
            min-h-[180px] sm:min-h-[220px] md:min-h-[250px] 
            p-4 sm:p-6 md:p-10 
            shadow-lg 
            text-center md:text-left
          "
        >
          <h1 className="text-xl uppercase sm:text-2xl md:text-4xl font-bold text-primary leading-snug">
            Join us in honoring the remarkable life and legacy of <span className="font-semibold text-primary">Fon Galega II of Bali Nyonga</span>.
          </h1>
          <p className="mt-3 text-primary font-medium text-sm sm:text-base md:text-xl py-2 sm:py-4 md:py-6">
           Your words, memories, and reflections will serve as a lasting tribute to a leader whose wisdom, courage, and love for his people continue to inspire generations. 
  Share your heartfelt message and help us celebrate his enduring spirit.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
