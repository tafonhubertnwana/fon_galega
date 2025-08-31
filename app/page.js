"use client";

import { useEffect, useState } from "react";
import HomeBanner from "@/components/homeBanner";
import FonHistory from "@/components/fonHistory";
import Events from "@/components/events";
import Link from "next/link";
import TributeCarousel from "@/components/tributeCarousel"; // ⬅️ make sure this is imported

export default function Home() {
  const [tributes, setTributes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTributes = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/tributes");
        const data = await res.json();
        setTributes(data);
      } catch (error) {
        console.error("Error fetching tributes:", error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchTributes();
    }, []);

  useEffect(() => {
    fetchTributes();
  }, []);

  return (
    <main>
      <HomeBanner />
      <FonHistory />
      <Events />

      {/* ✅ Tributes Section */}
      <section className="container mx-auto px-6 py-6">
  <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center text-gray-800 mb-12">
    Recent Tributes
  </h2>

  {tributes.length > 0 ? (
    <>
      <TributeCarousel tributes={tributes} />

      {/* Always visible button under carousel */}
      <div className="text-center mt-8">
        <Link
          href="/tributes"
          className=" px-10 sm:py-4 sm:px-12 md:py-5 md:px-20 lg:py-6 lg:px-20 xl:py-8 xl:px-40 inline-block text-lg  md:text-2xl lg:text-4xl xl:text-6xl  py-2 border-2 border-primary text-primary font-medium rounded-sm hover:bg-primary hover:text-white transition"
        >
          Share Your Tribute
        </Link>
      </div>
    </>
  ) : (
    <div className="text-center py-12">
      <p className="text-gray-500 text-lg md:text-xl lg:text-2xl xl:text-4xl mb-6">
        No tributes yet. Be the first to share your memory.
      </p>
      <Link
        href="/tributes"
        className="y-6 px-10 sm:py-4 sm:px-12 md:py-5 md:px-20 lg:py-6 lg:px-20 xl:py-8 xl:px-40 inline-block text-lg  md:text-2xl lg:text-4xl xl:text-6xl  py-2  border-2 border-primary text-primary font-medium rounded-sm hover:bg-primary hover:text-white transition"
      >
        Share Your Tribute
      </Link>
    </div>
  )}
</section>

    </main>
  );
}
