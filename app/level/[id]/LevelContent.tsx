
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { levelsData } from '../../data/levels';
import Terminal from '../../components/Terminal';
import CommandDetails from '../../components/CommandDetails';
import { useAuth } from '../../components/AuthWrapper';

interface LevelContentProps {
  levelId: string;
}

export default function LevelContent({ levelId }: LevelContentProps) {
  const { user, isLoggedIn, syncUserData } = useAuth();
  const [currentLevel, setCurrentLevel] = useState<any>(null);
  const [showTerminal, setShowTerminal] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  useEffect(() => {
    const level = levelsData.find(l => l.id === parseInt(levelId));
    setCurrentLevel(level);
    
    const points = localStorage.getItem('userPoints');
    const completed = localStorage.getItem('completedLevels');
    if (points) setUserPoints(parseInt(points));
    if (completed) setCompletedLevels(JSON.parse(completed));
  }, [levelId]);

  const handleLevelComplete = () => {
    if (!currentLevel || completedLevels.includes(currentLevel.id)) return;
    
    const newPoints = userPoints + currentLevel.points;
    const newCompletedLevels = [...completedLevels, currentLevel.id];
    
    setUserPoints(newPoints);
    setCompletedLevels(newCompletedLevels);
    
    localStorage.setItem('userPoints', newPoints.toString());
    localStorage.setItem('completedLevels', JSON.stringify(newCompletedLevels));
    
    // Sync user data if logged in
    if (isLoggedIn) {
      setTimeout(syncUserData, 1000);
    }
  };

  if (!currentLevel) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Futuristic%20AI%20brain%20neural%20network%20with%20glowing%20nodes%20and%20connections%2C%20dark%20cyberpunk%20style%2C%20digital%20circuit%20patterns%2C%20blue%20and%20purple%20neon%20lights%2C%20artificial%20intelligence%20visualization%2C%20high%20tech%20background%2C%20sci-fi%20atmosphere&width=1920&height=1080&seq=ai-brain-bg&orientation=landscape')`
          }}
        ></div>
        <div className="relative text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-loader-4-line text-white text-2xl animate-spin"></i>
          </div>
          <p className="text-gray-300">Loading level...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* AI Brain Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Futuristic%20AI%20brain%20neural%20network%20with%20glowing%20nodes%20and%20connections%2C%20dark%20cyberpunk%20style%2C%20digital%20circuit%20patterns%2C%20blue%20and%20purple%20neon%20lights%2C%20artificial%20intelligence%20visualization%2C%20high%20tech%20background%2C%20sci-fi%20atmosphere&width=1920&height=1080&seq=ai-brain-bg&orientation=landscape')`
        }}
      ></div>

      {/* Header */}
      <header className="relative bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/levels" className="flex items-center space-x-2 cursor-pointer">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <i className="ri-terminal-line text-white text-lg"></i>
                </div>
                <h1 className="text-2xl font-bold text-white">LinuxLearn</h1>
              </Link>
              <div className="text-gray-400">|</div>
              <h2 className="text-lg font-semibold text-gray-200">
                Level {currentLevel.id}: {currentLevel.title}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              {isLoggedIn && user && (
                <div className="flex items-center space-x-2 text-white">
                  <i className="ri-user-line"></i>
                  <span className="text-sm">{user.name || user.email}</span>
                </div>
              )}
              <div className="flex items-center space-x-2 bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-400">
                <i className="ri-trophy-line text-yellow-400"></i>
                <span className="text-yellow-100 font-semibold">{userPoints} Points</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-w-6xl mx-auto px-4 py-8">
        {!showTerminal ? (
          /* Tutorial Section */
          <div className="bg-white/95 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
            <div className={`${currentLevel.color} text-white p-6`}>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center">
                  <i className={`${currentLevel.icon} text-3xl text-white`}></i>
                </div>
                <div>
                  <h1 className="text-3xl font-bold mb-2">{currentLevel.tutorial.title}</h1>
                  <p className="text-white/90">{currentLevel.description}</p>
                </div>
              </div>
            </div>

            <div className="p-8 space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Learn These Commands?</h3>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {currentLevel.tutorial.why}
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What You'll Learn</h3>
                <p className="text-gray-700 leading-relaxed text-lg mb-6">
                  {currentLevel.tutorial.content}
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {currentLevel.commands.map((command: string, index: number) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                        <i className="ri-terminal-line text-blue-600"></i>
                      </div>
                      <span className="font-mono font-semibold text-gray-900">{command}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Command Details Section */}
              <CommandDetails commands={currentLevel.commands} />

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Command Examples</h3>
                <div className="space-y-4">
                  {currentLevel.tutorial.examples.map((example: any, index: number) => (
                    <div key={index} className="bg-gray-900 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-green-400 font-mono">$</span>
                        <code className="text-green-400 font-mono">{example.command}</code>
                      </div>
                      <p className="text-gray-300 text-sm pl-4">{example.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-6 border-t">
                <div className="flex items-center space-x-4 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <i className="ri-trophy-line text-yellow-500"></i>
                    <span>{currentLevel.points} points available</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <i className="ri-time-line"></i>
                    <span>{currentLevel.estimatedTime} estimated</span>
                  </div>
                </div>
                <button
                  onClick={() => setShowTerminal(true)}
                  className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Start Practice
                  <i className="ri-play-line ml-2"></i>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Terminal Section */
          <div className="space-y-6">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Practice Terminal</h2>
              <p className="text-gray-600 mb-4">
                Complete the exercises below to master {currentLevel.title} commands with realistic file system practice.
              </p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowTerminal(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-arrow-left-line mr-2"></i>
                  Back to Tutorial
                </button>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <i className="ri-information-line"></i>
                  <span>Complete all exercises to earn {currentLevel.points} points</span>
                </div>
              </div>
            </div>

            <Terminal 
              level={currentLevel}
              onLevelComplete={handleLevelComplete}
              isCompleted={completedLevels.includes(currentLevel.id)}
            />
          </div>
        )}
      </div>
    </div>
  );
}
