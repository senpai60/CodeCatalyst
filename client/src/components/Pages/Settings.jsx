import { useState } from 'react';
import { FaUser, FaKey, FaBell, FaPalette, FaShieldAlt, FaCode } from 'react-icons/fa';
import { BsGearFill, BsToggleOn, BsToggleOff } from 'react-icons/bs';

function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    notifications: true,
    autoSave: false,
    darkMode: true,
    syntaxHighlight: true,
    lineNumbers: true,
    autoFormat: true,
  });

  const toggleSetting = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <FaUser /> },
    { id: 'api', label: 'API Keys', icon: <FaKey /> },
    { id: 'preferences', label: 'Preferences', icon: <BsGearFill /> },
    { id: 'appearance', label: 'Appearance', icon: <FaPalette /> },
    { id: 'security', label: 'Security', icon: <FaShieldAlt /> },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Settings <span className="text-orange-600">& Preferences</span>
          </h1>
          <p className="text-zinc-400 text-sm md:text-base">
            Manage your account and application preferences
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-zinc-800 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 group ${
                activeTab === tab.id
                  ? 'bg-orange-600 text-white'
                  : 'bg-zinc-900 text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-sm font-medium hidden sm:inline">{tab.label}</span>
              {activeTab !== tab.id && (
                <span className="absolute left-0 bottom-0 h-0 w-full bg-orange-600/20 rounded transition-all duration-300 group-hover:h-full -z-10" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-zinc-900 rounded-xl p-4 md:p-6 border-2 border-zinc-800">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-orange-600 mb-3">Profile Information</h2>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-2xl text-orange-600">
                  <FaUser />
                </div>
                <button className="px-3 py-2 text-sm bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors duration-200">
                  Change Avatar
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm bg-zinc-800 border-2 border-zinc-700 rounded-lg text-gray-100 focus:outline-none focus:border-orange-600 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 text-sm bg-zinc-800 border-2 border-zinc-700 rounded-lg text-gray-100 focus:outline-none focus:border-orange-600 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Username</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 text-sm bg-zinc-800 border-2 border-zinc-700 rounded-lg text-gray-100 focus:outline-none focus:border-orange-600 transition-colors"
                    placeholder="@johndoe"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">Role</label>
                  <select className="w-full px-3 py-2 text-sm bg-zinc-800 border-2 border-zinc-700 rounded-lg text-gray-100 focus:outline-none focus:border-orange-600 transition-colors">
                    <option>Developer</option>
                    <option>Designer</option>
                    <option>Student</option>
                  </select>
                </div>
              </div>

              <button className="w-full md:w-auto px-5 py-2 text-sm bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors duration-200 font-medium">
                Save Changes
              </button>
            </div>
          )}

          {/* API Keys Tab */}
          {activeTab === 'api' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-orange-600 mb-3">API Keys</h2>
              
              <div className="bg-zinc-800 rounded-lg p-3 border border-zinc-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-zinc-400">Production Key</span>
                  <button className="text-xs text-orange-600 hover:text-orange-500">Regenerate</button>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-2 py-1.5 bg-zinc-900 rounded text-xs text-gray-100 font-mono">
                    sk_prod_••••••••••••••••••••••••
                  </code>
                  <button className="px-2 py-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 rounded transition-colors">
                    Copy
                  </button>
                </div>
              </div>

              <div className="bg-zinc-800 rounded-lg p-3 border border-zinc-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-zinc-400">Development Key</span>
                  <button className="text-xs text-orange-600 hover:text-orange-500">Regenerate</button>
                </div>
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-2 py-1.5 bg-zinc-900 rounded text-xs text-gray-100 font-mono">
                    sk_dev_••••••••••••••••••••••••
                  </code>
                  <button className="px-2 py-1.5 text-xs bg-zinc-700 hover:bg-zinc-600 rounded transition-colors">
                    Copy
                  </button>
                </div>
              </div>

              <button className="px-5 py-2 text-sm bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors duration-200 font-medium">
                Generate New Key
              </button>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-orange-600 mb-3">Code Review Preferences</h2>
              
              <div className="space-y-3">
                {[
                  { key: 'notifications', label: 'Enable Notifications', description: 'Get notified when code review is complete' },
                  { key: 'autoSave', label: 'Auto-save Code Snippets', description: 'Automatically save your code snippets' },
                  { key: 'syntaxHighlight', label: 'Syntax Highlighting', description: 'Enable syntax highlighting for code' },
                  { key: 'lineNumbers', label: 'Show Line Numbers', description: 'Display line numbers in code blocks' },
                  { key: 'autoFormat', label: 'Auto Format Code', description: 'Automatically format pasted code' },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-3 bg-zinc-800 rounded-lg border border-zinc-700 hover:border-orange-600/50 transition-colors">
                    <div>
                      <h3 className="text-sm font-medium text-gray-100">{item.label}</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">{item.description}</p>
                    </div>
                    <button
                      onClick={() => toggleSetting(item.key)}
                      className="text-2xl transition-colors"
                    >
                      {settings[item.key] ? (
                        <BsToggleOn className="text-orange-600" />
                      ) : (
                        <BsToggleOff className="text-zinc-600" />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Appearance Tab */}
          {activeTab === 'appearance' && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-orange-600 mb-3">Appearance</h2>
              
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">Theme</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Dark', 'Light', 'Auto'].map((theme) => (
                    <button
                      key={theme}
                      className={`p-3 rounded-lg border-2 transition-all text-sm ${
                        theme === 'Dark'
                          ? 'border-orange-600 bg-orange-600/10'
                          : 'border-zinc-700 bg-zinc-800 hover:border-orange-600/50'
                      }`}
                    >
                      <div className="font-medium">{theme}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">Code Editor Theme</label>
                <select className="w-full px-3 py-2 text-sm bg-zinc-800 border-2 border-zinc-700 rounded-lg text-gray-100 focus:outline-none focus:border-orange-600 transition-colors">
                  <option>Holi Theme (Default)</option>
                  <option>VS Code Dark</option>
                  <option>Dracula</option>
                  <option>Monokai</option>
                  <option>GitHub Dark</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-2">Font Size</label>
                <input
                  type="range"
                  min="10"
                  max="20"
                  defaultValue="12"
                  className="w-full accent-orange-600"
                />
                <div className="flex justify-between text-xs text-zinc-500 mt-1">
                  <span>10px</span>
                  <span>20px</span>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-orange-600 mb-4">Security Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Current Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-zinc-800 border-2 border-zinc-700 rounded-xl text-gray-100 focus:outline-none focus:border-orange-600 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-zinc-800 border-2 border-zinc-700 rounded-xl text-gray-100 focus:outline-none focus:border-orange-600 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-400 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full px-4 py-3 bg-zinc-800 border-2 border-zinc-700 rounded-xl text-gray-100 focus:outline-none focus:border-orange-600 transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button className="w-full md:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-500 rounded-xl transition-colors duration-200 font-medium">
                Update Password
              </button>

              <div className="pt-6 border-t border-zinc-800">
                <h3 className="text-lg font-semibold mb-4">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between p-4 bg-zinc-800 rounded-xl border border-zinc-700">
                  <div>
                    <h4 className="font-medium text-gray-100">2FA Status</h4>
                    <p className="text-sm text-zinc-400 mt-1">Add an extra layer of security</p>
                  </div>
                  <button className="px-4 py-2 bg-orange-600 hover:bg-orange-500 rounded-lg transition-colors duration-200 text-sm">
                    Enable
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;