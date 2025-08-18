"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";

export default function TributeCarousel({ tributes }) {
  return (
    <Swiper spaceBetween={30} slidesPerView={1} autoplay={{ delay: 4000 }}>
      {tributes.map((t) => (
        <SwiperSlide key={t.$id}>
          <motion.div
            className="bg-white shadow-xl rounded-2xl p-6 max-w-xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t.imageUrl && (
              <img
                src={t.imageUrl}
                alt={t.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
              />
            )}
            <p className="text-gray-700 italic">“{t.message}”</p>
            <h3 className="mt-4 font-semibold text-lg">{t.name}</h3>
            <span className="text-sm text-gray-500 block">
              {t.relationship} — {t.date}
            </span>
          </motion.div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
