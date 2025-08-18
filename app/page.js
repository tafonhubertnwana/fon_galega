"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import Image from "next/image";
import HomeBanner from "@/components/homeBanner";
import FonHistory from "@/components/fonHistory";
import Events from "@/components/events";
import TributeCarousel from "@/components/tributeCarousel";
import Link from "next/link";
import { motion } from "framer-motion";
import LocationSection from "@/components/map";
import products from "@/data/products.json";
import ProductCard from "@/components/productCard";
import Gallery from "@/components/gallery";

export default function Home() {
  const [tributes, setTributes] = useState([]);

  const fetchTributes = async () => {
    const res = await fetch("/api/tributes");
    const data = await res.json();
    setTributes(data);
  };

  useEffect(() => {
    fetchTributes();
  }, []);

  return (
    <main className="">
      <HomeBanner />
      <FonHistory />
      <Events />
      <section className="bg-primary p-10">
        <div className="container xl:max-w-6xl mx-auto">
      <h1 className="text-2xl text-white font-bold mb-6">Featured Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      </div>
    </section>
      {/* ✅ Tributes Section */}
      <section className="container xl:max-w-6xl mx-auto py-16 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-6 "
        >
          Recent Tributes
        </motion.h2>

        {tributes.length > 0 ? (
          <TributeCarousel tributes={tributes} />
        ) : (
          <p className="text-gray-500">No tributes yet. Be the first to write one!</p>
        )}

        <Link
          href="/tribute"
          className="inline-block mt-8 bg-primary text-white py-2 px-6 rounded-sm transition"
      
        >
          See All & Write your own Tribute
        </Link>
      </section>
    <section className="container xl:max-w-6xl mx-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-8">
          Our Gallery
        </h2>
        <Gallery preview />
      </section>

      <LocationSection />
    </main>
  );
}
