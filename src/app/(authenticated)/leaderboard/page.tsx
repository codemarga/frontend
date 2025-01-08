"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface LeaderboardEntry {
  username: string;
  points: number;
}

interface ActivityData {
  [date: string]: number;
}

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<LeaderboardEntry | null>(null);
  const [activityData, setActivityData] = useState<ActivityData>({});

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setLoading(true);
      try {
        const response1 = await axios.get(process.env.NEXT_PUBLIC_API_URL + "leaderboard/");
        setLeaderboardData(response1.data);

        const response2 = await axios.get(process.env.NEXT_PUBLIC_API_URL + "problems-solved-per-day/");
        setActivityData(response2.data);
        
      } catch (error) {
        console.error("Failed to fetch leaderboard or activity data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboardData();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSelectedUser(null);
    } else {
      const user = leaderboardData.find((entry) =>
        entry.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSelectedUser(user || null);
    }
  }, [searchQuery, leaderboardData]);

  // Chart Data
  const userChartLabels = selectedUser ? [selectedUser.username] : leaderboardData.map((entry) => entry.username);
  const userChartData = selectedUser ? [selectedUser.points] : leaderboardData.map((entry) => entry.points);

  // Activity Over Time Chart Data
  const activityDates = Object.keys(activityData).sort();
  const activityValues = activityDates.map((date) => activityData[date]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-4">
        <section className="text-center ">
          <h1 className="text-3xl font-bold ">Leaderboard</h1>
          <p className="text-lg">See how you rank among the top scorers!</p>
        </section>

        {/* Analytics Section */}
        <section className="mb-8 ">
          <h2 className="text-2xl font-bold mb-4">Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scores Bar Chart */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">
                {selectedUser ? `${selectedUser.username}'s Points` : "Leaderboard Points"}
              </h3>
              <Bar
                data={{
                  labels: userChartLabels,
                  datasets: [
                    {
                      label: "Points",
                      data: userChartData,
                      backgroundColor: "#4CAF50",
                    },
                  ],
                }}
                options={{ responsive: true }}
              />
            </div>

            {/* Activity Over Time Line Chart */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Activity Over Time</h3>
              <Line
                data={{
                  labels: activityDates,
                  datasets: [
                    {
                      label: "Problems Solved",
                      data: activityValues,
                      borderColor: "#2196F3",
                      fill: false,
                    },
                  ],
                }}
                options={{
                  responsive: true,
                  scales: {
                    x: { title: { display: true, text: "Date" } },
                    y: { title: { display: true, text: "Problems Solved" } },
                  },
                }}
              />
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search by username"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <FaSearch className="absolute right-3 top-3 text-gray-500" />
          </div>
        </section>

        {/* Leaderboard Table */}
        <section>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            {loading ? (
              <p className="text-center p-6 text-gray-500">Loading...</p>
            ) : (
              <table className="w-full table-auto">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-600">Rank</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-600">Username</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-600">Points</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((entry, index) => (
                    <tr key={index} className="border-b last:border-none">
                      <td className="px-6 py-4">{`#${index + 1}`}</td>
                      <td className="px-6 py-4 font-semibold">{entry.username}</td>
                      <td className="px-6 py-4 font-bold">{entry.points}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
