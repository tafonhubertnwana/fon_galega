"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";

export default function ProductCard({ product }) {
  return (
    

      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-sm shadow-md overflow-hidden"
      >
        <Link href={`/products/${product.id}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>

            {/* Short description preview */}
            <p className="text-sm text-gray-500 mt-2 line-clamp-2">
              {product.description}
            </p>

            {/* Ratings */}
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

            {/* Stock status */}
            <p
              className={`mt-2 text-sm ${
                product.inStock ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
          </div>
        </Link>
      </motion.div>
    
  );
}
