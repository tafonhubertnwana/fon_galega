"use client";

import { useEffect, useState } from "react";
import TributeForm from "@/components/tributeForm";
import TributeCarousel from "@/components/tributeCarousel";
import { motion } from "framer-motion";
import TributeBanner from "@/components/tributeBanner";


export default function TributePage() {
  const [tributes, setTributes] = useState([]);
  const [showForm, setShowForm] = useState(false);
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

  return (
    <>
    <TributeBanner />
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12">
  <div className="container mx-auto px-6">
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center mb-12"
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-4">
        Tribute to Fon Galega II
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl xl:text-4xl text-gray-600 max-w-4xl mx-auto">
        Share your memories, stories, and messages to honor the legacy of our late Fon.
      </p>
    </motion.div>

    <div className="text-center mb-10">
      <button
        onClick={() => setShowForm(true)}
        className="py-6 px-10 sm:py-4 sm:px-12 md:py-5 md:px-20 lg:py-6 lg:px-32 xl:py-8 xl:px-60 
                   bg-primary text-white font-bold text-lg  md:text-2xl lg:text-4xl xl:text-6xl 
                   rounded-md shadow-lg hover:shadow-xl transition-all duration-300"
      >
        Write a Tribute
      </button>
    </div>

    {/* Tribute Form Modal */}
    {showForm && (
      <TributeForm 
        onClose={() => setShowForm(false)} 
        onSubmit={fetchTributes} 
      />
    )}

    {/* Tributes Display */}
    <div className="mt-10">
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-md h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : tributes.length > 0 ? (
        <TributeCarousel tributes={tributes} />
      ) : (
        <div className="text-center py-12 bg-white rounded-2xl shadow-sm">
          <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">📝</div>
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-2">
            No Tributes Yet
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-500 mb-6">
            Be the first to share your tribute to our Fon.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="btn bg-primary text-white px-6 py-3 sm:px-8 sm:py-4 rounded-md text-sm sm:text-base md:text-lg"
          >
            Write First Tribute
          </button>
        </div>
      )}
    </div>
  </div>
</div>

    </>
  );
}