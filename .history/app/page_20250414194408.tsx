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
          src="/logo.png"
          alt="Uda"
          width={256}
          height={256}
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

      <motion.p
        className="mt-4 text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <strong>التعريف:</strong> الجالية الموريتانية في أنغولا هي إطار اجتماعي وتنموي يهدف إلى تمثيل الموريتانيين المقيمين في أنغولا وتعزيز الروابط بينهم، والدفاع عن مصالحهم، وتسهيل التواصل مع الوطن الأم.
      </motion.p>

      <motion.p
        className="mt-4 text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <strong>الأهداف:</strong> من بين أهداف الجالية: تنظيم الفعاليات الثقافية والاجتماعية، تقديم الدعم القانوني والإداري، تشجيع التضامن بين الأعضاء، المساهمة في تطوير المجتمع الموريتاني، وبناء علاقات إيجابية مع المجتمع الأنغولي.
      </motion.p>

      <motion.a
        href="/login"
        className="mt-6 px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-lg hover:bg-gray-200 transition transform hover:scale-105"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        aria-label="Se connecter pour accéder à l'espace personnel"
      >
        اتصال
      </motion.a>
    </section>
  );
}
