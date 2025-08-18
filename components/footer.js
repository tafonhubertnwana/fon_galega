"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import logo from '@/public/fon/logo.png'
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";

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
      <div className="container mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
        {/* Brand */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={0}
          viewport={{ once: true }}
        >
          <Image src={logo} alt={logo} width={100} height={100} />
          <p className="mt-4 text-sm text-white leading-relaxed">
            We deliver innovative solutions to help businesses grow with
            confidence.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={1}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {["Home", "About", "Services", "Contact"].map((item, i) => (
              <motion.li
                key={i}
                whileHover={{ x: 6, color: "#fff" }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Link href={`/${item.toLowerCase()}`}>{item}</Link>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={2}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-white">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2 hover:text-white transition">
              <MdEmail size={18} /> info@yourcompany.com
            </li>
            <li className="flex items-center gap-2 hover:text-white transition">
              <MdPhone size={18} /> +1 (234) 567-890
            </li>
            <li className="flex items-center gap-2 hover:text-white transition">
              <MdLocationOn size={18} /> 123 Business Rd, New York, USA
            </li>
          </ul>
        </motion.div>

        {/* Socials */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          custom={3}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-semibold text-white">Follow Us</h3>
          <div className="mt-4 flex gap-4">
            {[
              { icon: <FaLinkedinIn />, color: "hover:bg-blue-600" },
              { icon: <FaTwitter />, color: "hover:bg-sky-500" },
              { icon: <FaFacebookF />, color: "hover:bg-blue-700" },
              { icon: <FaInstagram />, color: "hover:bg-pink-500" },
            ].map((social, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full bg-secondary cursor-pointer transition ${social.color}`}
              >
                {social.icon}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="border-t border-white text-center py-6 text-sm relative z-10"
      >
        © {new Date().getFullYear()} YourCompany. All rights reserved.
      </motion.div>
    </footer>
  );
}
