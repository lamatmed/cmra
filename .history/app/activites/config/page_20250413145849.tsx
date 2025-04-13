'use client';

import React, { useEffect, useState } from 'react';
import {
    createActivity,
    getAllActivities,
    updateActivity,
    deleteActivity,
} from '@/utils/actions';
import { motion } from 'framer-motion';

export default function ManageActivitiesPage() {
    const [activities, setActivities] = useState<any[]>([]);
    const [formData, setFormData] = useState({ title: '', description: '', date: '' });
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchActivities();
    }, []);

    const fetchActivities = async () => {
        const data = await getAllActivities();
        setActivities(data);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId) {
            await updateActivity(editingId, formData);
        } else {
            await createActivity(formData);
        }

        setFormData({ title: '', description: '', date: '' });
        setEditingId(null);
        fetchActivities();
    };

    const handleEdit = (activity: any) => {
        setEditingId(activity.id);
        setFormData({
            title: activity.title,
            description: activity.description,
            date: activity.date.split('T')[0],
        });
    };

    const handleDelete = async (id: string) => {
        if (confirm('هل أنت متأكد من حذف هذا النشاط؟')) {
            await deleteActivity(id);
            fetchActivities();
        }
    };

    return (
        <section className="min-h-screen p-8 bg-gray-100" dir="rtl">
            <motion.h1
                className="text-3xl font-bold text-center text-blue-900 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                إدارة الأنشطة
            </motion.h1>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-6 rounded shadow mb-10">
                <h2 className="text-xl font-semibold mb-4">{editingId ? 'تعديل النشاط' : 'إضافة نشاط جديد'}</h2>

                <input
                    type="text"
                    placeholder="عنوان النشاط"
                    className="w-full mb-4 p-2 border rounded"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                />
                <textarea
                    placeholder="وصف النشاط"
                    className="w-full mb-4 p-2 border rounded"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                />
                <input
                    type="date"
                    className="w-full mb-4 p-2 border rounded"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {editingId ? 'تحديث النشاط' : 'إضافة'}
                </button>
            </form>

            {/* Liste des activités */}
            <div className="grid md:grid-cols-2 gap-6">
                {activities.length === 0 ? (
                    <p className="text-center w-full text-gray-600">لا توجد أنشطة حالياً.</p>
                ) : (
                    activities.map((activity) => (
                        <div key={activity.id} className="bg-white p-6 rounded shadow">
                            <h3 className="text-xl font-bold mb-2">{activity.title}</h3>
                            <p className="text-gray-700 mb-2">{activity.description}</p>
                            <p className="text-gray-500 mb-4">📅 {activity.date.split('T')[0]}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(activity)}
                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                >
                                    تعديل
                                </button>
                                <button
                                    onClick={() => handleDelete(activity.id)}
                                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                                >
                                    حذف
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
}
