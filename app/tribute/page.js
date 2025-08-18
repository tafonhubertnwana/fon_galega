"use client";

import { useEffect, useState } from "react";
import TributeForm from "@/components/tributeForm";
import TributeCarousel from "@/components/tributeCarousel";
import { motion } from "framer-motion";

export default function TributePage() {
  const [tributes, setTributes] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchTributes = async () => {
    const res = await fetch("/api/tribute");
    const data = await res.json();
    setTributes(data);
  };

  useEffect(() => {
    fetchTributes();
  }, []);

  return (
    <section className="container mx-auto py-12 px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-8"
      >
        Tribute to Our Past Ruler
      </motion.h1>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-6 bg-indigo-600 text-white py-2 px-4 rounded-xl hover:bg-indigo-700 transition"
      >
        {showForm ? "Hide Tribute Form" : "Write a Tribute"}
      </button>

      {showForm && <TributeForm onSubmit={fetchTributes} />}

      <div className="mt-12">
        {tributes.length > 0 ? (
          <TributeCarousel tributes={tributes} />
        ) : (
          <p className="text-gray-500">No tributes yet. Be the first to write one!</p>
        )}
      </div>
    </section>
  );
}