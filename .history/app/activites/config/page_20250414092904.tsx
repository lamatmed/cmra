"use client";

import {
    getAllActivities,
    createActivity,
    updateActivity,
    deleteActivity,
} from "@/utils/actions";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/AuthContext";
import Swal from "sweetalert2";
import Uploader from "@/components/Uploader";
import Image from "next/image";

type Activity = {
    id: string;
    title: string;
    description: string;
    date: string | Date;
    imageUrl: string | null | undefined;
};

export default function ManageActivitiesPage() {
    const { user } = useContext(AuthContext) ?? {};
    const router = useRouter();

    const [activities, setActivities] = useState<Activity[]>([]);
    const [newActivity, setNewActivity] = useState({
        title: "",
        description: "",
        date: "",
        imageUrl: "",
    });

    const [editingId, setEditingId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user?.role !== "ADMIN") {
            router.push("/dashboard");
        }
    }, [user?.role, router]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getAllActivities();
                setActivities(data);
            } catch (error) {
                Swal.fire({
                    title: "خطأ",
                    text: "تعذر تحميل الأنشطة.",
                    icon: "error",
                    confirmButtonText: "حسنًا",
                    customClass: {
                        confirmButton: 'swal-button-ok'
                    },
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setNewActivity({ ...newActivity, [e.target.name]: e.target.value });
    };

    const handleCreate = async () => {
        if (!newActivity.title || !newActivity.date) return;
        setLoading(true);
        try {
            await createActivity(newActivity);
            const updated = await getAllActivities();
            setActivities(updated);
            setNewActivity({ title: "", description: "", date: "", imageUrl: "" });
            Swal.fire({
                title: "تم بنجاح",
                text: "تمت إضافة النشاط",
                icon: "success",
                confirmButtonText: "موافق",
                customClass: {
                    confirmButton: 'swal-button-ok'
                },
            });
        } catch (error) {
            Swal.fire({
                title: "خطأ",
                text: "تعذر إضافة النشاط.",
                icon: "error",
                confirmButtonText: "موافق",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id: string) => {
        setLoading(true);
        try {
            await updateActivity(id, newActivity);
            const updated = await getAllActivities();
            setActivities(updated);
            setEditingId(null);
            setNewActivity({ title: "", description: "", date: "", imageUrl: "" });

            Swal.fire({
                title: "تم التحديث",
                text: "تم تعديل النشاط بنجاح.",
                icon: "success",
                confirmButtonText: "موافق",
            });
        } catch (error) {
            Swal.fire({
                title: "خطأ",
                text: "تعذر تعديل النشاط.",
                icon: "error",
                confirmButtonText: "موافق",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await deleteActivity(id);
            const updated = await getAllActivities();
            setActivities(updated);
            Swal.fire({
                title: "تم الحذف",
                text: "تم حذف النشاط بنجاح.",
                icon: "success",
                confirmButtonText: "موافق",
            });
        } catch (error) {
            Swal.fire({
                title: "خطأ",
                text: "تعذر حذف النشاط.",
                icon: "error",
                confirmButtonText: "موافق",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-4 sm:p-6 max-w-3xl mx-auto" dir="rtl">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-right text-gray-800">
                إدارة الأنشطة
            </h1>

            {/* النموذج */}
            <Card className="mb-6 bg-white shadow-md rounded-2xl">
                <CardHeader>
                    <CardTitle className="text-right text-lg sm:text-xl text-purple-700">
                        {editingId ? "تعديل نشاط" : "إضافة نشاط جديد"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        name="title"
                        placeholder="عنوان النشاط"
                        value={newActivity.title}
                        onChange={handleChange}
                    />
                    <Textarea
                        name="description"
                        placeholder="وصف النشاط"
                        value={newActivity.description}
                        onChange={handleChange}
                    />
                    <Input
                        name="date"
                        type="date"
                        value={newActivity.date}
                        onChange={handleChange}
                    />
                    <Uploader
                        onUpload={(url) => setNewActivity({ ...newActivity, imageUrl: url })}
                    />

                    {editingId ? (
                        <Button
                            onClick={() => handleUpdate(editingId)}
                            className="w-full bg-green-600 hover:bg-green-700"
                            disabled={loading}
                        >
                            {loading ? "جاري التحديث..." : "تحديث"}
                        </Button>
                    ) : (
                        <Button
                            onClick={handleCreate}
                            className="w-full bg-blue-600 hover:bg-blue-700"
                            disabled={loading}
                        >
                            {loading ? "جاري الإضافة..." : "إضافة"}
                        </Button>
                    )}
                </CardContent>
            </Card>

            {/* قائمة الأنشطة */}
            <div className="space-y-4">
                {loading ? (
                    <p className="text-center text-gray-500">جاري تحميل الأنشطة...</p>
                ) : activities.length === 0 ? (
                    <p className="text-center text-gray-500">لا توجد أنشطة حالياً.</p>
                ) : (
                    activities.map((activity) => (
                        <Card key={activity.id} className="shadow-sm border rounded-xl">
                            {activity.imageUrl && (
                                <Image
                                    src={activity.imageUrl}
                                    alt="صورة النشاط"
                                    className="w-full h-40 object-cover rounded-md border mb-4"
                                    width={600}
                                    height={240}
                                    layout="responsive"
                                />
                            )}
                            <CardHeader>
                                <CardTitle className="text-right text-purple-800 font-semibold">
                                    {activity.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="text-right space-y-2 text-sm sm:text-base">
                                <p className="text-gray-700">{activity.description}</p>
                                <p className="text-sm text-gray-600">
                                    📅 التاريخ:{" "}
                                    {new Date(activity.date).toLocaleDateString("fr-FR", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                                <div className="flex gap-2 justify-end mt-3">
                                    <Button
                                        variant="outline"
                                        className="flex items-center gap-1"
                                        onClick={() => {
                                            setEditingId(activity.id);
                                            setNewActivity({
                                                title: activity.title,
                                                description: activity.description,
                                                date: new Date(activity.date)
                                                    .toISOString()
                                                    .split("T")[0],
                                                imageUrl: activity.imageUrl ?? "",
                                            });
                                        }}
                                    >
                                        <Pencil className="w-4 h-4" />
                                        تعديل
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        className="flex items-center gap-1"
                                        onClick={() => handleDelete(activity.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        حذف
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
