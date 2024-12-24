// leaderboardSort.ts

type LeaderboardEntry = {
  name: string;
  score: number;
  timestamp: string;
};

const merge = (left: LeaderboardEntry[], right: LeaderboardEntry[]): LeaderboardEntry[] => {
  const result: LeaderboardEntry[] = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    if (left[i].score > right[j].score) {
      result.push(left[i]);
      i++;
    } else if (left[i].score === right[j].score) {
      if (left[i].timestamp < right[j].timestamp) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    } else {
      result.push(right[j]);
      j++;
    }
  }

  return [...result, ...left.slice(i), ...right.slice(j)];
};

const mergeSort = (data: LeaderboardEntry[]): LeaderboardEntry[] => {
  if (data.length <= 1) return data;

  const mid = Math.floor(data.length / 2);
  const left = mergeSort(data.slice(0, mid));
  const right = mergeSort(data.slice(mid));

  return merge(left, right);
};

// Rank assignment function
const assignRanks = (sortedData: LeaderboardEntry[]): LeaderboardEntry[] => {
  let currentRank = 1;
  let previous = sortedData[0];
  const rankedData = sortedData.map((entry, index) => {
    if (index > 0 && (entry.score !== previous.score || entry.timestamp !== previous.timestamp)) {
      currentRank = index + 1;
    }
    previous = entry;
    return { ...entry, rank: currentRank };
  });
  return rankedData;
};

export { mergeSort, assignRanks };
