
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from './components/AuthWrapper';
import BadgeDemo from './components/BadgeDemo';

export default function Home() {
  const { user, isLoggedIn, logout } = useAuth();
  const [userPoints, setUserPoints] = useState(0);
  const [completedLevels, setCompletedLevels] = useState(0);
  const [hasBadge, setHasBadge] = useState(false);
  const [badgeHolderName, setBadgeHolderName] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [certId, setCertId] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const points = localStorage.getItem('userPoints');
    const completed = localStorage.getItem('completedLevels');
    const badge = localStorage.getItem('hasLinuxDragonBadge');
    const name = localStorage.getItem('badgeHolderName');

    if (points) setUserPoints(parseInt(points));
    if (completed) setCompletedLevels(JSON.parse(completed).length);
    if (badge) setHasBadge(true);
    if (name) setBadgeHolderName(name);

    setCurrentDate(new Date().toLocaleDateString());
    setCertId(`LDM-${Math.random().toString(36).substr(2, 8).toUpperCase()}`);
  }, []);

  const downloadUserBadge = () => {
    const badgeContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 40px;
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #1e3a8a, #7c3aed);
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .badge {
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            border: 8px solid #d97706;
            border-radius: 20px;
            padding: 60px 40px;
            text-align: center;
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            max-width: 500px;
            position: relative;
          }
          .badge::before {
            content: '';
            position: absolute;
            top: -4px;
            left: -4px;
            right: -4px;
            bottom: -4px;
            background: linear-gradient(45deg, #dc2626, #7c2d12, #dc2626);
            border-radius: 24px;
            z-index: -1;
          }
          .dragon {
            font-size: 80px;
            margin-bottom: 20px;
            color: #7c2d12;
          }
          .title {
            font-size: 36px;
            font-weight: bold;
            color: #7c2d12;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
          }
          .subtitle {
            font-size: 18px;
            color: #92400e;
            margin-bottom: 30px;
          }
          .name {
            font-size: 32px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 10px;
          }
          .certification {
            font-size: 16px;
            color: #374151;
            margin-bottom: 30px;
          }
          .details {
            font-size: 14px;
            color: #6b7280;
            line-height: 1.6;
          }
          .seal {
            position: absolute;
            bottom: 20px;
            right: 20px;
            width: 80px;
            height: 80px;
            background: #dc2626;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
          }
        </style>
      </head>
      <body>
        <div class="badge">
          <div class="dragon">🐉</div>
          <div class="title">Linux Dragon Master</div>
          <div class="subtitle">Certificate of Excellence</div>
          <div class="name">${badgeHolderName}</div>
          <div class="certification">
            Has successfully demonstrated mastery of Linux command line interface
            and earned the prestigious Dragon Master certification by scoring 90% or above
            on the comprehensive Linux skills examination.
          </div>
          <div class="details">
            <strong>Skills Mastered:</strong><br>
            • Advanced File System Navigation<br>
            • Process & System Management<br>
            • Network Configuration & Security<br>
            • Shell Scripting & Automation<br>
            • Text Processing & Data Analysis<br><br>
            <strong>Date:</strong> ${currentDate}<br>
            <strong>Certification ID:</strong> ${certId}
          </div>
          <div class="seal">✓</div>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([badgeContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `linux-dragon-master-${badgeHolderName.replace(/\s+/g, '-').toLowerCase()}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('Badge downloaded! Open the HTML file in your browser and print as PDF for best results.');
  };

  // Prevent hydration mismatch by not rendering dynamic content until client-side
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Futuristic%20AI%20brain%20neural%20network%20with%20glowing%20nodes%20and%20connections%2C%20dark%20cyberpunk%20style%2C%20digital%20circuit%20patterns%2C%20blue%20and%20purple%20neon%20lights%2C%20artificial%20intelligence%20visualization%2C%20high%20tech%20background%2C%20sci-fi%20atmosphere&width=1920&height=1080&seq=ai-brain-bg&orientation=landscape')`
          }}
        ></div>

        <header className="relative bg-white/10 backdrop-blur-sm border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <i className="ri-terminal-line text-white text-lg"></i>
                </div>
                <h1 className="text-2xl font-bold text-white">LinuxLearn</h1>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/login">
                  <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                    Login / Sign Up
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <section className="relative py-20 px-4">
          <div className="relative max-w-4xl mx-auto text-center">
            <h2 className="text-5xl font-bold text-white mb-6">
              Master Linux Commands with AI
            </h2>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Learn essential Linux commands through interactive lessons, hands-on practice, and AI-powered guidance. Progress through levels, earn points, and become a command line expert.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/levels"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Start Learning
                <i className="ri-arrow-right-line ml-2"></i>
              </Link>
            </div>
          </div>
        </section>

        {/* Loading indicator for client-side hydration */}
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* AI Brain Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=Futuristic%20AI%20brain%20neural%20network%20with%20glowing%20nodes%20and%20connections%2C%20dark%20cyberpunk%20style%2C%20digital%20circuit%20patterns%2C%20blue%20and%20purple%20neon%20lights%2C%20artificial%20intelligence%20visualization%2C%20high%20tech%20background%2C%20sci-fi%20atmosphere&width=1920&height=1080&seq=ai-brain-bg&orientation=landscape')`
        }}
      ></div>

      {/* Header */}
      <header className="relative bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <i className="ri-terminal-line text-white text-lg"></i>
              </div>
              <h1 className="text-2xl font-bold text-white">LinuxLearn</h1>
            </div>
            <div className="flex items-center space-x-4">
              {isLoggedIn ? (
                <>
                  {hasBadge && (
                    <div className="flex items-center space-x-2 bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-400">
                      <i className="ri-award-line text-yellow-400"></i>
                      <span className="text-yellow-100 font-semibold text-sm">Dragon Master</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2 bg-yellow-500/20 px-3 py-1 rounded-full border border-yellow-400">
                    <i className="ri-trophy-line text-yellow-400"></i>
                    <span className="text-yellow-100 font-semibold">{userPoints} Points</span>
                  </div>
                  <div className="flex items-center space-x-2 text-white">
                    <i className="ri-user-line"></i>
                    <span className="text-sm">{user?.name || user?.email}</span>
                  </div>
                  <button 
                    onClick={logout}
                    className="px-3 py-1 bg-red-500/20 text-red-300 text-sm rounded-lg hover:bg-red-500/30 transition-colors cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login">
                  <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                    Login / Sign Up
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-bold text-white mb-6">
            Master Linux Commands with AI
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Learn essential Linux commands through interactive lessons, hands-on practice, and AI-powered guidance. Progress through levels, earn points, and become a command line expert.
          </p>
          
          {hasBadge && badgeHolderName && isLoggedIn && (
            <div className="mb-8 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm rounded-2xl p-6 border border-yellow-400/30 max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4">
                <img 
                  src="https://readdy.ai/api/search-image?query=Majestic%20golden%20dragon%20emblem%20badge%20design%2C%20regal%20dragon%20with%20spread%20wings%2C%20fantasy%20medieval%20heraldic%20style%2C%20golden%20metallic%20finish%2C%20intricate%20details%2C%20royal%20crest%2C%20professional%20certification%20badge%2C%20ornate%20border%2C%20premium%20quality%20design&width=200&height=200&seq=dragon-badge&orientation=squarish"
                  alt="Linux Dragon Master Badge"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-lg font-bold text-yellow-100 mb-1">{badgeHolderName}</h3>
              <p className="text-yellow-200 text-sm mb-3">Linux Dragon Master</p>
              <button
                onClick={downloadUserBadge}
                className="px-4 py-2 bg-yellow-600 text-white text-sm font-semibold rounded-lg hover:bg-yellow-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-download-line mr-2"></i>
                Download Badge
              </button>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/levels"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              {completedLevels > 0 ? 'Continue Learning' : 'Start Learning'}
              <i className="ri-arrow-right-line ml-2"></i>
            </Link>
            {completedLevels >= 15 && (
              <Link 
                href="/exam"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Take Final Exam
                <i className="ri-award-line ml-2"></i>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Badge Demo Section */}
      <section className="relative py-16 px-4 bg-white/10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-6">
            Earn Your Dragon Master Badge
          </h3>
          <p className="text-lg text-gray-300 mb-8">
            Complete all levels and pass the final exam with 90%+ to unlock the prestigious Linux Dragon Master certification
          </p>
          
          <div className="mb-8">
            <BadgeDemo userName={user?.name || 'Your Name Here'} />
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-book-open-line text-blue-400 text-2xl"></i>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Complete 15 Levels</h4>
              <p className="text-gray-300 text-sm">
                Master essential Linux commands through progressive learning modules
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-file-list-3-line text-yellow-400 text-2xl"></i>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Pass Final Exam</h4>
              <p className="text-gray-300 text-sm">
                Demonstrate your knowledge with a comprehensive skills assessment
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-download-cloud-line text-green-400 text-2xl"></i>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Download Certificate</h4>
              <p className="text-gray-300 text-sm">
                Get your personalized badge in PDF format to showcase your achievement
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center text-white mb-12">
            Why Choose LinuxLearn AI?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-graduation-cap-line text-green-400 text-2xl"></i>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">AI-Powered Learning</h4>
              <p className="text-gray-300">
                Progress through 15 carefully designed levels with AI-enhanced tutorials and intelligent feedback on your command execution.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-terminal-box-line text-blue-400 text-2xl"></i>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Realistic Terminal</h4>
              <p className="text-gray-300">
                Practice in a fully simulated Linux environment with realistic file systems, commands, and outputs. Safe learning without system risks.
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <i className="ri-trophy-line text-purple-400 text-2xl"></i>
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Certification & Badges</h4>
              <p className="text-gray-300">
                Earn points, track progress, and unlock the prestigious Dragon Master badge by completing the final certification exam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Stats */}
      <section className="relative py-16 px-4 bg-white/10 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">50+</div>
              <div className="text-gray-300">Commands</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">15</div>
              <div className="text-gray-300">Levels</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2" suppressHydrationWarning={true}>{completedLevels}</div>
              <div className="text-gray-300">Your Progress</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400 mb-2" suppressHydrationWarning={true}>{userPoints}</div>
              <div className="text-gray-300">Your Points</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-white mb-4">
            Ready to Master Linux with AI?
          </h3>
          <p className="text-gray-300 mb-8">
            Join the next generation of Linux experts with AI-powered learning and realistic hands-on practice
          </p>
          <Link 
            href="/levels"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors whitespace-nowrap cursor-pointer"
          >
            Begin Your Journey
            <i className="ri-play-line ml-2"></i>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-white/10 backdrop-blur-sm border-t border-white/20 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
              <i className="ri-terminal-line text-white text-sm"></i>
            </div>
            <span className="text-white font-semibold">LinuxLearn AI</span>
          </div>
          <p className="text-gray-400"> 2024 LinuxLearn AI. Master the command line with artificial intelligence.</p>
        </div>
      </footer>
    </div>
  );
}
