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
    className="bg-card text-card-foreground rounded-xl overflow-hidden shadow-sm mb-4 border border-border cursor-pointer hover:shadow-md hover:border-indigo-500/40 transition-all group"
    onClick={onClick}
  >
    <div
      className={`p-4 border-b ${
        type === "weekly"
          ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border-blue-100 dark:border-blue-900/40"
          : "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-100 dark:border-emerald-900/40"
      }`}
    >
      <div className="flex items-center space-x-2 text-sm font-medium">
        <Clock className="w-4 h-4 text-current" />
        <span>
          {isUpcoming ? `Starts in ${time_until_start}` : time_until_start}
        </span>
      </div>
    </div>
    <div className="p-5">
      <h3 className="text-foreground text-lg font-semibold group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {name}
      </h3>
    </div>
  </div>
);

export default ContestCard;
