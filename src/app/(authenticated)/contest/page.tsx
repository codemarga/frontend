"use client";

import axios from "axios";

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

import ContestCard from "./ContestCard";
import ContestDescription from "./ContestDescription";

const ContestPage = () => {
  const [selectedContest, setSelectedContest] = useState<any>(null);
  const [upcomingContests, setUpcomingContests] = useState<any[]>([]);

  useEffect(() => {
    const fetchcontests = async () => {
      const response = await axios.get(process.env.NEXT_PUBLIC_CONTESTS_URL!);
      console.log(JSON.stringify(response.data));
      setUpcomingContests(response.data.contests);
    };
    fetchcontests();
  }, []);

  const fetech_contest_detail = async (contest_id: string) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_CONTESTDETAIL_URL}?contest_id=${contest_id}`
    );
    console.log(JSON.stringify(response.data));
    setSelectedContest(response.data);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6">
      <div className="max-w-6xl mx-auto">
        {selectedContest ? (
          <>
            <button
              className="flex items-center text-gray-600 hover:text-gray-800 mb-6"
              onClick={() => setSelectedContest(null)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Contests
            </button>
            <ContestDescription contest={selectedContest} />
          </>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <h1 className="text-2xl font-bold text-gray-800">
                Upcoming Contests
              </h1>
              {upcomingContests.map((contest, index) => (
                <ContestCard
                  key={index}
                  {...contest}
                  isUpcoming={true}
                  onClick={() => fetech_contest_detail(contest.id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestPage;
