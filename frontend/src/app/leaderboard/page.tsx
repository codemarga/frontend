"use client";

import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Badge } from "@/components/ui/badge";
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
  rank: number;
  name: string;
  score: number;
  country: string;
  timestamp: string;
}

export default function LeaderboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"score" | "timestamp">("score");
  const [selectedUser, setSelectedUser] = useState<LeaderboardEntry | null>(null);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setLoading(true);
      try {
        const data = [
          { rank: 1, name: "Safal", score: 980, country: "Nepal", timestamp: "2024-12-13T09:30:00Z" },
          { rank: 2, name: "Aayush", score: 970, country: "Nepal", timestamp: "2024-12-13T11:15:00Z" },
          { rank: 3, name: "Awasthi", score: 960, country: "Nepal", timestamp: "2024-12-12T14:50:00Z" },
          { rank: 4, name: "Swarnim", score: 950, country: "Nepal", timestamp: "2024-12-13T16:20:00Z" },
          { rank: 5, name: "Alice Johnson", score: 940, country: "USA", timestamp: "2024-12-12T10:15:30Z" },
          { rank: 6, name: "Bob Smith", score: 900, country: "Canada", timestamp: "2024-12-10T14:20:10Z" },
          { rank: 7, name: "Carlos Vega", score: 870, country: "Spain", timestamp: "2024-12-11T08:50:22Z" },
          { rank: 8, name: "Diana Kim", score: 860, country: "South Korea", timestamp: "2024-12-09T12:35:50Z" },
          { rank: 9, name: "Ethan Wang", score: 830, country: "China", timestamp: "2024-12-12T15:40:00Z" },
        ];
        
        setLeaderboardData(data);
      } catch (error) {
        console.error("Failed to fetch leaderboard data:", error);
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
        entry.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSelectedUser(user || null);
    }
  }, [searchQuery, leaderboardData]);

  // Chart Data
  const topScorers = leaderboardData.slice(0, 5).map((entry) => entry.name);
  const topScores = leaderboardData.slice(0, 5).map((entry) => entry.score);
  const timestamps = leaderboardData.map((entry) =>
    new Date(entry.timestamp).toLocaleDateString()
  );
  const scores = leaderboardData.map((entry) => entry.score);

  // Selected User Data for Charts
  const userChartLabels = selectedUser ? [selectedUser.name] : topScorers;
  const userChartData = selectedUser ? [selectedUser.score] : topScores;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        <section className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>
          <p className="text-lg">See how you rank among the top coders in the contest!</p>
        </section>

        {/* Analytics Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Top Scorers Bar Chart */}
            <div className="bg-white shadow-md rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">
                {selectedUser ? `${selectedUser.name}'s Score` : "Top Scorers"}
              </h3>
              <Bar
                data={{
                  labels: userChartLabels,
                  datasets: [
                    {
                      label: "Scores",
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
              <h3 className="text-lg font-semibold mb-2">
                {selectedUser ? `${selectedUser.name}'s Activity` : "Activity Over Time"}
              </h3>
              <Line
                data={{
                  labels: timestamps,
                  datasets: [
                    {
                      label: "Scores",
                      data: scores,
                      borderColor: "#2196F3",
                      fill: false,
                    },
                  ],
                }}
                options={{ responsive: true }}
              />
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search by name"
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
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-600">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-600">Country</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-600">Score</th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-gray-600">Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboardData.map((entry, index) => (
                    <tr key={entry.rank || index} className="border-b last:border-none">
                      <td className="px-6 py-4">
                        <Badge className="mr-2">{`#${entry.rank}`}</Badge>
                      </td>
                      <td className="px-6 py-4 font-semibold">{entry.name}</td>
                      <td className="px-6 py-4">{entry.country}</td>
                      <td className="px-6 py-4 font-bold">{entry.score}</td>
                      <td className="px-6 py-4">{new Date(entry.timestamp).toLocaleString()}</td>
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
