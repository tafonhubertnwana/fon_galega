"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { X } from "lucide-react";
import galleryData from "@/data/gallery.json";
import Link from "next/link";

const categories = ["All", "Events", "Nature", "Architecture", "People"];

export default function Gallery({ preview = false }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    setGalleryItems(galleryData);
  }, []);

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  const displayedItems = preview ? filteredItems.slice(0, 6) : filteredItems;

  return (
    <section className="container mx-auto px-4 sm:px-6 py-12">
      {!preview && (
        <h2 className="text-4xl font-bold text-center mb-10 tracking-tight text-gray-800">
          Explore the Gallery
        </h2>
      )}

      {/* Categories + Images */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Categories */}
        <div className="w-full md:w-1/5 flex flex-wrap md:flex-col gap-3 justify-center md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              aria-label={`Filter by ${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="w-full md:w-4/5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedItems.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <Image
                src={item.src}
                alt={item.title}
                width={600}
                height={400}
                loading="lazy"
                className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-medium">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Preview Button */}
      {preview && (
        <div className="flex justify-center mt-10">
          <Link
            href="/gallery"
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full shadow-md hover:opacity-90 transition"
          >
            View Full Gallery
          </Link>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative max-w-5xl w-full bg-white rounded-xl overflow-hidden shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full hover:bg-gray-200 transition"
              aria-label="Close image preview"
            >
              <X className="w-6 h-6 text-gray-800" />
            </button>
            <Image
              src={selectedImage.src}
              alt={selectedImage.title}
              width={1000}
              height={700}
              className="w-full h-auto object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800">
                {selectedImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
