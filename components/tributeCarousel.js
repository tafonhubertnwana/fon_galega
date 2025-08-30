"use client";

import Slider from "react-slick";
import Image from "next/image";
import { motion } from "framer-motion";
import { Quote } from "lucide-react"; // icon
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function TributeCarousel({ tributes }) {
  const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1, // ✅ default for mobile first
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 640, // small tablets/mobiles
      settings: { slidesToShow: 1, slidesToScroll: 1 },
    },
    {
      breakpoint: 1024, // tablets
      settings: { slidesToShow: 2, slidesToScroll: 1 },
    },
    {
      breakpoint: 1280, // desktops
      settings: { slidesToShow: 3, slidesToScroll: 1 },
    },
  ],
};


  return (
    <div className="relative pb-12">
      <Slider {...settings}>
        {tributes.map((tribute, index) => (
          <div key={tribute.$id || index} className="w-full px-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative flex flex-col items-center"
            >
              {/* Profile Image */}
              <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-md z-10 bg-gray-100">
                <Image
                  src={tribute.imageUrl || "/placeholder.jpg"}
                  alt={tribute.name}
                  fill
                  className="object-cover rounded-full"
                />
              </div>

              {/* Card */}
              <div className="bg-primary text-white mt-[-2rem] rounded-2xl p-6 pt-10 w-full text-center shadow-md relative">
                {/* Quote Icon */}
                <Quote
                  className="absolute top-3 left-3 w-10 h-10 text-secondary rotate-180"
                />
                <Quote
                  className="absolute top-3 right-3 w-10 h-10 text-secondary"
                />
                <h3 className="mt-4 md-1 font-semibold">{tribute.name}</h3>
                <span className="text-sm opacity-80">{tribute.relationship}</span>

                {/* Name & Relationship */}
                <p className="text-xs mt-1 opacity-70">
                  {new Date(tribute.date).toLocaleDateString()}
                </p>
                {/* Message */}
                <p className="mb-4 text-sm leading-relaxed">
                  {tribute.message}
                </p>

              </div>
            </motion.div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
