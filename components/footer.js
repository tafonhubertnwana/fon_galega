"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/fon/logo.png";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function Footer() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <footer className="bg-primary text-white relative overflow-hidden">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-16 flex flex-col items-center text-center gap-10 relative z-10">
        {/* Brand */}
        {/* <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={0}
          viewport={{ once: true }}
        >
          <Image src={logo} alt="Company Logo" width={100} height={100} />
          <p className="mt-4 text-sm max-w-md leading-relaxed">
            We deliver innovative solutions to help businesses grow with
            confidence.
          </p>
        </motion.div> */}

        {/* Quick Links */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={1}
          viewport={{ once: true }}
        >
          <ul className="flex flex-wrap justify-center gap-6 text-sm md:text-lg xl:text-2xl font-medium">
  {["Home", "Tributes", "Galleries"].map((item, i) => (
    <motion.li
      key={i}
      whileHover={{ y: -2, color: "#fff" }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      <Link href={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
        {item}
      </Link>
    </motion.li>
  ))}
</ul>
        </motion.div>

        {/* Socials */}
       
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="border-t border-white text-center py-6 text-sm relative z-10"
      >
        © {new Date().getFullYear()} Fon Galega II. All rights reserved.
      </motion.div>
    </footer>
  );
}
