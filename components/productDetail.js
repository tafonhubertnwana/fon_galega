"use client";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import Image from "next/image";

export default function ProductDetail({ product }) {
  const [cart, setCart] = useState([]);

  const handleAddToCart = () => {
    setCart([...cart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6 mt-6"
    >
      <div className="grid md:grid-cols-2 gap-6">
        <Image
          src={product.image}
          alt={product.name}
          width={200}
          height={200}
          className="rounded-xl object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-xl font-semibold mt-4">${product.price}</p>

          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`${
                  i < Math.round(product.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-500">
              {product.rating.toFixed(1)}
            </span>
          </div>

          <p
            className={`mt-3 text-sm ${
              product.inStock ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`mt-4 px-4 py-2 rounded-xl text-white ${
              product.inStock
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {product.inStock ? "Add to Cart" : "Unavailable"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
