"use client";

import { useState } from "react";
import Link from "next/link";
import { FaUser, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import logo from '@/public/fon/logo.png'

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-28 items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800 hover:scale-105 transition-transform">
            <Image src={logo} alt={logo} width={100} height={100}/>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-white hover:text-gray-900 transition-colors hover:scale-105"
              >
                {item.label}
              </Link>
            ))}
            <FaUser className="w-5 h-5 text-white hover:text-gray-900 cursor-pointer hover:scale-110 transition-transform" />
            <FaShoppingCart className="w-5 h-5 text-white hover:text-gray-900 cursor-pointer hover:scale-110 transition-transform" />
          </div>

           <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 hover:text-gray-900">
              {menuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
<div
  className={`md:hidden fixed top-32 right-0 bg-white shadow-lg px-4 py-6 space-y-6 transform transition-transform duration-300 ease-in-out ${
    menuOpen ? "translate-x-0" : "translate-x-full"
  } w-2/3 max-w-xs h-screen overflow-y-auto`}
>
  {menuItems.map((item) => (
    <Link
      key={item.label}
      href={item.href}
      className="block text-gray-700 hover:text-gray-900 transition-colors hover:scale-105"
    >
      {item.label}
    </Link>
  ))}
  <div className="flex space-x-4 pt-4">
    <FaUser className="w-5 h-5 text-gray-700 hover:text-gray-900 cursor-pointer hover:scale-110 transition-transform" />
    <FaShoppingCart className="w-5 h-5 text-gray-700 hover:text-gray-900 cursor-pointer hover:scale-110 transition-transform" />
  </div>
</div>

    </nav>
  );
}
