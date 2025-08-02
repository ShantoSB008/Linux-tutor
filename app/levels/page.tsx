
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { levelsData } from '../data/levels';

export default function LevelsPage() {
  const [userPoints, setUserPoints] = useState(0);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);

  useEffect(() => {
    const points = localStorage.getItem('userPoints');
    const completed = localStorage.getItem('completedLevels');
    if (points) setUserPoints(parseInt(points));
    if (completed) setCompletedLevels(JSON.parse(completed));
  }, []);

  const isLevelUnlocked = (levelNumber: number) => {
    if (levelNumber === 1) return true;
    return completedLevels.includes(levelNumber - 1);
  };

  const allLevelsCompleted = completedLevels.length >= levelsData.length;

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
            <Link href="/" className="flex items-center space-x-2 cursor-pointer">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="ri-terminal-line text-white text-lg"></i>
              </div>
              <h1 className="text-2xl font-bold text-white">LinuxLearn</h1>
            </Link>
            <div className="flex items-center space-x-4">
              {allLevelsCompleted && (
                <Link href="/exam">
                  <button className="px-4 py-2 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-colors whitespace-nowrap cursor-pointer">
                    <i className="ri-award-line mr-2"></i>
                    Take Final Exam
                  </button>
                </Link>
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
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Choose Your Level</h2>
          <p className="text-lg text-gray-300">
            Progress through levels to master essential Linux commands with AI guidance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levelsData.map((level) => {
            const isCompleted = completedLevels.includes(level.id);
            const isUnlocked = isLevelUnlocked(level.id);
            const isLocked = !isUnlocked;

            return (
              <div
                key={level.id}
                className={`relative bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 transition-all duration-200 ${
                  isLocked 
                    ? 'opacity-60 cursor-not-allowed' 
                    : 'hover:bg-white/20 cursor-pointer transform hover:-translate-y-1'
                } ${isCompleted ? 'border-green-400/50 bg-green-500/10' : ''}`}
              >
                {isCompleted && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <i className="ri-check-line text-white text-sm"></i>
                  </div>
                )}
                
                {isLocked && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
                    <i className="ri-lock-line text-white text-sm"></i>
                  </div>
                )}

                <div className="mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${
                    isCompleted ? 'bg-green-500/20' : isLocked ? 'bg-gray-500/20' : level.color
                  }`}>
                    <i className={`${level.icon} text-2xl ${
                      isCompleted ? 'text-green-400' : isLocked ? 'text-gray-400' : 'text-white'
                    }`}></i>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Level {level.id}: {level.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">
                    {level.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {level.commands.map((command, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded font-mono"
                      >
                        {command}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <i className="ri-trophy-line"></i>
                      <span>{level.points} points</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <i className="ri-time-line"></i>
                      <span>{level.estimatedTime}</span>
                    </div>
                  </div>
                </div>

                {isUnlocked && (
                  <Link href={`/level/${level.id}`}>
                    <button className={`w-full mt-4 py-2 px-4 rounded-lg font-medium transition-colors whitespace-nowrap ${
                      isCompleted
                        ? 'bg-green-500/20 text-green-300 hover:bg-green-500/30 border border-green-400/30'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}>
                      {isCompleted ? 'Review Level' : 'Start Level'}
                    </button>
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Overview */}
        <div className="mt-12 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h3 className="text-xl font-semibold text-white mb-4">Your Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">
                {completedLevels.length}/{levelsData.length}
              </div>
              <div className="text-gray-300 text-sm">Levels Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-1">{userPoints}</div>
              <div className="text-gray-300 text-sm">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {Math.round((completedLevels.length / levelsData.length) * 100)}%
              </div>
              <div className="text-gray-300 text-sm">Progress</div>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(completedLevels.length / levelsData.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {allLevelsCompleted && (
            <div className="mt-6 text-center">
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg p-4 border border-yellow-400/30 mb-4">
                <p className="text-yellow-300 mb-2">
                  🎉 Congratulations! You've completed all levels!
                </p>
                <p className="text-yellow-200 text-sm">
                  You're now ready to take the final exam and earn the Dragon Master badge.
                </p>
              </div>
              <Link href="/exam">
                <button className="px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-colors whitespace-nowrap cursor-pointer">
                  <i className="ri-award-line mr-2"></i>
                  Take Final Exam
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
