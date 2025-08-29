"use client";

import Slider from "react-slick";
import Image from "next/image";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function TributeCarousel({ tributes }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="relative pb-12">
      <Slider {...settings}>
        {tributes.map((tribute, index) => (
          <div key={tribute.$id || index} className="px-3 py-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-md overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-56 w-full">
                <Image
                  src={tribute.imageUrl || "/placeholder.jpg"}
                  alt={tribute.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Content */}
              <div className="p-5 flex-grow flex flex-col">
                <div className="flex-grow">
                  <p className="text-gray-700 italic mb-4 line-clamp-4">
                    "{tribute.message}"
                  </p>
                </div>
                
                <div className="border-t border-gray-100 pt-4 mt-auto">
                  <h3 className="font-semibold text-gray-900">{tribute.name}</h3>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{tribute.relationship}</span>
                    <span>{new Date(tribute.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </Slider>
    </div>
  );
}