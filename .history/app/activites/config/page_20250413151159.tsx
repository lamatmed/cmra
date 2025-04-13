"use client";

import { useEffect, useState } from "react";
import { getAllActivities, createActivity, updateActivity, deleteActivity } from "@/utils/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

type Activity = {
    id: string;
    title: string;
    description: string;
    date: string | Date;
};

export default function ManageActivitiesPage() {
      const { user } = useContext(AuthContext) ?? {};
      const router = useRouter();
      const [users, setUsers] = useState<any[]>([]);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [newActivity, setNewActivity] = useState({
        title: "",
        description: "",
        date: "",
    });
    const [editingId, setEditingId] = useState<string | null>(null);


     useEffect(() => {
        if (user?.role !== "ADMIN") {
          router.push("/dashboard");
        }
      }, [user?.role, router]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getAllActivities();
            setActivities(data);
        };
        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewActivity({ ...newActivity, [e.target.name]: e.target.value });
    };

    const handleCreate = async () => {
        if (!newActivity.title || !newActivity.date) return;
        await createActivity(newActivity);
        const updated = await getAllActivities();
        setActivities(updated);
        setNewActivity({ title: "", description: "", date: "" });
    };

    const handleUpdate = async (id: string) => {
        await updateActivity(id, newActivity);
        const updated = await getAllActivities();
        setActivities(updated);
        setEditingId(null);
        setNewActivity({ title: "", description: "", date: "" });
    };

    const handleDelete = async (id: string) => {
        await deleteActivity(id);
        const updated = await getAllActivities();
        setActivities(updated);
    };

    return (
        <div className="p-6 max-w-3xl mx-auto" dir="rtl">
            <h1 className="text-3xl font-bold mb-6 text-right">إدارة الأنشطة</h1>

            {/* Formulaire */}
            <Card className="mb-6">
                <CardHeader>
                    <CardTitle className="text-right">
                        {editingId ? "تعديل النشاط" : "إضافة نشاط جديد"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input
                        name="title"
                        placeholder="العنوان"
                        value={newActivity.title}
                        onChange={handleChange}
                    />
                    <Textarea
                        name="description"
                        placeholder="الوصف"
                        value={newActivity.description}
                        onChange={handleChange}
                    />
                    <Input
                        name="date"
                        type="date"
                        value={newActivity.date}
                        onChange={handleChange}
                    />
                    {editingId ? (
                        <Button onClick={() => handleUpdate(editingId)}>تحديث</Button>
                    ) : (
                        <Button onClick={handleCreate}>إضافة</Button>
                    )}
                </CardContent>
            </Card>

            {/* Liste des activités */}
            <div className="space-y-4">
                {activities.length === 0 ? (
                    <p className="text-center text-gray-500">لا توجد أنشطة حاليا.</p>
                ) : (
                    activities.map((activity) => (
                        <Card key={activity.id} className="shadow-sm border">
                            <CardHeader>
                                <CardTitle className="text-right">{activity.title}</CardTitle>
                            </CardHeader>
                            <CardContent className="text-right space-y-2">
                                <p>{activity.description}</p>
                                <p className="text-sm text-gray-600">
                                    التاريخ:{" "}
                                    {new Date(activity.date).toLocaleDateString("fr-FR", {
                                        weekday: "long",
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </p>
                                <div className="flex gap-2 justify-end mt-2">
                                    <Button variant="secondary" onClick={() => {
                                        setEditingId(activity.id);
                                        setNewActivity({
                                            title: activity.title,
                                            description: activity.description,
                                            date: new Date(activity.date).toISOString().split("T")[0],
                                        });
                                    }}>
                                        تعديل
                                    </Button>
                                    <Button variant="destructive" onClick={() => handleDelete(activity.id)}>
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
