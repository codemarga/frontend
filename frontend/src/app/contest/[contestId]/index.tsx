"use client";

import { FaTrophy } from "react-icons/fa";
import Link from "next/link";
import "./page.css";
import React, { useEffect, useState } from "react";

interface Contest {
  title: string;
  date: string;
  status: string;
}

interface Ranking {
  name: string;
  country: string;
  rating: number;
  attended: number;
}

const Contests = () => {
  const [featuredContests, setFeaturedContests] = useState<Contest[]>([]);
  const [pastContests, setPastContests] = useState<string[]>([]);
  const [globalRankings, setGlobalRankings] = useState<Ranking[]>([]);

  const handleContestList = async () => {
    try {
      const featuredResponse = [
        {
          title: "Weekly Contest 429",
          date: "Dec 22, 2024 8:15 AM GMT+5:45",
          status: "Register Now",
        },
        {
          title: "Biweekly Contest 146",
          date: "Dec 28, 2024 8:15 PM GMT+5:45",
          status: "Upcoming",
        },
        {
          title: "Weekly Contest 430",
          date: "Jan 5, 2025 8:15 AM GMT+5:45",
          status: "Upcoming",
        },
      ];

      const pastResponse = [
        "Weekly Contest 428",
        "Weekly Contest 427",
        "Biweekly Contest 145",
        "Weekly Contest 426",
        "Weekly Contest 425",
        "Biweekly Contest 144",
        "Weekly Contest 424",
      ];

      const rankingResponse = [
        { name: "Neal Wu", country: "US", rating: 3686, attended: 51 },
        { name: "灵茶山艾府", country: "CN", rating: 3645, attended: 239 },
        { name: "Joshua Chen", country: "AU", rating: 3642, attended: 98 },
        { name: "何弦", country: "CN", rating: 3578, attended: 143 },
        { name: "小羊肖恩", country: "CN", rating: 3576, attended: 103 },
      ];

      setFeaturedContests(featuredResponse);
      setPastContests(pastResponse);
      setGlobalRankings(rankingResponse);
    } catch (error) {
      console.error("Failed to fetch contest data:", error);
    }
  };

  useEffect(() => {
    handleContestList();
  }, []);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Featured Contests Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Featured Contests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredContests.map((contest, index) => (
            <Link
              key={index}
              href={`/contests/${generateSlug(contest.title)}`}
            >
              <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <h3 className="text-lg font-semibold mb-2">{contest.title}</h3>
                <p className="text-sm text-gray-500 mb-2">{contest.date}</p>
                <span className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                  {contest.status}
                </span>
                <button
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                  Go to Contest
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Past Contests Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Past Contests</h2>
        <div className="flex flex-col space-y-4">
          {pastContests.map((contest, index) => (
            <Link
              key={index}
              href={`/contests/${generateSlug(contest)}`}
            >
              <div className="flex justify-between items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <div>
                  <h3 className="text-lg font-semibold">{contest}</h3>
                  <p className="text-sm text-gray-500">
                    {index % 2 === 0
                      ? "Dec 15, 2024 8:15 AM GMT+5:45"
                      : "Dec 7, 2024 8:15 PM GMT+5:45"}
                  </p>
                </div>
                <button
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg"
                >
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Global Ranking Section */}
      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Global Ranking</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {globalRankings.map((user, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b last:border-b-0"
            >
              <div className="flex items-center space-x-4">
                <span className="text-lg font-bold">{index + 1}</span>
                <h3 className="text-md font-medium">{user.name}</h3>
                <span className="text-sm text-gray-500">{user.country}</span>
              </div>
              <div className="text-right">
                <p className="text-md font-semibold text-gray-800">
                  Rating: {user.rating}
                </p>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  onClick={() =>
                    alert(`${user.name}'s Profile`)
                  }
                >
                  See Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contests;