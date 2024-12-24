"use client";

import { FaTrophy } from "react-icons/fa";
import Link from "next/link";
import "./page.css";
import axios from "axios";

import React, { useEffect, useState } from "react";

interface Contest {
  title: string;
  date: string;
  status: string;
}

const Contests = () => {
  const [featuredContests, setFeaturedContests] = useState<Contest[]>([]);
  const [pastContests, setPastContests] = useState<string[]>([]);

  // Function to fetch contests data
  const handleContestList = async () => {
    try {
      // Simulated backend response (Replace this with your actual API endpoint)
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

      // Set data to state
      setFeaturedContests(featuredResponse);
      setPastContests(pastResponse);
    } catch (error) {
      console.error("Failed to fetch contest data:", error);
    }
  };

  // Fetch contests on page load
  useEffect(() => {
    handleContestList();
  }, []);

  // Function to generate slug from contest title
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
                <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">
                  Virtual
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Contests;
