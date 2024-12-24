// src/leaderboardSort.ts

// Type for leaderboard entry
export type LeaderboardEntry = {
    name: string;
    score: number;
    timestamp: string;
    rank?: number;
  };
  
  // Merge function to merge two sorted arrays
  function merge(left: LeaderboardEntry[], right: LeaderboardEntry[]): LeaderboardEntry[] {
    let result: LeaderboardEntry[] = [];
    while (left.length && right.length) {
      if (left[0].score > right[0].score) {
        result.push(left.shift()!);  // Push the higher score (descending order)
      } else if (left[0].score === right[0].score) {
        // If scores are equal, compare timestamps (ascending order)
        if (left[0].timestamp < right[0].timestamp) {
          result.push(left.shift()!);
        } else {
          result.push(right.shift()!);
        }
      } else {
        result.push(right.shift()!);
      }
    }
    return result.concat(left, right);  // Merge the remaining elements
  }
  
  // MergeSort function to sort leaderboard entries
  export function mergeSort(participants: LeaderboardEntry[]): LeaderboardEntry[] {
    if (participants.length <= 1) {
      return participants;
    }
  
    const mid = Math.floor(participants.length / 2);
    const left = mergeSort(participants.slice(0, mid));
    const right = mergeSort(participants.slice(mid));
  
    return merge(left, right);  // Combine the sorted halves
  }
  
  // Function to assign ranks based on the sorted leaderboard
  export function assignRanks(sortedParticipants: LeaderboardEntry[]): LeaderboardEntry[] {
    let rank = 1;
    const rankedParticipants: LeaderboardEntry[] = [];
  
    for (let i = 0; i < sortedParticipants.length; i++) {
      if (i > 0 && (sortedParticipants[i].score !== sortedParticipants[i - 1].score || sortedParticipants[i].timestamp !== sortedParticipants[i - 1].timestamp)) {
        rank = i + 1;  // Increment rank if score or timestamp is different
      }
      rankedParticipants.push({ ...sortedParticipants[i], rank });  // Add rank to the entry
    }
  
    return rankedParticipants;
  }
  