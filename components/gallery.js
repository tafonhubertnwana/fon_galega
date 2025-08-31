"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import galleryData from "@/data/gallery.json";
import Link from "next/link";

const categories = [
  "All",
  "Traditional Ceremonies",
  "Ancestral & Spiritual Practices",
  "Cultural Heritage",
  "Royalty & Leadership",
  "Festivals & Celebrations",
  "Palace Life",
];

export default function Gallery({ preview = false }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    setGalleryItems(galleryData);
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const displayedItems = preview ? filteredItems.slice(0, 6) : filteredItems;

  const handlePrev = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex - 1 + displayedItems.length) % displayedItems.length
    );
  };

  const handleNext = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex + 1) % displayedItems.length
    );
  };

  return (
    <section className="container mx-auto px-4 sm:px-6 py-6">
      {!preview && (
        <h2 className="text-3xl font-bold text-center mb-4">Gallery</h2>
      )}

      {/* Categories + Images */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Categories */}
        <div className="w-full md:w-1/5 flex flex-wrap md:flex-col gap-3 justify-center md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedImageIndex(null); // reset modal when changing category
              }}
              className={`px-4 py-2 rounded-sm text-sm font-medium transition w-auto md:w-full text-center ${
                selectedCategory === cat
                  ? "bg-primary text-white"
                  : "bg-secondary hover:bg-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="w-full md:w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((item, index) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative cursor-pointer overflow-hidden rounded-sm shadow-md"
              onClick={() => setSelectedImageIndex(index)}
            >
              <Image
                src={item.src}
                alt={item.title}
                width={600}
                height={400}
                className="object-cover w-full h-64 transition-transform duration-500 hover:scale-110"
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Preview Button */}
      {preview && (
        <div className="flex justify-center mt-8">
          <Link
            href="/gallery"
            className="px-6 py-3 bg-primary text-white rounded-sm shadow-md hover:bg-secondary transition"
          >
            View Full Gallery
          </Link>
        </div>
      )}

      {/* Image Modal with Navigation */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full flex items-center">
            {/* Close Button */}
            <button
              onClick={() => setSelectedImageIndex(null)}
              className="absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              onClick={handlePrev}
              className="absolute left-2 md:left-6 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image */}
            <div className="mx-auto">
              <Image
                src={displayedItems[selectedImageIndex].src}
                alt={displayedItems[selectedImageIndex].title}
                width={800}
                height={800}
                className="w-full h-auto rounded-xl shadow-lg"
              />
              <p className="text-white text-center mt-4 text-lg">
                {displayedItems[selectedImageIndex].title}
              </p>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 md:right-6 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
