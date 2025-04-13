'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([
    {
      id: 1,
      title: "ندوة حول التنمية الاجتماعية والاقتصادية",
      description: "ندوة تهدف إلى تعزيز دور المجتمع الموريتاني في التنمية داخل أنغولا.",
      date: "2025-05-10",
    },
    {
      id: 2,
      title: "منتدى التعاون بين الجاليات",
      description: "لقاءات بين الجالية الموريتانية والجهات الأنغولية الرسمية والخاصة لتعزيز الشراكات.",
      date: "2025-06-20",
    },
    {
      id: 3,
      title: "ويبينار حول الابتكار والتكنولوجيا",
      description: "جلسة رقمية لمناقشة التقنيات الحديثة ودورها في دعم الجالية.",
      date: "2025-07-15",
    },
  ]);

  const [newActivity, setNewActivity] = useState({
    title: "",
    description: "",
    date: "",
  });

  const handleAddActivity = () => {
    const newId = activities.length + 1;
    setActivities([...activities, { id: newId, ...newActivity }]);
    setNewActivity({ title: "", description: "", date: "" });
  };

  return (
    <section
      className="w-full min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white px-8 md:px-10 py-12"
      dir="rtl"
    >
      <motion.h1
        className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        أنشطة مكتب الجالية الموريتانية في أنغولا
      </motion.h1>

      <motion.p
        className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        اكتشفوا الأنشطة القادمة التي ينظمها المكتب، بما في ذلك ندوات، منتديات، وورشات رقمية تهم الجالية الموريتانية.
      </motion.p>

      {/* Formulaire d'ajout d'activité */}
      <div className="bg-white text-gray-800 rounded-lg shadow-lg p-6 mb-10 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">إضافة نشاط جديد</h2>
        <input
          type="text"
          placeholder="عنوان النشاط"
          className="w-full mb-2 p-2 border rounded"
          value={newActivity.title}
          onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
        />
        <textarea
          placeholder="وصف النشاط"
          className="w-full mb-2 p-2 border rounded"
          value={newActivity.description}
          onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
        />
        <input
          type="date"
          className="w-full mb-4 p-2 border rounded"
          value={newActivity.date}
          onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
        />
        <button
          onClick={handleAddActivity}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          إضافة النشاط
        </button>
      </div>

      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {activities.map((activity) => (
          <motion.div
            key={activity.id}
            className="bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-4">{activity.title}</h3>
              <p className="text-gray-600 mb-4">{activity.description}</p>
              <div className="flex items-center space-x-2 text-gray-500">
                <FaRegCalendarAlt className="w-5 h-5" />
                <span>{activity.date}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
