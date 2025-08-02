
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Question {
  id: number;
  type: 'multiple-choice' | 'command';
  question: string;
  options?: string[];
  correctAnswer: string;
  points: number;
}

const examQuestions: Question[] = [
  {
    id: 1,
    type: 'multiple-choice',
    question: 'Which command is used to display the current directory?',
    options: ['ls', 'pwd', 'cd', 'dir'],
    correctAnswer: 'pwd',
    points: 5
  },
  {
    id: 2,
    type: 'command',
    question: 'Write the command to list all files including hidden ones with detailed information',
    correctAnswer: 'ls -la',
    points: 8
  },
  {
    id: 3,
    type: 'multiple-choice',
    question: 'What does chmod +x do to a file?',
    options: ['Removes all permissions', 'Makes it executable', 'Makes it readable', 'Deletes the file'],
    correctAnswer: 'Makes it executable',
    points: 6
  },
  {
    id: 4,
    type: 'command',
    question: 'Write the command to create a directory named "test_folder"',
    correctAnswer: 'mkdir test_folder',
    points: 7
  },
  {
    id: 5,
    type: 'multiple-choice',
    question: 'Which command is used to search for text patterns in files?',
    options: ['find', 'locate', 'grep', 'search'],
    correctAnswer: 'grep',
    points: 5
  },
  {
    id: 6,
    type: 'command',
    question: 'Write the command to copy "file1.txt" to "file2.txt"',
    correctAnswer: 'cp file1.txt file2.txt',
    points: 7
  },
  {
    id: 7,
    type: 'multiple-choice',
    question: 'What does the "ps aux" command show?',
    options: ['Disk usage', 'All running processes', 'Network connections', 'File permissions'],
    correctAnswer: 'All running processes',
    points: 6
  },
  {
    id: 8,
    type: 'command',
    question: 'Write the command to remove a file named "oldfile.txt"',
    correctAnswer: 'rm oldfile.txt',
    points: 6
  },
  {
    id: 9,
    type: 'multiple-choice',
    question: 'Which command shows disk space usage?',
    options: ['du', 'df', 'free', 'space'],
    correctAnswer: 'df',
    points: 5
  },
  {
    id: 10,
    type: 'command',
    question: 'Write the command to display the contents of a file called "readme.txt"',
    correctAnswer: 'cat readme.txt',
    points: 7
  },
  {
    id: 11,
    type: 'multiple-choice',
    question: 'What does the "cd .." command do?',
    options: ['Goes to home directory', 'Goes up one directory level', 'Lists directories', 'Creates a directory'],
    correctAnswer: 'Goes up one directory level',
    points: 5
  },
  {
    id: 12,
    type: 'command',
    question: 'Write the command to find all .txt files in the current directory',
    correctAnswer: 'find . -name "*.txt"',
    points: 9
  },
  {
    id: 13,
    type: 'multiple-choice',
    question: 'Which command is used to compress files into a tar.gz archive?',
    options: ['zip', 'gzip', 'tar -czf', 'compress'],
    correctAnswer: 'tar -czf',
    points: 7
  },
  {
    id: 14,
    type: 'command',
    question: 'Write the command to check memory usage in human-readable format',
    correctAnswer: 'free -h',
    points: 8
  },
  {
    id: 15,
    type: 'multiple-choice',
    question: 'What does the "tail -f" command do?',
    options: ['Shows first 10 lines', 'Shows last 10 lines and follows new content', 'Deletes last lines', 'Copies file tail'],
    correctAnswer: 'Shows last 10 lines and follows new content',
    points: 6
  }
];

export default function ExamPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  const [showBadgePreview, setShowBadgePreview] = useState(true);
  const [userName, setUserName] = useState('');
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [currentDate, setCurrentDate] = useState('');
  const [certId, setCertId] = useState('');

  useEffect(() => {
    const completed = localStorage.getItem('completedLevels');
    if (completed) {
      setCompletedLevels(JSON.parse(completed));
    }
    setCurrentDate(new Date().toLocaleDateString());
    setCertId(`LDM-${Math.random().toString(36).substr(2, 8).toUpperCase()}`);
  }, []);

  const allLevelsCompleted = completedLevels.length >= 15;

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const calculateScore = () => {
    let totalScore = 0;
    let maxScore = 0;
    
    examQuestions.forEach(question => {
      maxScore += question.points;
      const userAnswer = answers[question.id];
      
      if (question.type === 'multiple-choice') {
        if (userAnswer === question.correctAnswer) {
          totalScore += question.points;
        }
      } else {
        // Command type - more flexible matching
        const cleanUserAnswer = userAnswer?.toLowerCase().trim() || '';
        const cleanCorrectAnswer = question.correctAnswer.toLowerCase().trim();
        
        if (cleanUserAnswer === cleanCorrectAnswer || 
            cleanUserAnswer.includes(cleanCorrectAnswer) ||
            cleanCorrectAnswer.includes(cleanUserAnswer)) {
          totalScore += question.points;
        }
      }
    });
    
    return Math.round((totalScore / maxScore) * 100);
  };

  const submitExam = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setShowResults(true);
    
    // Save exam results
    localStorage.setItem('examScore', finalScore.toString());
    localStorage.setItem('examCompleted', 'true');
    
    if (finalScore >= 90) {
      localStorage.setItem('hasLinuxDragonBadge', 'true');
      if (userName.trim()) {
        localStorage.setItem('badgeHolderName', userName.trim());
      }
    }
  };

  const startExam = () => {
    setShowBadgePreview(false);
  };

  if (!allLevelsCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-lock-line text-2xl text-red-600"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Exam Locked</h2>
            <p className="text-gray-600 mb-6">
              You need to complete all 15 levels before taking the final exam.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-blue-800">
                Progress: {completedLevels.length}/15 levels completed
              </p>
            </div>
            <Link href="/levels">
              <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                Continue Learning
                <i className="ri-arrow-right-line ml-2"></i>
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (showBadgePreview) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        {/* AI Brain Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Futuristic%20AI%20brain%20neural%20network%20with%20glowing%20nodes%20and%20connections%2C%20dark%20cyberpunk%20style%2C%20digital%20circuit%20patterns%2C%20blue%20and%20purple%20neon%20lights%2C%20artificial%20intelligence%20visualization%2C%20high%20tech%20background%2C%20sci-fi%20atmosphere&width=1920&height=1080&seq=ai-brain-bg&orientation=landscape')`
          }}
        ></div>
        
        <div className="relative flex items-center justify-center min-h-screen px-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-2xl w-full text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Linux Master Certification Exam</h1>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Badge Preview</h2>
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8 border-4 border-yellow-400">
                <div className="w-24 h-24 mx-auto mb-4">
                  <img 
                    src="https://readdy.ai/api/search-image?query=Majestic%20golden%20dragon%20emblem%20badge%20design%2C%20regal%20dragon%20with%20spread%20wings%2C%20fantasy%20medieval%20heraldic%20style%2C%20golden%20metallic%20finish%2C%20intricate%20details%2C%20royal%20crest%2C%20professional%20certification%20badge%2C%20ornate%20border%2C%20premium%20quality%20design&width=200&height=200&seq=dragon-badge&orientation=squarish"
                    alt="Linux Dragon Master Badge"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-2xl font-bold text-yellow-800 mb-2">Linux Dragon Master</h3>
                <p className="text-yellow-700 mb-4">
                  Certification of Excellence in Linux Command Mastery
                </p>
                <div className="bg-white rounded-lg p-3 mb-4">
                  <input
                    type="text"
                    placeholder="Enter your name for the badge"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <p className="text-yellow-700 text-sm">
                  This badge will be awarded for scoring 90-100% on the exam
                </p>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Exam Information</h3>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• 15 questions covering all Linux topics</li>
                <li>• Multiple choice and command writing questions</li>
                <li>• Score 90-100% to earn the Dragon Master Badge</li>
                <li>• No time limit - take your time!</li>
              </ul>
            </div>
            
            <div className="flex space-x-4">
              <Link href="/levels" className="flex-1">
                <button className="w-full px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer">
                  Review Levels
                </button>
              </Link>
              <button
                onClick={startExam}
                className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Start Exam
                <i className="ri-play-line ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const earnedBadge = score >= 90;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Futuristic%20AI%20brain%20neural%20network%20with%20glowing%20nodes%20and%20connections%2C%20dark%20cyberpunk%20style%2C%20digital%20circuit%20patterns%2C%20blue%20and%20purple%20neon%20lights%2C%20artificial%20intelligence%20visualization%2C%20high%20tech%20background%2C%20sci-fi%20atmosphere&width=1920&height=1080&seq=ai-brain-bg&orientation=landscape')`
          }}
        ></div>
        
        <div className="relative flex items-center justify-center min-h-screen px-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-2xl w-full text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              earnedBadge ? 'bg-green-100' : 'bg-yellow-100'
            }`}>
              <i className={`text-3xl ${
                earnedBadge ? 'ri-trophy-line text-green-600' : 'ri-medal-line text-yellow-600'
              }`}></i>
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Exam Complete!</h2>
            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">{score}%</div>
              <div className="text-gray-600">Your Final Score</div>
            </div>
            
            {earnedBadge ? (
              <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-6 border-4 border-yellow-400 mb-6">
                <div className="w-20 h-20 mx-auto mb-4">
                  <img 
                    src="https://readdy.ai/api/search-image?query=Majestic%20golden%20dragon%20emblem%20badge%20design%2C%20regal%20dragon%20with%20spread%20wings%2C%20fantasy%20medieval%20heraldic%20style%2C%20golden%20metallic%20finish%2C%20intricate%20details%2C%20royal%20crest%2C%20professional%20certification%20badge%2C%20ornate%20border%2C%20premium%20quality%20design&width=200&height=200&seq=dragon-badge&orientation=squarish"
                    alt="Linux Dragon Master Badge"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-2xl font-bold text-yellow-800 mb-2">Congratulations!</h3>
                <p className="text-yellow-700 mb-3">
                  You've earned the <strong>Linux Dragon Master</strong> badge!
                </p>
                {userName && (
                  <div className="bg-white rounded-lg p-3 mb-3">
                    <p className="text-gray-800 font-semibold">{userName}</p>
                    <p className="text-gray-600 text-sm">Linux Dragon Master</p>
                  </div>
                )}
                <p className="text-yellow-700 text-sm">
                  You have demonstrated exceptional mastery of Linux commands!
                </p>
              </div>
            ) : (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">Keep Learning!</h3>
                <p className="text-blue-800">
                  You need 90% or higher to earn the Dragon Master badge. Review the levels and try again!
                </p>
              </div>
            )}
            
            <div className="flex space-x-4">
              <Link href="/levels" className="flex-1">
                <button className="w-full px-6 py-3 bg-blue-100 text-blue-700 font-semibold rounded-lg hover:bg-blue-200 transition-colors whitespace-nowrap cursor-pointer">
                  Review Levels
                </button>
              </Link>
              <Link href="/" className="flex-1">
                <button className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                  Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = examQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === examQuestions.length - 1;
  const progress = ((currentQuestion + 1) / examQuestions.length) * 100;

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
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-white">Linux Master Exam</h1>
            <div className="text-white">
              Question {currentQuestion + 1} of {examQuestions.length}
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="relative max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-blue-600 font-semibold">
                {question.type === 'multiple-choice' ? 'Multiple Choice' : 'Command Writing'}
              </span>
              <span className="text-sm text-gray-500">{question.points} points</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              {question.question}
            </h2>
          </div>
          
          {question.type === 'multiple-choice' ? (
            <div className="space-y-3 mb-8">
              {question.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(question.id, option)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    answers[question.id] === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border-2 ${
                      answers[question.id] === option
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {answers[question.id] === option && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <span className="text-gray-800">{option}</span>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="mb-8">
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-green-400 font-mono">$</span>
                  <input
                    type="text"
                    value={answers[question.id] || ''}
                    onChange={(e) => handleAnswer(question.id, e.target.value)}
                    placeholder="Type your command here..."
                    className="flex-1 bg-transparent text-green-400 font-mono outline-none placeholder-gray-500"
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600">
                Write the complete Linux command as you would type it in the terminal.
              </p>
            </div>
          )}
          
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
            >
              <i className="ri-arrow-left-line mr-2"></i>
              Previous
            </button>
            
            {isLastQuestion ? (
              <button
                onClick={submitExam}
                disabled={!answers[question.id]}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                Submit Exam
                <i className="ri-check-line ml-2"></i>
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(currentQuestion + 1)}
                disabled={!answers[question.id]}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                Next
                <i className="ri-arrow-right-line ml-2"></i>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
