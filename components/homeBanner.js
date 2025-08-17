// components/HomeBanner.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import bannerBg from "@/public/fon/fon-3.png"; // Replace with your image path

export default function HomeBanner() {
  return (
    <div>
      
      <section className="relative w-full h-[600] overflow-hidden">
    <Image
      src={bannerBg}
      alt="Fon Galega II Banner"
      fill
      className="object-cover"
      priority
    />

    {/* Red overlay with low opacity */}
    <div className="absolute inset-0 bg-primary/20 flex items-center">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-secondary w-full max-w-2xl min-h-[250px] p-10 shadow-lg ml-6 md:ml-12 flex flex-col justify-center"
      >
        <h1 className="text-2xl md:text-4xl font-bold text-white">
          🎉 CELEBRATING 40 YEARS OF FON GALEGA II OF BALI NYONGA
        </h1>
        <p className="mt-2 text-black font-medium text-base md:text-xl text-center py-6">
          September 25, 1906 – September 18, 1985
        </p>
      </motion.div>
    </div>
  </section>
    </div>

  );
}
