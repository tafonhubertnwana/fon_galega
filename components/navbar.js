"use client";

import { useState } from "react";
import Link from "next/link";
import { FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import logo from "@/public/fon/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <nav className="bg-primary shadow-md fixed w-full z-50">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Flex wrapper */}
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center text-2xl font-bold text-white"
          >
            <Image src={logo} alt="Logo" width={65} height={65} priority />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white font-medium hover:text-secondary transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            <FaUser className="w-5 h-5 text-white hover:text-secondary cursor-pointer transition-colors duration-200" />
            <FaShoppingCart className="w-5 h-5 text-white hover:text-secondary cursor-pointer transition-colors duration-200" />
          </div>

          {/* Mobile Toggle Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white hover:text-secondary focus:outline-none"
            >
              {menuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-24 right-0 bg-white shadow-lg px-6 py-8 space-y-6 transform transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } w-2/3 max-w-xs h-screen overflow-y-auto`}
      >
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="block text-gray-700 font-medium hover:text-secondary transition-colors duration-200"
            onClick={() => setMenuOpen(false)} // close menu when clicked
          >
            {item.label}
          </Link>
        ))}
        <div className="flex space-x-6 pt-4">
          <FaUser className="w-5 h-5 text-gray-700 hover:text-secondary cursor-pointer transition-colors duration-200" />
          <FaShoppingCart className="w-5 h-5 text-gray-700 hover:text-secondary cursor-pointer transition-colors duration-200" />
        </div>
      </div>
    </nav>
  );
}
