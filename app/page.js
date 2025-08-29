"use client";

import { useEffect, useState } from "react";
import HomeBanner from "@/components/homeBanner";
import FonHistory from "@/components/fonHistory";
import Events from "@/components/events";
import Link from "next/link";
import FeaturedTributes from "@/components/tributeCarousel"; // ⬅️ make sure this is imported

export default function Home() {
  const [tributes, setTributes] = useState([]);

  const fetchTributes = async () => {
    try {
      const res = await fetch("/api/tributes", { cache: "no-store" });
      const data = await res.json();
      setTributes(data.documents?.slice(0, 3) || []); // ✅ correct fix
    } catch (error) {
      console.error("Error fetching tributes:", error);
    }
  };

  useEffect(() => {
    fetchTributes();
  }, []);

  return (
    <main>
      <HomeBanner />
      <FonHistory />
      <Events />

      {/* ✅ Tributes Section */}
      <section className="container mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Recent Tributes</h2>

        {tributes.length > 0 ? (
          <FeaturedTributes tributes={tributes} />
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-6">
              No tributes yet. Be the first to share your memory.
            </p>
            <Link href="/tribute" className="px-3 py-2 border-2 border-primary rounded-sm">
              Share Your Tribute
            </Link>
          </div>
        )}
      </section>
    </main>
  );
}
