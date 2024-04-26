import React from 'react';

type LeaderboardData = {
  name: string;
  points: number;
  achievements: string;
};

const Page = () => {
  const leaderboardData: LeaderboardData[] = [
    { name: 'Jane Smith', points: 120, achievements: 'level-3' },
    { name: 'Alice Johnson', points: 100, achievements: 'level-2' },
    { name: 'John Doe', points: 150, achievements: 'level-5' },
  ];

  leaderboardData.sort((a, b) => b.points - a.points);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <table className="table-auto w-full">
        <thead className="bg-blue-500 font-bold text-white">
          <tr>
            <td className="p-2">Position</td>
            <td className="p-2">Name</td>
            <td className="p-2">Points</td>
            <td className="p-2">Achievements</td>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((player, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-100 shadow-md' : ''}>
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{player.name}</td>
              <td className="p-2">{player.points}</td>
              <td className="p-2">{player.achievements}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
