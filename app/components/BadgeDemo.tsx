
'use client';

import { useState, useEffect } from 'react';

interface BadgeDemoProps {
  userName?: string;
}

export default function BadgeDemo({ userName }: BadgeDemoProps) {
  const [showDemo, setShowDemo] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [certId, setCertId] = useState('');

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString());
    setCertId(`LDM-${Math.random().toString(36).substr(2, 8).toUpperCase()}`);
  }, []);

  const downloadBadgePDF = () => {
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
          <div class="name">${userName || 'Your Name Here'}</div>
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
    link.download = `linux-dragon-master-badge-${userName || 'certificate'}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    alert('Badge downloaded! Open the HTML file in your browser and print as PDF for best results.');
  };

  return (
    <>
      <button
        onClick={() => setShowDemo(true)}
        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-colors whitespace-nowrap cursor-pointer"
      >
        <i className="ri-award-line mr-2"></i>
        Preview Badge Demo
      </button>

      {showDemo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Dragon Master Badge Preview</h2>
              <p className="text-gray-600">This is what you'll earn after scoring 90%+ on the final exam!</p>
            </div>

            <div className="bg-gradient-to-br from-yellow-100 to-orange-100 rounded-2xl p-8 border-4 border-yellow-400 text-center mb-6">
              <div className="text-6xl mb-4">🐉</div>
              <h3 className="text-3xl font-bold text-yellow-800 mb-2">Linux Dragon Master</h3>
              <p className="text-yellow-700 mb-4 text-lg">Certificate of Excellence</p>
              
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="text-2xl font-bold text-gray-800 mb-1">{userName || 'Your Name Here'}</div>
                <p className="text-gray-600 text-sm">Linux Command Line Expert</p>
              </div>

              <div className="text-yellow-800 text-sm leading-relaxed mb-4">
                <p className="mb-2"><strong>Skills Mastered:</strong></p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>• File System Navigation</div>
                  <div>• Process Management</div>
                  <div>• Network Configuration</div>
                  <div>• Shell Scripting</div>
                  <div>• Text Processing</div>
                  <div>• System Administration</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-yellow-700">
                <span suppressHydrationWarning={true}>Date: {currentDate}</span>
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white">
                  ✓
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-blue-900 mb-2">How to Earn This Badge:</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>✓ Complete all 15 Linux learning levels</li>
                <li>✓ Pass the comprehensive final exam</li>
                <li>✓ Score 90% or above to unlock Dragon Master status</li>
                <li>✓ Download your personalized badge in PDF format</li>
              </ul>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => setShowDemo(false)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer"
              >
                Close Preview
              </button>
              <button
                onClick={downloadBadgePDF}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-600 to-orange-600 text-white font-semibold rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                <i className="ri-download-line mr-2"></i>
                Download Sample
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
