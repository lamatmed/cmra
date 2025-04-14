'use client';

import React, { useState, useEffect, useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthContext } from "@/components/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { getChoices, addChoice, deleteChoice } from "@/utils/actions";
import { useRouter } from "next/navigation";

const ConfigVotePage = () => {
    const { user } = useContext(AuthContext) ?? {};
    const { toast } = useToast();
    const router = useRouter();
    const [newChoice, setNewChoice] = useState("");
    const [choices, setChoices] = useState<{ id: string; label: string }[]>([]);

    useEffect(() => {
        const fetchChoices = async () => {
            const data = await getChoices();
            setChoices(data); // data doit être un tableau d'objets avec id et label
        };
        fetchChoices();
    }, []);

    const handleAddChoice = async () => {
        if (!newChoice.trim()) return;
        const result = await addChoice(newChoice.trim());
        if (result.success) {
            toast({ title: "نجاح", description: "تم إضافة الخيار بنجاح" });
            // Assurer que result.choice est valide (non undefined)
            if (result.choice) {
                setChoices((prev) => [...prev, result.choice]);
            }
            setNewChoice("");
        } else {
            toast({ title: "خطأ", description: result.message, variant: "destructive" });
        }
    };

    const handleDeleteChoice = async (choiceId: string) => {
        const result = await deleteChoice(choiceId);
        if (result.success) {
            toast({ title: "تم الحذف", description: "تم حذف الخيار" });
            setChoices((prev) => prev.filter((choice) => choice.id !== choiceId));
        } else {
            toast({ title: "خطأ", description: result.message, variant: "destructive" });
        }
    };

    if (!user || user.role !== "ADMIN") {
        return <p className="text-center text-gray-500">الوصول محجوز للمسؤولين فقط.</p>;
    }

    return (
        <div className="max-w-xl mx-auto p-6">
            <Card>
                <CardHeader>
                    <CardTitle>إعداد اختيارات التصويت</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                        <Input
                            value={newChoice}
                            onChange={(e) => setNewChoice(e.target.value)}
                            placeholder="أضف خيارًا "
                        />
                        <Button onClick={handleAddChoice}>إضافة</Button>
                    </div>

                    <div className="space-y-2 mt-4">
                        {choices.map((choice) => (
                            <div key={choice.id} className="flex justify-between items-center border p-2 rounded">
                                <span>{choice.label}</span>
                                <Button variant="destructive" onClick={() => handleDeleteChoice(choice.id)}>
                                    حذف
                                </Button>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center mt-6">
                        <Button onClick={() => router.push("/dashboard/es")}>عودة</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ConfigVotePage;
