"use client";

import axios from "axios";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Trophy } from "lucide-react";

import ContestCard from "./ContestCard";
import ContestDescription from "./ContestDescription";

const ContestPage = () => {
  const [selectedContest, setSelectedContest] = useState<any>(null);
  const [upcomingContests, setUpcomingContests] = useState<any[]>([]);

  useEffect(() => {
    const fetchcontests = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_CONTESTS_URL!);
        setUpcomingContests(response.data?.contests || []);
      } catch (err) {
        console.error("Failed to fetch contests:", err);
      }
    };
    fetchcontests();
  }, []);

  const fetech_contest_detail = async (contest_id: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_CONTESTDETAIL_URL}?contest_id=${contest_id}`
      );
      setSelectedContest(response.data);
    } catch (err) {
      console.error("Failed to fetch contest detail:", err);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-6xl mx-auto">
        {selectedContest ? (
          <>
            <button
              className="flex items-center text-muted-foreground hover:text-foreground mb-6 transition-colors font-medium text-sm"
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
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-6 h-6 text-indigo-500" />
                <h1 className="text-2xl font-bold text-foreground">
                  Upcoming Contests
                </h1>
              </div>
              {upcomingContests.length > 0 ? (
                upcomingContests.map((contest, index) => (
                  <ContestCard
                    key={index}
                    {...contest}
                    isUpcoming={true}
                    onClick={() => fetech_contest_detail(contest.id)}
                  />
                ))
              ) : (
                <div className="p-8 text-center text-muted-foreground bg-card border border-border rounded-xl">
                  No upcoming contests scheduled at the moment.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestPage;
