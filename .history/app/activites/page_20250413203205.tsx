"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaRegCalendarAlt } from "react-icons/fa";
import { getAllActivities } from "@/utils/actions";
import Loader from "@/components/Loader";
import Image from "next/image";

const ActivitiesPage = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const fetchedActivities = await getAllActivities();
        setActivities(fetchedActivities);
      } catch (error) {
        console.error("Erreur lors de la récupération des activités :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <Loader />;

  return (
    <section
      className="w-full min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 sm:px-8 md:px-10 py-12"
      dir="rtl"
    >
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        أنشطة مكتب الجالية الموريتانية في أنغولا
      </motion.h1>

      <motion.p
        className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        اكتشفوا الأنشطة القادمة التي ينظمها المكتب، بما في ذلك ندوات، منتديات، وورشات رقمية تهم الجالية الموريتانية
      </motion.p>

      {activities.length === 0 ? (
        <p className="text-center text-xl text-gray-300">
          لا توجد أنشطة مخططة في الوقت الحالي.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => {
            const formattedDate = new Date(activity.date).toLocaleDateString("ar-DZ", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            });

            return (
              <motion.div
                key={activity.id}
                className="bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <div className="p-6">
                  {/* صورة النشاط */}
                  {activity.imageUrl && (
                    <Image
                      src={activity.imageUrl}
                      alt={activity.title}
                      className="w-full h-40 object-cover rounded-md mb-4"
                      width={600}
                      height={240}
                      layout="responsive"
                    />
                  )}
                  <h3 className="text-xl font-semibold mb-4 text-purple-700">{activity.title}</h3>
                  <p className="text-gray-600 mb-4">{activity.description}</p>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-500">
                    <FaRegCalendarAlt className="w-5 h-5" />
                    <span>{formattedDate}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ActivitiesPage;
