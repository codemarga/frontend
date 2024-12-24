'use client';

import React from 'react';
import { Clock } from 'lucide-react';

interface ContestCardProps {
  title: string;
  startTime: string;
  type: string;
  isUpcoming?: boolean;
  onClick: () => void;
}

const ContestCard = ({ title, startTime, type, isUpcoming = false, onClick }: ContestCardProps) => (
  <div 
    className="bg-white rounded-lg overflow-hidden shadow-md mb-4 border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
    onClick={onClick}
  >
    <div className={`p-4 ${type === 'weekly' ? 'bg-blue-100' : 'bg-emerald-100'}`}>
      <div className="flex items-center space-x-2">
        <Clock className="w-4 h-4 text-gray-700" />
        <span className="text-gray-700 text-sm">
          {isUpcoming ? `Starts in ${startTime}` : startTime}
        </span>
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-gray-800 text-lg font-medium">{title}</h3>
    </div>
  </div>
);

export default ContestCard;
