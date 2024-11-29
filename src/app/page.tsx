import { FaBell, FaArrowDown, FaFire, FaPrescription } from 'react-icons/fa';

export default function Component() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="flex items-center space-x-6 text-lg">
          <span className="text-2xl font-bold text-blue-500">G</span>
          <a href="#" className="hover:text-gray-600">Explore</a>
          <a href="#" className="font-semibold text-blue-500">Problems</a>
          <a href="#" className="hover:text-gray-600">Contest</a>
          <a href="#" className="hover:text-gray-600">Discuss</a>
          <a href="#" className="hover:text-gray-600">Interview</a>
          <a href="#" className="hover:text-gray-600">Store</a>
        </div>
        <div className="flex items-center space-x-6">
          <FaBell className="h-5 w-5 text-gray-600 cursor-pointer hover:text-blue-500" />
          <FaFire className="h-5 w-5 text-red-500 animate-pulse" />
          <span className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700">Premium</span>
        </div>
      </nav>

      {/* Main Content */}
      <main className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-400 rounded-lg shadow-md p-4 text-white">
            <div className="text-lg font-semibold">LeetCodes Interview Crash Course:</div>
            <p className="mt-2">System Design for Interviews and Beyond</p>
            <button className="mt-4 bg-white text-blue-500 font-semibold px-4 py-2 rounded-md hover:bg-gray-100">
              Start Learning
            </button>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-400 rounded-lg shadow-md p-4 text-white">
            <div className="text-lg font-semibold">LeetCodes Interview Crash Course:</div>
            <p className="mt-2">Data Structures and Algorithms</p>
            <button className="mt-4 bg-white text-green-500 font-semibold px-4 py-2 rounded-md hover:bg-gray-100">
              Start Learning
            </button>
          </div>
          <div className="bg-gradient-to-br from-indigo-500 to-indigo-400 rounded-lg shadow-md p-4 text-white">
            <div className="text-lg font-semibold">Top Interview Questions</div>
            <button className="mt-4 bg-white text-indigo-500 font-semibold px-4 py-2 rounded-md hover:bg-gray-100">
              Get Started
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Study Plan</h2>
          <a href="#" className="text-blue-500 hover:underline">See all</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <span className="bg-blue-100 text-blue-600 p-2 rounded mr-2">TOP</span>
              <div className="text-lg font-semibold">Top Interview 150</div>
            </div>
            <p className="text-gray-600">Must-do List for Interview Prep</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <span className="bg-blue-200 text-blue-700 p-2 rounded mr-2">LC</span>
              <div className="text-lg font-semibold">LeetCode 75</div>
            </div>
            <p className="text-gray-600">Ace Coding Interview with 75 Qs</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex items-center mb-2">
              <span className="bg-blue-300 text-blue-800 p-2 rounded mr-2">SQL</span>
              <div className="text-lg font-semibold">SQL 50</div>
            </div>
            <p className="text-gray-600">Crack SQL Interview in 50 Qs</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {['Array', 'String', 'Hash Table', 'Dynamic Programming', 'Math', 'Sorting', 'Greedy'].map((topic, index) => (
            <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700 hover:bg-gray-300">
              {topic} <span className="text-gray-500 ml-1">{Math.floor(Math.random() * 1000)}</span>
            </span>
          ))}
          <button className="bg-gray-200 px-3 py-1 rounded-full flex items-center text-sm text-gray-700 hover:bg-gray-300">
            Expand <FaArrowDown className="h-4 w-4 ml-1" />
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          {['All Topics', 'Algorithms', 'Database', 'Shell', 'Concurrency', 'JavaScript'].map((topic, index) => (
            <button key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm text-gray-700 hover:bg-gray-300">
              {topic}
            </button>
          ))}
        </div>

        <div className="flex space-x-4 items-center">
          {['Lists', 'Difficulty', 'Status', 'Tags'].map((filter, index) => (
            <button key={index} className="bg-gray-200 px-3 py-1 rounded-full flex items-center text-sm text-gray-700 hover:bg-gray-300">
              {filter} <FaArrowDown className="h-4 w-4 ml-1" />
            </button>
          ))}
          <input className="flex-grow bg-gray-200 px-3 py-2 rounded-full text-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Search questions" />
          <button className="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-400">
            <FaPrescription className="h-5 w-5" />
          </button>
          <button className="bg-blue-400 px-4 py-2 rounded-full text-white font-semibold hover:bg-blue-300">Pick One</button>
        </div>
      </main>
    </div>
  );
}
