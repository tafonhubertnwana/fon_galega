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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tribute to Fon Galega II</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Share your memories, stories, and messages to honor the legacy of our late Fon.
          </p>
        </motion.div>

        <div className="text-center mb-10">
          <button
            onClick={() => setShowForm(true)}
            className="btn bg-primary btn-lg rounded-md px-8 shadow-lg hover:shadow-xl transition-all duration-300"
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
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Tributes Yet</h3>
              <p className="text-gray-500 mb-6">Be the first to share your tribute to our Fon.</p>
              <button
                onClick={() => setShowForm(true)}
                className="btn bg-primary rounded-md"
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