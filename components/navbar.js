"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import logo from "@/public/fon/logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Tribute", href: "/tribute" },
    { label: "Gallery", href: "/gallery" },
  ];

  return (
    <nav className="bg-primary  shadow-md fixed w-full z-50">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={logo}
              alt="Logo"
              width={55}
              height={55}
              priority
              className="rounded-full"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="relative text-white font-medium hover:text-secondary transition-colors duration-200"
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-white hover:text-secondary focus:outline-none"
            >
              <FaBars className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-4/5 max-w-sm bg-white backdrop-blur-xl shadow-2xl transform transition-transform duration-500 ease-in-out ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden z-50 rounded-l-2xl`}
      >
        {/* Close button */}
        <div className="flex justify-end p-6">
          <button
            onClick={() => setMenuOpen(false)}
            className="text-gray-800 hover:text-secondary"
          >
            <FaTimes className="w-6 h-6" />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col items-center justify-center space-y-8 mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="text-2xl font-semibold text-gray-800 hover:text-secondary transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
