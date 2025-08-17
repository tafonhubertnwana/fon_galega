// components/FonHistory.jsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import fonImg from "@/public/fon/fon-6.png"; // Replace with your image path

export default function FonHistory() {
  return (
    <section className="container xl:max-w-6xl mx-auto text-center">
  <div className="grid grid-cols-1 md:grid-cols-2 p-6 items-stretch bg-white">
    {/* Left Side */}
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="bg-red-900 p-6 md:p-8  text-white flex flex-col justify-center h-full"
    >
      <h2 className="text-3xl font-bold mb-4">FON GALEGA II</h2>
      <p className="leading-relaxed">
        Fon Galega II of Bali Nyonga, also known as Vincent Samdala, was the
        traditional ruler of Bali Nyonga in Cameroon from 1940 to 1985. He
        succeeded his father, Fonyonga II, who died in August 1940. Galega II
        played a significant role in the development of Bali Nyonga, including
        the establishment of the first Native Authority school in the Bamenda
        Grassfields and the Native Court in 1925. He was also a supporter of
        the Basel Mission, which helped popularize the Mungaka language in the
        area. A book, "An Introduction to the Study of Bali-Nyonga," written by
        various scholars, is a tribute to his reign.
      </p>
    </motion.div>

    {/* Right Side */}
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="flex justify-center items-center h-full"
    >
      <Image
        src={fonImg}
        alt="Fon Galega II"
        width={500}
        height={500}
        className="shadow-lg object-cover w-full h-full max-h-[500px]"
      />
    </motion.div>
  </div>
</section>

  );
}
