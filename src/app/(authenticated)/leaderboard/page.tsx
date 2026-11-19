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
import { useTheme } from "@/components/theme-provider";

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
  const { theme } = useTheme();
  const isDark = theme === "dark";

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

  // Chart Theme Options
  const chartTextColor = isDark ? "#a1a1aa" : "#71717a";
  const chartGridColor = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)";
  const chartTitleColor = isDark ? "#f4f4f5" : "#18181b";

  const barChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: chartTextColor,
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: isDark ? "#18181b" : "#ffffff",
        titleColor: chartTitleColor,
        bodyColor: chartTextColor,
        borderColor: isDark ? "#27272a" : "#e4e4e7",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: { color: chartTextColor },
        grid: { color: chartGridColor },
      },
      y: {
        ticks: { color: chartTextColor },
        grid: { color: chartGridColor },
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: chartTextColor,
          font: { size: 12 },
        },
      },
      tooltip: {
        backgroundColor: isDark ? "#18181b" : "#ffffff",
        titleColor: chartTitleColor,
        bodyColor: chartTextColor,
        borderColor: isDark ? "#27272a" : "#e4e4e7",
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        title: { display: true, text: "Date", color: chartTextColor },
        ticks: { color: chartTextColor },
        grid: { color: chartGridColor },
      },
      y: {
        title: { display: true, text: "Problems Solved", color: chartTextColor },
        ticks: { color: chartTextColor },
        grid: { color: chartGridColor },
      },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <section className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Leaderboard</h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            See how you rank among the top scorers!
          </p>
        </section>

        {/* Analytics Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4 text-foreground">Analytics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Scores Bar Chart */}
            <div className="bg-card text-card-foreground shadow-sm rounded-xl p-5 border border-border">
              <h3 className="text-base font-semibold mb-3 text-foreground">
                {selectedUser ? `${selectedUser.username}'s Points` : "Leaderboard Points"}
              </h3>
              <Bar
                data={{
                  labels: userChartLabels,
                  datasets: [
                    {
                      label: "Points",
                      data: userChartData,
                      backgroundColor: "#10b981",
                      borderRadius: 4,
                    },
                  ],
                }}
                options={barChartOptions}
              />
            </div>

            {/* Activity Over Time Line Chart */}
            <div className="bg-card text-card-foreground shadow-sm rounded-xl p-5 border border-border">
              <h3 className="text-base font-semibold mb-3 text-foreground">Activity Over Time</h3>
              <Line
                data={{
                  labels: activityDates,
                  datasets: [
                    {
                      label: "Problems Solved",
                      data: activityValues,
                      borderColor: "#6366f1",
                      backgroundColor: "rgba(99, 102, 241, 0.1)",
                      fill: true,
                      tension: 0.3,
                    },
                  ],
                }}
                options={lineChartOptions}
              />
            </div>
          </div>
        </section>

        {/* Search Bar */}
        <section className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search by username..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 rounded-full border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-sm"
            />
            <FaSearch className="absolute right-3.5 top-3.5 text-muted-foreground pointer-events-none" />
          </div>
        </section>

        {/* Leaderboard Table */}
        <section>
          <div className="bg-card shadow-sm rounded-xl overflow-hidden border border-border">
            {loading ? (
              <p className="text-center p-8 text-muted-foreground">Loading leaderboard...</p>
            ) : (
              <table className="w-full table-auto">
                <thead className="bg-muted/50 border-b border-border">
                  <tr>
                    <th className="px-6 py-3.5 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Rank</th>
                    <th className="px-6 py-3.5 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Username</th>
                    <th className="px-6 py-3.5 text-left text-xs font-bold text-muted-foreground uppercase tracking-wider">Points</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {leaderboardData.length > 0 ? (
                    leaderboardData.map((entry, index) => (
                      <tr
                        key={index}
                        className={`hover:bg-muted/40 transition-colors ${
                          selectedUser?.username === entry.username ? "bg-indigo-500/10 font-semibold" : ""
                        }`}
                      >
                        <td className="px-6 py-4 text-sm font-mono text-muted-foreground">
                          {index === 0 ? "🥇 #1" : index === 1 ? "🥈 #2" : index === 2 ? "🥉 #3" : `#${index + 1}`}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-foreground">{entry.username}</td>
                        <td className="px-6 py-4 text-sm font-bold text-emerald-600 dark:text-emerald-400">{entry.points}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={3} className="px-6 py-8 text-center text-sm text-muted-foreground">
                        No leaderboard entries found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
