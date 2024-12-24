"use client";

import { useState, useEffect } from "react";

interface Group {
  id: number;
  name: string;
  members: string[];
  description: string;
}

export default function GroupsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch groups data
  useEffect(() => {
    const fetchGroupsData = async () => {
      setLoading(true);
      try {
        const data = [
          {
            id: 1,
            name: "Code Warriors",
            members: ["Alice", "Bob", "Carlos", "Diana"],
            description: "A group of enthusiastic coders!",
          },
          {
            id: 2,
            name: "Bug Busters",
            members: ["Ethan", "Fiona", "George", "Hannah"],
            description: "Fixing bugs and building dreams.",
          },
          {
            id: 3,
            name: "Dev Ninjas",
            members: ["Igor", "Jack", "Kathy", "Liam"],
            description: "Stealthy developers crafting great apps.",
          },
          {
            id: 4,
            name: "Tech Titans",
            members: ["Mia", "Nina", "Oscar", "Paul"],
            description: "Innovators leading the way.",
          },
        ];
        setGroups(data);
      } catch (error) {
        console.error("Failed to fetch groups data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupsData();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground groups-container">
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <section className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Groups</h1>
          <p className="text-lg mb-4">Join a group and collaborate with fellow coders!</p>
          <button className="create-group-button">Create New Group</button>
        </section>

        {/* Groups Grid */}
        <section>
          {loading ? (
            <p className="text-center p-6 text-gray-500">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {groups.map((group) => (
                <div
                  key={group.id}
                  className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h2 className="text-xl font-semibold mb-2 text-purple-600">
                    {group.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{group.description}</p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-gray-700">Members:</span>{" "}
                    {group.members.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
