'use client';

import React, { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Role } from "@prisma/client";
import { deleteUser, getAllUsers, updateUser } from "@/utils/actions";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/AuthContext";
import { FiPhone, FiBriefcase } from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2"; // Import SweetAlert2
import Loader from "@/components/Loader";

const UsersPage = () => {
  const { user } = useContext(AuthContext) ?? {};
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role !== "ADMIN") {
      router.push("/dashboard");
    }
  }, [user?.role, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersList = await getAllUsers();
        setUsers(usersList);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        toast({ title: "خطأ", description: "تعذر استرجاع المستخدمين.", variant: "destructive" });
      }
    };
    fetchUsers();
  }, [toast]);

  if (loading) {
    return <Loader />; // عرض محمل أثناء تحميل البيانات
  }

  const handleEditUser = async (userId: string, updatedData: any) => {
    try {
      await updateUser(userId, updatedData);
      setUsers((prevUsers) => prevUsers.map((user) => (user.id === userId ? { ...user, ...updatedData } : user)));
      toast({ title: "تم تعديل المستخدم", description: "تم تحديث المعلومات بنجاح" });
    } catch (error) {
      toast({ title: "خطأ", description: "تعذر تعديل هذا المستخدم", variant: "destructive" });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    Swal.fire({
      title: 'هل أنت متأكد؟',
      text: "هذه العملية غير قابلة للتراجع",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'نعم، احذف!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteUser(userId);
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
          Swal.fire('تم الحذف!', 'تم حذف المستخدم', 'success');
        } catch (error) {
          Swal.fire('خطأ', "تعذر حذف آخر مسؤول.", 'error');
        }
      }
    });
  };

  const filteredUsers = users.filter((user) => user.nni.includes(search));

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("قائمة أعضاء الاتحاد المنتهية عضويتهم", 14, 20);
    const today = new Date();
    const dateStr = today.toLocaleDateString("ar-EG", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    doc.setFontSize(10);
    doc.text(`تاريخ الإنشاء: ${dateStr}`, 14, 28);
    const startY = 35;
    const tableData = users.map((user, index) => [
      index + 1,
      user.name,
      user.nni,
      user.job,
    ]);
    autoTable(doc, {
      startY,
      head: [["#", "الاسم", "الهاتف", "المهنة"]],
      body: tableData,
    });
    doc.save("اعضاء_الاتحاد_المنتهية_عضويتهم.pdf");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center text-white">إدارة المستخدمين</h1>
      <Button className="mb-4" onClick={() => generatePDF()} color="indigo">تصدير إلى PDF</Button>
      <input
        type="text"
        className="border p-2 rounded w-full mb-4 text-black"
        placeholder="رقم الهاتف"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <h2 className="text-lg font-semibold mb-2 text-white">إجمالي عدد المستخدمين: {filteredUsers.length}</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {currentUsers.length > 0 ? (
          currentUsers.map((user) => (
            <motion.div key={user.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="shadow-md hover:shadow-lg">
                <CardHeader>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription className="text-blue-500">
                    <select
                      className="border p-2 rounded w-full"
                      defaultValue={user.role}
                      onChange={(e) => handleEditUser(user.id, { role: e.target.value as Role })}
                    >
                      <option value="USER">مستخدم</option>
                      <option value="ADMIN">مسؤول</option>
                    </select>
                  </CardDescription>
                  <CardDescription className="flex items-center space-x-2">
                    <FiPhone className="w-5 h-5 text-gray-400" />
                    <span>{user.nni}</span>
                  </CardDescription>
                  <CardDescription className="flex items-center space-x-2">
                    <FiBriefcase className="w-5 h-5 text-gray-400" />
                    <span>{user.job}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    <Button variant="destructive" onClick={() => handleDeleteUser(user.id)} color="red">حذف</Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500">لا يوجد مستخدمين.</p>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>السابق</Button>
        <span className="mx-4 text-white">الصفحة {currentPage}</span>
        <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage * usersPerPage >= filteredUsers.length}>التالي</Button>
      </div>
    </div>
  );
};

export default UsersPage;
