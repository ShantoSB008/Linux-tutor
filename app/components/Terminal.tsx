
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

interface TerminalProps {
  level: any;
  onLevelComplete: () => void;
  isCompleted: boolean;
}

interface CommandHistory {
  command: string;
  output: string;
  isCorrect?: boolean;
}

const fileSystem = {
  '/': {
    'home': {
      'user': {
        'documents': {
          'report.txt': 'file',
          'presentation.pdf': 'file',
          'notes.md': 'file',
          'projects': {
            'website': {
              'index.html': 'file',
              'style.css': 'file',
              'script.js': 'file',
              'images': {
                'logo.png': 'file',
                'banner.jpg': 'file'
              }
            },
            'app': {
              'main.py': 'file',
              'config.json': 'file',
              'requirements.txt': 'file',
              'src': {
                'utils.py': 'file',
                'models.py': 'file'
              }
            }
          }
        },
        'downloads': {
          'ubuntu-20.04.iso': 'file',
          'software.deb': 'file',
          'backup.tar.gz': 'file',
          'music.mp3': 'file',
          'video.mp4': 'file'
        },
        'pictures': {
          'vacation2023': {
            'beach.jpg': 'file',
            'sunset.png': 'file',
            'family.jpg': 'file'
          },
          'screenshots': {
            'desktop.png': 'file',
            'terminal.png': 'file'
          },
          'wallpapers': {
            'nature.jpg': 'file',
            'abstract.png': 'file'
          }
        },
        'videos': {
          'tutorials': {
            'linux_basics.mp4': 'file',
            'coding_tips.avi': 'file'
          },
          'personal': {
            'birthday.mp4': 'file',
            'vacation.mov': 'file'
          }
        },
        'config': {
          '.bashrc': 'file',
          '.vimrc': 'file',
          '.gitconfig': 'file',
          'app_settings.conf': 'file'
        },
        'scripts': {
          'backup.sh': 'file',
          'deploy.sh': 'file',
          'cleanup.py': 'file',
          'monitor.sh': 'file'
        },
        'logs': {
          'system.log': 'file',
          'app.log': 'file',
          'error.log': 'file',
          'access.log': 'file'
        }
      }
    },
    'var': {
      'log': {
        'syslog': 'file',
        'auth.log': 'file',
        'kern.log': 'file'
      },
      'www': {
        'html': {
          'index.html': 'file',
          'about.html': 'file'
        }
      }
    },
    'etc': {
      'passwd': 'file',
      'hosts': 'file',
      'fstab': 'file',
      'nginx': {
        'nginx.conf': 'file',
        'sites-available': {
          'default': 'file',
          'mysite': 'file'
        }
      }
    },
    'tmp': {
      'temp_file.txt': 'file',
      'cache': {
        'app_cache.tmp': 'file'
      }
    }
  }
};

let currentDirectory = '/home/user';

export default function Terminal({ level, onLevelComplete, isCompleted }: TerminalProps) {
  const [currentInput, setCurrentInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<boolean[]>(new Array(level.exercises.length).fill(false));
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const focusInput = () => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    };

    focusInput();
    const interval = setInterval(focusInput, 100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const getDirectoryContents = (path: string) => {
    const parts = path.split('/').filter(part => part !== '');
    let current = fileSystem['/'];

    for (const part of parts) {
      if (current && typeof current === 'object' && current[part]) {
        current = current[part];
      } else {
        return null;
      }
    }

    if (typeof current === 'object') {
      return Object.keys(current);
    }
    return null;
  };

  const pathExists = (path: string) => {
    if (path === '/') return true;
    const parts = path.split('/').filter(part => part !== '');
    let current = fileSystem['/'];

    for (const part of parts) {
      if (current && typeof current === 'object' && current[part]) {
        current = current[part];
      } else {
        return false;
      }
    }
    return true;
  };

  const simulateCommand = (command: string): string => {
    const cmd = command.trim().toLowerCase();
    const parts = command.trim().split(' ');

    if (cmd === 'pwd') {
      return currentDirectory;
    } else if (cmd.startsWith('ls')) {
      const targetDir = parts.length > 1 ? parts[1] : currentDirectory;
      let dirPath = targetDir;

      if (!targetDir.startsWith('/')) {
        dirPath = currentDirectory === '/' ? `/${targetDir}` : `${currentDirectory}/${targetDir}`;
      }

      const contents = getDirectoryContents(dirPath);
      if (contents) {
        if (cmd.includes('-l')) {
          return contents.map(item => {
            const isDir = getDirectoryContents(`${dirPath}/${item}`) !== null;
            const permissions = isDir ? 'drwxr-xr-x' : '-rw-r--r--';
            const type = isDir ? 'directory' : 'file';
            const size = isDir ? '4096' : Math.floor(Math.random() * 50000);
            return `${permissions}  1 user user  ${size} Dec 10 10:30 ${item}`;
          }).join('\n');
        } else {
          return contents.join('  ');
        }
      } else {
        return `ls: cannot access '${targetDir}': No such file or directory`;
      }
    } else if (cmd.startsWith('cd ')) {
      const targetDir = parts[1];
      let newPath;

      if (targetDir === '..') {
        const pathParts = currentDirectory.split('/').filter(part => part !== '');
        pathParts.pop();
        newPath = pathParts.length === 0 ? '/' : '/' + pathParts.join('/');
      } else if (targetDir === '/') {
        newPath = '/';
      } else if (targetDir.startsWith('/')) {
        newPath = targetDir;
      } else {
        newPath = currentDirectory === '/' ? `/${targetDir}` : `${currentDirectory}/${targetDir}`;
      }

      if (pathExists(newPath)) {
        currentDirectory = newPath;
        return `Changed to directory: ${newPath}`;
      } else {
        return `cd: ${targetDir}: No such file or directory`;
      }
    } else if (cmd.startsWith('touch ')) {
      const filename = parts[1];
      return `Created file: ${filename}`;
    } else if (cmd.startsWith('mkdir ')) {
      const dirname = parts[1];
      return `Created directory: ${dirname}`;
    } else if (cmd.startsWith('cp ')) {
      return `Copied: ${parts[1]} -> ${parts[2]}`;
    } else if (cmd.startsWith('mv ')) {
      return `Moved: ${parts[1]} -> ${parts[2]}`;
    } else if (cmd.startsWith('rm ')) {
      const filename = parts[1];
      return `Removed: ${filename}`;
    } else if (cmd.startsWith('chmod ')) {
      return `Changed permissions: ${parts[2]} to ${parts[1]}`;
    } else if (cmd.startsWith('chown ')) {
      return `Changed ownership: ${cmd.split(' ').slice(1).join(' ')}`;
    } else if (cmd.startsWith('cat ')) {
      const filename = parts[1];
      if (filename === 'report.txt') {
        return 'Linux Learning Progress Report\n========================\n\nDate: December 10, 2024\nUser: LinuxLearner\n\nCompleted Commands:\n- Basic navigation\n- File operations\n- Text processing\n\nNext Steps:\n- Advanced scripting\n- System administration';
      } else if (filename === 'notes.md') {
        return '# Linux Command Notes\n\n## Basic Commands\n- `pwd` - print working directory\n- `ls` - list files\n- `cd` - change directory\n\n## File Operations\n- `touch` - create empty file\n- `mkdir` - create directory\n- `cp` - copy files\n- `mv` - move/rename files\n- `rm` - remove files';
      } else {
        return `This is the content of ${filename}...\nLine 1: Sample text content\nLine 2: More file content\nLine 3: End of file`;
      }
    } else if (cmd.startsWith('grep ')) {
      return 'Found matching lines:\nreport.txt:2:Linux Learning Progress Report\nnotes.md:1:# Linux Command Notes\nnotes.md:5:- `pwd` - print working directory';
    } else if (cmd.startsWith('head ')) {
      return 'First 10 lines of the file:\nLine 1\nLine 2\nLine 3\nLine 4\nLine 5\nLine 6\nLine 7\nLine 8\nLine 9\nLine 10';
    } else if (cmd.startsWith('tail ')) {
      return 'Last 10 lines of the file:\nLine 91\nLine 92\nLine 93\nLine 94\nLine 95\nLine 96\nLine 97\nLine 98\nLine 99\nLine 100';
    } else if (cmd.startsWith('wc ')) {
      return '  25  150  1024 ' + parts[1];
    } else if (cmd === 'ps aux' || cmd === 'ps') {
      return 'USER       PID %CPU %MEM    VSZ   RSS TTY      STAT START   TIME COMMAND\nroot         1  0.0  0.1  19356  1544 ?        Ss   10:23   0:01 /sbin/init\nuser       123  1.2  2.3  45678  9012 pts/0    S+   10:30   0:05 bash\nuser       456  0.5  1.1  23456  4567 pts/0    S+   10:35   0:02 python3\nuser       789  2.1  3.2  67890 12345 pts/0    R+   10:40   0:08 node server.js';
    } else if (cmd === 'top') {
      return 'Tasks: 156 total, 2 running, 154 sleeping\n%Cpu(s):  3.2 us,  1.1 sy,  0.0 ni, 95.7 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st\nKiB Mem :  8048384 total,  2234567 used,  5813817 free,   345678 buffers\nKiB Swap:  2097148 total,        0 used,  2097148 free.  4567890 cached Mem\n\n  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND\n  123 user      20   0   45678   9012   2345 S   1.2  2.3   0:05.67 bash\n  456 user      20   0   23456   4567   1234 S   0.5  1.1   0:02.34 python3';
    } else if (cmd.startsWith('kill ')) {
      const pid = cmd.split(' ')[1];
      return `Process ${pid} terminated`;
    } else if (cmd === 'jobs') {
      return '[1]+  Running    backup.sh &\n[2]-  Stopped    vim report.txt';
    } else if (cmd === 'uname -a' || cmd === 'uname') {
      return 'Linux linuxlearn 5.15.0-56-generic #62-Ubuntu SMP x86_64 x86_64 x86_64 GNU/Linux';
    } else if (cmd === 'df -h' || cmd === 'df') {
      return 'Filesystem      Size  Used Avail Use% Mounted on\n/dev/sda1        50G  12G   36G  25% /\n/dev/sda2       200G  89G  101G  47% /home\ntmpfs           4.0G     0  4.0G   0% /dev/shm';
    } else if (cmd === 'du -h' || cmd === 'du') {
      return '12K     ./documents/projects/website\n8.0K    ./documents/projects/app\n20K     ./documents/projects\n45K     ./documents\n156K    ./downloads\n89K     ./pictures\n234K    ./videos\n67K     ./scripts\n23K     ./config\n45K     ./logs\n1.2M    .';
    } else if (cmd === 'free -h' || cmd === 'free') {
      return '               total        used        free      shared  buff/cache   available\nMem:           7.7Gi       2.1Gi       3.8Gi       234Mi       1.8Gi       5.1Gi\nSwap:          2.0Gi          0B       2.0Gi';
    } else if (cmd === 'uptime') {
      return ' 14:32:15 up 5 days, 12:45,  3 users,  load average: 0.45, 0.32, 0.28';
    } else if (cmd.startsWith('find ')) {
      return './documents/report.txt\n./documents/notes.md\n./documents/projects/website/index.html\n./downloads/backup.tar.gz\n./scripts/backup.sh\n./config/.bashrc';
    } else if (cmd.startsWith('locate ')) {
      return '/home/user/documents/report.txt\n/home/user/scripts/backup.sh\n/var/log/system.log';
    } else if (cmd === 'whoami') {
      return 'user';
    } else if (cmd === 'date') {
      return 'Mon Dec 10 14:32:45 UTC 2024';
    } else if (cmd.startsWith('ping ')) {
      const host = cmd.split(' ')[1];
      return `PING ${host} (93.184.216.34) 56(84) bytes of data.\n64 bytes from ${host} (93.184.216.34): icmp_seq=1 ttl=56 time=12.4 ms\n64 bytes from ${host} (93.184.216.34): icmp_seq=2 ttl=56 time=11.8 ms\n--- ${host} ping statistics ---\n4 packets transmitted, 4 received, 0% packet loss, time 3005ms\nrtt min/avg/max/mdev = 11.456/12.124/12.889/0.542 ms`;
    } else if (cmd.startsWith('wget ')) {
      return 'HTTP request sent, awaiting response... 200 OK\nLength: 15432 (15K) [text/html]\nSaving to: \'index.html\'\n\nindex.html          100%[===================>]  15.07K  --.-KB/s    in 0.001s\n\n2024-12-10 14:32:46 (12.3 MB/s) - \'index.html\' saved [15432/15432]';
    } else {
      return `bash: ${command.split(' ')[0]}: command not found`;
    }
  };

  const useSolution = () => {
    const currentEx = level.exercises[currentExercise];
    const command = currentEx.expectedCommand;
    const output = simulateCommand(command);

    const newHistoryEntry: CommandHistory = {
      command: `$ ${command}`,
      output: output,
      isCorrect: true
    };

    setHistory(prev => [...prev, newHistoryEntry]);

    const newCompleted = [...completedExercises];
    newCompleted[currentExercise] = true;
    setCompletedExercises(newCompleted);

    if (currentExercise < level.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
    } else if (newCompleted.every(Boolean) && !isCompleted) {
      setShowCongratulations(true);
      onLevelComplete();
    }

    setShowHint(false);
    setShowSolution(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    const command = currentInput.trim();
    const output = simulateCommand(command);

    const currentEx = level.exercises[currentExercise];
    const expectedCmd = currentEx.expectedCommand.toLowerCase();
    const inputCmd = command.toLowerCase();

    const isCorrect = inputCmd === expectedCmd || 
                      inputCmd.includes(expectedCmd) ||
                      (expectedCmd.includes('|') && inputCmd.includes(expectedCmd.split('|')[0].trim()));

    const newHistoryEntry: CommandHistory = {
      command: `$ ${command}`,
      output: output,
      isCorrect: isCorrect
    };

    setHistory(prev => [...prev, newHistoryEntry]);

    if (isCorrect && !completedExercises[currentExercise]) {
      const newCompleted = [...completedExercises];
      newCompleted[currentExercise] = true;
      setCompletedExercises(newCompleted);

      if (currentExercise < level.exercises.length - 1) {
        setCurrentExercise(currentExercise + 1);
      } else if (newCompleted.every(Boolean) && !isCompleted) {
        setShowCongratulations(true);
        onLevelComplete();
      }
      setShowHint(false);
      setShowSolution(false);
    }

    setCurrentInput('');
  };

  const allExercisesCompleted = completedExercises.every(Boolean);

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      {showCongratulations && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-trophy-line text-3xl text-green-600"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h2>
            <p className="text-gray-600 mb-4">
              You've successfully completed Level {level.id}: {level.title}
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-center space-x-2 text-yellow-800">
                <i className="ri-coin-line text-2xl"></i>
                <span className="text-xl font-bold">+{level.points} Points Earned!</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowCongratulations(false)}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap cursor-pointer"
              >
                Continue Practicing
              </button>
              <Link href="/levels" className="flex-1">
                <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer">
                  Next Level
                  <i className="ri-arrow-right-line ml-2"></i>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 p-6 border-b">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Exercise {currentExercise + 1} of {level.exercises.length}
          </h3>
          <div className="flex items-center space-x-2">
            {completedExercises.map((completed, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  completed ? 'bg-green-500' : index === currentExercise ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-blue-900 font-medium">
            {level.exercises[currentExercise]?.instruction}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-lg hover:bg-yellow-200 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-lightbulb-line mr-1"></i>
              {showHint ? 'Hide Hint' : 'Show Hint'}
            </button>

            <button
              onClick={() => setShowSolution(!showSolution)}
              className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-lg hover:bg-purple-200 transition-colors whitespace-nowrap cursor-pointer"
            >
              <i className="ri-eye-line mr-1"></i>
              {showSolution ? 'Hide Solution' : 'Show Solution'}
            </button>
          </div>

          {allExercisesCompleted && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-green-600">
                <i className="ri-check-double-line"></i>
                <span className="font-semibold">Level Complete! +{level.points} points</span>
              </div>
            </div>
          )}
        </div>

        {showHint && (
          <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <p className="text-yellow-800 text-sm">
              <i className="ri-information-line mr-1"></i>
              {level.exercises[currentExercise]?.hint}
            </p>
          </div>
        )}

        {showSolution && (
          <div className="mt-3 bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-purple-800 text-sm font-semibold">
                <i className="ri-key-line mr-1"></i>
                Solution:
              </p>
              <button
                onClick={useSolution}
                className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Use This Solution
                <i className="ri-play-line ml-1"></i>
              </button>
            </div>
            <div className="bg-gray-900 rounded-lg p-3">
              <code className="text-green-400 font-mono text-sm">
                $ {level.exercises[currentExercise]?.expectedCommand}
              </code>
            </div>
            <p className="text-purple-700 text-xs mt-2">
              Click "Use This Solution" to automatically execute this command and move to the next exercise.
            </p>
          </div>
        )}
      </div>

      <div className="bg-gray-900 text-green-400 font-mono text-sm">
        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-400 text-xs">Terminal - LinuxLearn Practice</span>
        </div>

        <div 
          ref={terminalRef}
          className="p-4 h-96 overflow-y-auto cursor-text"
          onClick={handleTerminalClick}
        >
          <div className="mb-2 text-gray-400">
            Welcome to LinuxLearn Practice Terminal
          </div>
          <div className="mb-2 text-gray-400">
            Current directory: {currentDirectory}
          </div>
          <div className="mb-2 text-gray-400">
            Complete the exercises above to practice {level.title} commands.
          </div>
          <div className="mb-4 text-gray-400">
            Type your commands below and press Enter. Try 'ls' to explore files!
          </div>

          {history.map((entry, index) => (
            <div key={index} className="mb-2">
              <div className={`${entry.isCorrect ? 'text-green-400' : 'text-yellow-400'}`}>
                {entry.command}
              </div>
              {entry.output && (
                <div className="text-gray-300 whitespace-pre-line ml-2 mb-1">
                  {entry.output}
                </div>
              )}
              {entry.isCorrect && (
                <div className="text-green-500 text-xs ml-2">
                  Correct! Well done.
                </div>
              )}
            </div>
          ))}

          <form onSubmit={handleSubmit} className="flex items-center">
            <span className="text-green-400 mr-2">user@linuxlearn:{currentDirectory}$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              className="flex-1 bg-transparent outline-none text-green-400 caret-green-400"
              placeholder="Type your command here..."
              autoComplete="off"
              spellCheck={false}
              autoFocus
            />
          </form>
        </div>
      </div>
    </div>
  );
}
