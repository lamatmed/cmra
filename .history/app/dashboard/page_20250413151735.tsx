"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ComputerIcon, Users } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/components/AuthContext";

import { FiClipboard } from "react-icons/fi";

export default function Home() {
  const { user } = useContext(AuthContext) ?? {};


  if (!user) return null;

  return (
    <main
      className="min-h-screen bg-gradient-to-b from-green-300 to-green-700 dark:from-gray-900 dark:to-gray-800 flex flex-col"
      dir="rtl"
    >
      <div className="container mx-auto px-4 py-12 flex-1">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            الجالية الموريتانية في انغولا
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            قم بإدارة مساحتك الخاصة بكفاءة.
          </p>
        </motion.div>

        {/* Grid Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {user?.role === "ADMIN" && (
            <>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-6 w-6 text-blue-500" />
                      المستخدمون
                    </CardTitle>
                    <CardDescription>إدارة المستخدمين</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link href="/dashboard/users">دخول</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FiClipboard className="h-6 w-6 text-green-500" />
                      الانتخابات
                    </CardTitle>
                    <CardDescription>إعداد التصويت والانتخابات</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link href="/dashboard/config-vote">دخول</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <NotebookPen />
                      <NotebookPen className="h-6 w-6 text-purple-500" />
                      الأنشطة
                    </CardTitle>
                    <CardDescription>إضافة وتعديل الأنشطة العامة</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link href="/activites/config">دخول</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>

            </>
          )}

          {/* Carte Espace Utilisateur */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ComputerIcon className="h-6 w-6" />
                  المساحة الخاصة بي
                </CardTitle>
                <CardDescription>إدارة مساحتي الشخصية</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href="/dashboard/espace-user">دخول</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
