"use client";

import React from "react";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      setLoading(true);
      try {
        const data = [
          { rank: 1, name: "Alice Johnson", score: 950, country: "USA", timestamp: "2024-12-12T10:15:30Z" },
          { rank: 2, name: "Bob Smith", score: 900, country: "Canada", timestamp: "2024-12-10T14:20:10Z" },
          { rank: 3, name: "Carlos Vega", score: 870, country: "Spain", timestamp: "2024-12-11T08:50:22Z" },
          { rank: 4, name: "Diana Kim", score: 860, country: "South Korea", timestamp: "2024-12-09T12:35:50Z" },
          { rank: 5, name: "Ethan Wang", score: 830, country: "China", timestamp: "2024-12-12T15:40:00Z" },
          { rank: 6, name: "Fiona Lee", score: 800, country: "Australia", timestamp: "2024-12-11T18:25:10Z" },
          { rank: 7, name: "George Garcia", score: 770, country: "Mexico", timestamp: "2024-12-08T17:10:00Z" },
          { rank: 8, name: "Hannah Moore", score: 750, country: "UK", timestamp: "2024-12-07T11:00:00Z" },
          { rank: 9, name: "Igor Petrov", score: 720, country: "Russia", timestamp: "2024-12-06T19:55:30Z" },
          { rank: 10, name: "Jack Miller", score: 700, country: "Germany", timestamp: "2024-12-04T10:45:12Z" }
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

  // Analytics Data
  const topScorers = leaderboardData.slice(0, 5).map(entry => entry.name);
  const topScores = leaderboardData.slice(0, 5).map(entry => entry.score);
  const timestamps = leaderboardData.map(entry => new Date(entry.timestamp).toLocaleDateString());
  const scores = leaderboardData.map(entry => entry.score);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
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
              <h3 className="text-lg font-semibold mb-2">Top Scorers</h3>
              <Bar
                data={{
                  labels: topScorers,
                  datasets: [
                    {
                      label: "Scores",
                      data: topScores,
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

        {/* Search Bar and Sorting Options */}
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
          <select
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as "score" | "timestamp")}
          >
            <option value="score">Sort by Score</option>
            <option value="timestamp">Sort by Timestamp</option>
          </select>
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
