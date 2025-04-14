"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen backdrop-blur-sm">
        <Loader />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-neutral-950 px-4"
      dir="rtl"
    >
      <section aria-labelledby="about-heading" className="w-full max-w-xl">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="bg-neutral-900 text-white shadow-xl rounded-2xl border border-neutral-800">
            <CardContent className="p-6 sm:p-8 text-center">
              <div className="flex justify-center mb-5">
                <Building2 className="w-14 h-14 text-indigo-500" />
              </div>
              <h1
                id="about-heading"
                className="text-3xl font-extrabold text-white mb-4"
              >
                من نحن <span className="text-indigo-400">RIM TECHNOLOGIE</span>
              </h1>
              <p className="text-neutral-300 leading-relaxed text-base sm:text-lg">
                RIM TECHNOLOGIE هي شركة متخصصة في إدارة المخزون وبيع المنتجات من
                خلال منصة حديثة وسهلة الاستخدام.
              </p>
              <p className="text-neutral-300 leading-relaxed mt-4 text-base sm:text-lg">
                هدفنا هو تسهيل عملية إدارة المخزون من خلال تقديم حلول فعالة
                ومناسبة لاحتياجات التجار والشركات.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default About;
