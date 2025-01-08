"use client";

import React from "react";
import { Clock } from "lucide-react";

interface ContestCardProps {
  name: string;
  time_until_start: string;
  type: string;
  isUpcoming?: boolean;
  onClick: () => void;
}

const ContestCard = ({
  name,
  time_until_start,
  type,
  isUpcoming = false,
  onClick,
}: ContestCardProps) => (
  <div
    className="bg-white rounded-lg overflow-hidden shadow-md mb-4 border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
    onClick={onClick}
  >
    <div
      className={`p-4 ${type === "weekly" ? "bg-blue-100" : "bg-emerald-100"}`}
    >
      <div className="flex items-center space-x-2">
        <Clock className="w-4 h-4 text-gray-700" />
        <span className="text-gray-700 text-sm">
          {isUpcoming ? `Starts in ${time_until_start}` : time_until_start}
        </span>
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-gray-800 text-lg font-medium">{name}</h3>
    </div>
  </div>
);

export default ContestCard;
