'use client'

import React, { useState, useContext, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { AuthContext } from "@/components/AuthContext";
import { castVote, getVoteResults, getChoices } from "@/utils/actions";
import { useRouter } from "next/navigation";
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const VotePage = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext) ?? {};
  const { toast } = useToast();
  const [selectedVote, setSelectedVote] = useState("");
  const [results, setResults] = useState({
    totalVotes: 0,
    choices: [] as { label: string; votes: number; percentage: number }[],
  });

  useEffect(() => {
    const fetchData = async () => {
      const choices = await getChoices();
      const result = await getVoteResults();

      const updatedChoices = choices.map((choice: any) => {
        const choiceVotes = result.choices.find((res: any) => res.label === choice.label)?.votes || 0;
        const percentage = result.totalVotes > 0 ? (choiceVotes / result.totalVotes) * 100 : 0;

        return {
          label: choice.label,
          votes: choiceVotes,
          percentage: parseFloat(percentage.toFixed(2)),
        };
      });

      setResults({
        totalVotes: result.totalVotes,
        choices: updatedChoices,
      });
    };

    fetchData();
  }, []);

  if (!user) {
    return (
      <p className="text-center text-gray-500" dir="rtl">
        هذا القسم مخصص للمستخدمين المسجلين فقط.
      </p>
    );
  }

  const handleVote = async (choice: string) => {
    setSelectedVote(choice);

    const result = await castVote(user.id, choice);

    if (result.success) {
      toast({ title: "تم التصويت", description: `لقد قمت بالتصويت لـ ${choice}.` });
      const updatedResults = await getVoteResults();
      setResults(updatedResults);
    } else {
      toast({
        title: "خطأ",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 text-center" dir="rtl">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">صوّت لمرشحك المفضل</h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="shadow-lg rounded-xl border border-gray-200 p-4">
          <CardHeader>
            <CardTitle className="text-xl text-right">اختر مرشحك:</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {results.choices.length === 0 ? (
              <p>لا توجد خيارات متاحة حالياً.</p>
            ) : (
              results.choices.map((choice) => (
                <Button
                  key={choice.label}
                  onClick={() => handleVote(choice.label)}
                  className={`w-full py-2 rounded text-lg ${selectedVote === choice.label
                    ? "bg-blue-600 text-white"
                    : "bg-gray-500 text-white"
                    }`}
                >
                  {choice.label}
                </Button>
              ))
            )}
          </CardContent>
        </Card>

        {/* Résultats des votes */}
        <Card className="mt-6 shadow-md border border-gray-200 p-4">
          <CardHeader>
            <CardTitle className="text-xl text-right">نتائج التصويت</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-6">
              {results.choices.map((choice) => (
                <div key={choice.label} className="bg-blue-50 p-4 rounded-lg shadow-lg transition duration-300 ease-in-out hover:scale-105">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="text-xl font-semibold text-blue-700">
                        {choice.label}
                      </div>
                      {choice.votes > 0 ? (
                        <FiCheckCircle className="text-green-500" />
                      ) : (
                        <FiXCircle className="text-red-500" />
                      )}
                    </div>
                    <div className="text-lg text-blue-500">
                      {choice.votes} صوت ({choice.percentage}%)
                    </div>
                  </div>
                  <div className="w-full h-2 bg-blue-300 rounded-full mt-2">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${choice.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}

              <div className="text-lg font-medium text-gray-800 mt-4 text-right">
                <strong>إجمالي الأصوات:</strong> {results.totalVotes}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default VotePage;
