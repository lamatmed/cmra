'use client';

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-r from-green-600 via-emerald-500 to-lime-400 text-white px-8 md:px-10">
      <motion.div
        className="relative w-32 h-32 md:w-48 md:h-48 lg:w-64 lg:h-64 mb-6"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src="/logo.png" // Remplace avec l'URL de ton image
          alt="Uda"
          width={256}  // Provide width for optimization
          height={256} // Provide height for optimization
         // Use intrinsic layout for responsive image
          className="rounded-full shadow-lg"
      
        />
      </motion.div>

      <motion.h1
        className="text-3xl md:text-5xl lg:text-6xl font-extrabold"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        الجالية الموريتانية في انغولا
      </motion.h1>

    

      <motion.a
        href="/login"
        className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition transform hover:scale-105"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        aria-label="Se connecter pour accéder à l'espace personnel"  // Added an aria-label for accessibility
      >
       اتصال
      </motion.a>
    </section>
  );
}
