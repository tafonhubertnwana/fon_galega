"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function LocationSection() {
  return (
    <section className="bg-primary">
      <div className="w-full pb-10">
        {/* Map + Card */}
        <div className="w-full h-96 relative">
          {/* Map iframe */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3968.7748650991007!2d10.016184965725564!3d5.887225393646219!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x105f1b90b537ab35%3A0xfae549443386d0d!2sFON&#39;S%20Palace!5e0!3m2!1sen!2scm!4v1755473514094!5m2!1sen!2scm"
            width="100%"
            height="100%"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full rounded-md"
          ></iframe>

          {/* Floating Card */}
          <div className="max-w-7xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="
                absolute 
                bg-secondary text-white w-80 p-6 rounded-md shadow-xl max-w-sm
                bottom-[-72px] right-10
                sm:right-20 
                md:right-40 md:p-8
                lg:right-56 lg:p-10
              "
            >
              <div className="flex items-center gap-2 mb-2">
                <MapPin size={28} className="text-primary" />
                <p className="uppercase text-primary text-sm sm:text-base tracking-widest">
                  Location
                </p>
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl text-primary font-bold leading-snug">
                WE CARRY OUT IN <br /> FON&apos;s PALACE
              </h2>
            </motion.div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="max-w-7xl mx-auto px-4 mt-20 md:mt-8">
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 sm:gap-6 text-white text-sm">
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-secondary" />
              <Link href="mailto:profusecc2025@design.com">
                profusecc2025@design.com
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={18} className="text-secondary" />
              <Link href="tel:+237555012567">(+237) 555-012-567</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
