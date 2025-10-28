import { FaUser, FaCode, FaLightbulb, FaHeart, FaBrain } from 'react-icons/fa';
import { BsBarChartFill, BsChatDotsFill } from 'react-icons/bs';
import { IoSparkles } from 'react-icons/io5';

function Profile() {
  // Mock data - this would come from your backend/AI analysis
  const userData = {
    name: "Alex Thompson",
    username: "@alexdev",
    email: "alex@example.com",
    avatar: null, // null will show icon
    joinedDate: "Jan 2024",
    totalPrompts: 1247,
    codeReviews: 89,
    personality: {
      type: "Analytical Problem Solver",
      traits: ["Detail-oriented", "Curious", "Systematic", "Creative"],
      description: "Prefers structured approaches with creative solutions"
    },
    interests: [
      { name: "React Development", confidence: 95 },
      { name: "Code Optimization", confidence: 88 },
      { name: "UI/UX Design", confidence: 76 },
      { name: "Backend APIs", confidence: 82 },
      { name: "Testing & QA", confidence: 71 }
    ],
    recentActivity: [
      { action: "Code review completed", time: "2 hours ago" },
      { action: "Settings updated", time: "1 day ago" },
      { action: "New code snippet added", time: "3 days ago" }
    ]
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-gray-100 p-3 sm:p-4 md:p-6">
      <div className="max-w-5xl mx-auto space-y-4 sm:space-y-5">
        {/* Header Section */}
        <div className="bg-zinc-900 rounded-xl p-4 sm:p-5 md:p-6 border-2 border-zinc-800">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5">
            {/* Avatar */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-orange-600 to-orange-500 rounded-full flex items-center justify-center text-3xl sm:text-4xl text-white flex-shrink-0 shadow-lg shadow-orange-600/30">
              <FaUser />
            </div>

            {/* User Info */}
            <div className="flex-1 text-center sm:text-left w-full">
              <h1 className="text-lg sm:text-xl font-bold mb-1">{userData.name}</h1>
              <p className="text-xs sm:text-sm text-zinc-400 mb-2">{userData.username}</p>
              <p className="text-xs text-zinc-500 mb-3">{userData.email}</p>
              
              {/* Stats */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 mt-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 rounded-lg border border-zinc-700">
                  <BsChatDotsFill className="text-orange-600 text-sm" />
                  <div className="text-left">
                    <p className="text-xs text-zinc-400">Total Prompts</p>
                    <p className="text-sm font-semibold">{userData.totalPrompts}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 rounded-lg border border-zinc-700">
                  <FaCode className="text-orange-600 text-sm" />
                  <div className="text-left">
                    <p className="text-xs text-zinc-400">Code Reviews</p>
                    <p className="text-sm font-semibold">{userData.codeReviews}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 rounded-lg border border-zinc-700">
                  <IoSparkles className="text-orange-600 text-sm" />
                  <div className="text-left">
                    <p className="text-xs text-zinc-400">Member Since</p>
                    <p className="text-sm font-semibold">{userData.joinedDate}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Button */}
            <button className="px-4 py-2 text-xs sm:text-sm bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors duration-200 font-medium">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
          {/* Left Column */}
          <div className="space-y-4 sm:space-y-5">
            {/* Personality Section */}
            <div className="bg-zinc-900 rounded-xl p-4 sm:p-5 border-2 border-zinc-800">
              <div className="flex items-center gap-2 mb-3">
                <FaBrain className="text-orange-600 text-base" />
                <h2 className="text-sm sm:text-base font-semibold">Personality Profile</h2>
                <span className="ml-auto text-xs px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded">AI Detected</span>
              </div>
              
              <div className="space-y-3">
                <div className="p-3 bg-zinc-800/50 rounded-lg border border-zinc-700">
                  <p className="text-xs text-zinc-400 mb-1">Type</p>
                  <p className="text-sm font-medium text-orange-600">{userData.personality.type}</p>
                </div>

                <div>
                  <p className="text-xs text-zinc-400 mb-2">Key Traits</p>
                  <div className="flex flex-wrap gap-1.5">
                    {userData.personality.traits.map((trait, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-zinc-800 border border-zinc-700 rounded-lg text-xs text-gray-100"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-gradient-to-br from-zinc-800/50 to-zinc-800/30 rounded-lg border border-zinc-700">
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {userData.personality.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-zinc-900 rounded-xl p-4 sm:p-5 border-2 border-zinc-800">
              <div className="flex items-center gap-2 mb-3">
                <BsBarChartFill className="text-orange-600 text-base" />
                <h2 className="text-sm sm:text-base font-semibold">Recent Activity</h2>
              </div>
              
              <div className="space-y-2.5">
                {userData.recentActivity.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 bg-zinc-800/50 rounded-lg border border-zinc-700/50 hover:border-orange-600/30 transition-colors"
                  >
                    <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-1.5 flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-100">{activity.action}</p>
                      <p className="text-xs text-zinc-500 mt-0.5">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4 sm:space-y-5">
            {/* Interests & Skills */}
            <div className="bg-zinc-900 rounded-xl p-4 sm:p-5 border-2 border-zinc-800">
              <div className="flex items-center gap-2 mb-3">
                <FaLightbulb className="text-orange-600 text-base" />
                <h2 className="text-sm sm:text-base font-semibold">Detected Interests</h2>
                <span className="ml-auto text-xs px-2 py-0.5 bg-zinc-800 text-zinc-400 rounded">AI Analyzed</span>
              </div>

              <div className="space-y-3">
                {userData.interests.map((interest, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-xs sm:text-sm text-gray-100">{interest.name}</span>
                      <span className="text-xs text-zinc-400">{interest.confidence}%</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-orange-600 to-orange-500 rounded-full transition-all duration-500"
                        style={{ width: `${interest.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 bg-zinc-800/30 rounded-lg border border-zinc-700/50">
                <p className="text-xs text-zinc-400 leading-relaxed">
                  <IoSparkles className="inline text-orange-600 mr-1" />
                  These interests are detected from your conversation patterns and code review history
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-zinc-900 rounded-xl p-4 sm:p-5 border-2 border-zinc-800">
              <h2 className="text-sm sm:text-base font-semibold mb-3">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-2.5">
                <button className="p-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-orange-600/50 rounded-lg transition-all duration-200 text-left">
                  <FaHeart className="text-orange-600 text-sm mb-1.5" />
                  <p className="text-xs font-medium">Saved Reviews</p>
                  <p className="text-xs text-zinc-500 mt-0.5">View all</p>
                </button>
                <button className="p-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-orange-600/50 rounded-lg transition-all duration-200 text-left">
                  <BsBarChartFill className="text-orange-600 text-sm mb-1.5" />
                  <p className="text-xs font-medium">Analytics</p>
                  <p className="text-xs text-zinc-500 mt-0.5">View stats</p>
                </button>
                <button className="p-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-orange-600/50 rounded-lg transition-all duration-200 text-left">
                  <FaCode className="text-orange-600 text-sm mb-1.5" />
                  <p className="text-xs font-medium">Code History</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Browse</p>
                </button>
                <button className="p-3 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 hover:border-orange-600/50 rounded-lg transition-all duration-200 text-left">
                  <IoSparkles className="text-orange-600 text-sm mb-1.5" />
                  <p className="text-xs font-medium">Preferences</p>
                  <p className="text-xs text-zinc-500 mt-0.5">Customize</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;