"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-center items-center min-h-screen bg-gray-100 px-4"
      dir="rtl"
    >
      <Card className="w-full max-w-2xl shadow-lg rounded-2xl overflow-hidden">
        <CardContent className="p-8 text-center">
          <div className="flex justify-center mb-4">
            <Building2 className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">حول RIM TECHNOLOGIE</h1>
          <p className="text-gray-700 leading-relaxed">
            RIM TECHNOLOGIE هي شركة متخصصة في إدارة المخزون وبيع المنتجات عبر منصة حديثة وسهلة الاستخدام.
          </p>
          <p className="text-gray-700 leading-relaxed mt-4">
            هدفنا هو تسهيل إدارة المخزون من خلال توفير حلول فعالة ومناسبة لاحتياجات التجار والشركات.
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default About;
