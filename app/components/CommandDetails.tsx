'use client';

import { useState } from 'react';

interface CommandDetailsProps {
  commands: string[];
}

interface CommandInfo {
  [key: string]: {
    description: string;
    usage: string;
    why: string;
    examples: { command: string; explanation: string }[];
    options: { flag: string; description: string }[];
  };
}

const commandDatabase: CommandInfo = {
  pwd: {
    description: "Prints the current working directory path",
    usage: "pwd [OPTION]",
    why: "Essential for navigation - helps you understand your current location in the file system. Every Linux user needs to know where they are before performing operations.",
    examples: [
      { command: "pwd", explanation: "Shows current directory like /home/user/documents" },
    ],
    options: [
      { flag: "-L", description: "Print logical path (follow symbolic links)" },
      { flag: "-P", description: "Print physical path (avoid symbolic links)" }
    ]
  },
  ls: {
    description: "Lists directory contents and file information",
    usage: "ls [OPTION] [FILE]",
    why: "Fundamental for file system exploration. You need to see what files and directories exist before you can work with them. One of the most used Linux commands.",
    examples: [
      { command: "ls", explanation: "Lists files and directories in current location" },
      { command: "ls -l", explanation: "Shows detailed info: permissions, size, date" },
      { command: "ls -la", explanation: "Includes hidden files (starting with .)" },
      { command: "ls -lh", explanation: "Human-readable file sizes (KB, MB, GB)" }
    ],
    options: [
      { flag: "-l", description: "Long format with detailed information" },
      { flag: "-a", description: "Show hidden files (starting with .)" },
      { flag: "-h", description: "Human-readable file sizes" },
      { flag: "-t", description: "Sort by modification time" },
      { flag: "-r", description: "Reverse order" }
    ]
  },
  cd: {
    description: "Changes the current working directory",
    usage: "cd [DIRECTORY]",
    why: "Essential for navigation. You need to move between directories to organize files, run programs, and access different parts of your system efficiently.",
    examples: [
      { command: "cd /home/user", explanation: "Go to specific directory path" },
      { command: "cd ..", explanation: "Go up one directory level" },
      { command: "cd ~", explanation: "Go to home directory" },
      { command: "cd -", explanation: "Go to previous directory" }
    ],
    options: [
      { flag: "~", description: "Home directory shortcut" },
      { flag: "..", description: "Parent directory" },
      { flag: "-", description: "Previous directory" },
      { flag: "/", description: "Root directory" }
    ]
  },
  touch: {
    description: "Creates empty files or updates file timestamps",
    usage: "touch [OPTION] FILE",
    why: "Quick way to create empty files for testing, scripting, or as placeholders. Also used to update file modification times without changing content.",
    examples: [
      { command: "touch newfile.txt", explanation: "Creates empty file named newfile.txt" },
      { command: "touch file1.txt file2.txt", explanation: "Creates multiple files at once" },
      { command: "touch -t 202312251200 file.txt", explanation: "Sets specific timestamp" }
    ],
    options: [
      { flag: "-t", description: "Set specific timestamp" },
      { flag: "-d", description: "Set timestamp using date string" },
      { flag: "-c", description: "Don't create file if it doesn't exist" }
    ]
  },
  mkdir: {
    description: "Creates directories (folders)",
    usage: "mkdir [OPTION] DIRECTORY",
    why: "Essential for organizing files. Create directory structures to keep your system organized and projects well-structured. Fundamental for file management.",
    examples: [
      { command: "mkdir newfolder", explanation: "Creates directory named newfolder" },
      { command: "mkdir -p path/to/deep/folder", explanation: "Creates nested directories" },
      { command: "mkdir folder1 folder2 folder3", explanation: "Creates multiple directories" }
    ],
    options: [
      { flag: "-p", description: "Create parent directories as needed" },
      { flag: "-m", description: "Set permissions for new directory" },
      { flag: "-v", description: "Verbose output showing what's created" }
    ]
  },
  cp: {
    description: "Copies files and directories",
    usage: "cp [OPTION] SOURCE DESTINATION",
    why: "Critical for backup, file duplication, and moving data. Essential for protecting important files and distributing content across your system.",
    examples: [
      { command: "cp file.txt backup.txt", explanation: "Copy file to new name" },
      { command: "cp file.txt /home/user/", explanation: "Copy to different directory" },
      { command: "cp -r folder/ backup_folder/", explanation: "Copy entire directory" }
    ],
    options: [
      { flag: "-r", description: "Copy directories recursively" },
      { flag: "-i", description: "Prompt before overwriting" },
      { flag: "-v", description: "Verbose output" },
      { flag: "-p", description: "Preserve file attributes" }
    ]
  },
  mv: {
    description: "Moves or renames files and directories",
    usage: "mv [OPTION] SOURCE DESTINATION",
    why: "Essential for file organization and renaming. Unlike copy, it moves files to new locations or gives them new names without duplicating data.",
    examples: [
      { command: "mv oldname.txt newname.txt", explanation: "Rename file" },
      { command: "mv file.txt /home/user/", explanation: "Move file to directory" },
      { command: "mv *.txt documents/", explanation: "Move all txt files" }
    ],
    options: [
      { flag: "-i", description: "Prompt before overwriting" },
      { flag: "-v", description: "Verbose output" },
      { flag: "-n", description: "Never overwrite existing files" }
    ]
  },
  rm: {
    description: "Removes (deletes) files and directories",
    usage: "rm [OPTION] FILE",
    why: "Necessary for cleaning up disk space and removing unwanted files. Be careful - deleted files are usually not recoverable. Essential for system maintenance.",
    examples: [
      { command: "rm file.txt", explanation: "Delete single file" },
      { command: "rm -r folder/", explanation: "Delete directory and contents" },
      { command: "rm -i *.txt", explanation: "Delete with confirmation prompt" }
    ],
    options: [
      { flag: "-r", description: "Remove directories recursively" },
      { flag: "-i", description: "Prompt before each removal" },
      { flag: "-f", description: "Force removal without prompts" },
      { flag: "-v", description: "Verbose output" }
    ]
  },
  chmod: {
    description: "Changes file permissions and access rights",
    usage: "chmod [OPTION] MODE FILE",
    why: "Critical for security - controls who can read, write, or execute files. Essential for multi-user systems, server administration, and protecting sensitive data.",
    examples: [
      { command: "chmod 755 script.sh", explanation: "Make file executable for owner, readable for others" },
      { command: "chmod +x program", explanation: "Add execute permission" },
      { command: "chmod u+w file.txt", explanation: "Give write permission to user" }
    ],
    options: [
      { flag: "+x", description: "Add execute permission" },
      { flag: "-w", description: "Remove write permission" },
      { flag: "u", description: "User (owner) permissions" },
      { flag: "g", description: "Group permissions" },
      { flag: "o", description: "Other users permissions" }
    ]
  },
  cat: {
    description: "Displays file contents or concatenates files",
    usage: "cat [OPTION] FILE",
    why: "Quick way to view file contents without opening an editor. Essential for reading configuration files, logs, and small text files. Very commonly used.",
    examples: [
      { command: "cat file.txt", explanation: "Display entire file content" },
      { command: "cat file1.txt file2.txt", explanation: "Display multiple files" },
      { command: "cat -n file.txt", explanation: "Show with line numbers" }
    ],
    options: [
      { flag: "-n", description: "Number all output lines" },
      { flag: "-b", description: "Number non-empty lines" },
      { flag: "-s", description: "Suppress multiple blank lines" }
    ]
  },
  grep: {
    description: "Searches for patterns in text files",
    usage: "grep [OPTION] PATTERN FILE",
    why: "Powerful for finding specific text in files. Essential for log analysis, code searching, and data extraction. One of the most important text processing tools.",
    examples: [
      { command: "grep 'error' logfile.txt", explanation: "Find lines containing 'error'" },
      { command: "grep -i 'linux' file.txt", explanation: "Case-insensitive search" },
      { command: "grep -r 'function' .", explanation: "Search in all files recursively" }
    ],
    options: [
      { flag: "-i", description: "Case-insensitive search" },
      { flag: "-r", description: "Search recursively in directories" },
      { flag: "-n", description: "Show line numbers" },
      { flag: "-v", description: "Invert match (show non-matching lines)" }
    ]
  },
  ps: {
    description: "Displays information about running processes",
    usage: "ps [OPTION]",
    why: "Essential for system monitoring and troubleshooting. Shows what programs are running, their resource usage, and process IDs for management.",
    examples: [
      { command: "ps aux", explanation: "Show all processes with detailed info" },
      { command: "ps -ef", explanation: "Show all processes in full format" },
      { command: "ps -u username", explanation: "Show processes for specific user" }
    ],
    options: [
      { flag: "aux", description: "All processes with user and resource info" },
      { flag: "-ef", description: "Full format listing" },
      { flag: "-u", description: "Processes for specific user" }
    ]
  },
  top: {
    description: "Displays real-time system processes and resource usage",
    usage: "top [OPTION]",
    why: "Critical for system monitoring - shows live CPU, memory usage, and running processes. Essential for performance troubleshooting and system administration.",
    examples: [
      { command: "top", explanation: "Show real-time process information" },
      { command: "top -u username", explanation: "Show processes for specific user" },
      { command: "top -p 1234", explanation: "Monitor specific process ID" }
    ],
    options: [
      { flag: "-u", description: "Show processes for specific user" },
      { flag: "-p", description: "Monitor specific process ID" },
      { flag: "-d", description: "Set refresh interval in seconds" }
    ]
  },
  find: {
    description: "Searches for files and directories in the filesystem",
    usage: "find [PATH] [EXPRESSION]",
    why: "Powerful file location tool. Essential when you need to locate files by name, type, size, or other attributes across your entire system or specific directories.",
    examples: [
      { command: "find . -name '*.txt'", explanation: "Find all .txt files in current directory" },
      { command: "find /home -type d -name 'project*'", explanation: "Find directories starting with 'project'" },
      { command: "find . -size +1M", explanation: "Find files larger than 1MB" }
    ],
    options: [
      { flag: "-name", description: "Search by filename pattern" },
      { flag: "-type", description: "Search by file type (f=file, d=directory)" },
      { flag: "-size", description: "Search by file size" },
      { flag: "-exec", description: "Execute command on found files" }
    ]
  },
  which: {
    description: "Locates executable files in the system PATH",
    usage: "which PROGRAM",
    why: "Helps you find where programs are installed. Essential for troubleshooting command not found errors and understanding your system's executable locations.",
    examples: [
      { command: "which python", explanation: "Find location of python executable" },
      { command: "which -a python", explanation: "Show all locations of python" },
      { command: "which bash", explanation: "Find bash shell location" }
    ],
    options: [
      { flag: "-a", description: "Show all matching executables in PATH" }
    ]
  }
};

export default function CommandDetails({ commands }: CommandDetailsProps) {
  const [selectedCommand, setSelectedCommand] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const handleCommandClick = (command: string) => {
    setSelectedCommand(command);
    setShowDetails(true);
  };

  return (
    <>
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Commands in This Level</h3>
        <div className="flex flex-wrap gap-3">
          {commands.map((command, index) => (
            <button
              key={index}
              onClick={() => handleCommandClick(command)}
              className="px-4 py-2 bg-blue-50 text-blue-800 rounded-lg border border-blue-200 hover:bg-blue-100 transition-colors cursor-pointer font-mono"
            >
              {command}
              <i className="ri-information-line ml-2"></i>
            </button>
          ))}
        </div>
      </div>

      {showDetails && selectedCommand && commandDatabase[selectedCommand] && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <i className="ri-terminal-line text-blue-600 text-2xl"></i>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 font-mono">{selectedCommand}</h2>
                  <p className="text-gray-600">{commandDatabase[selectedCommand].description}</p>
                </div>
              </div>
              <button
                onClick={() => setShowDetails(false)}
                className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
              >
                <i className="ri-close-line text-gray-600"></i>
              </button>
            </div>

            <div className="space-y-6">
              {/* Why Use This Command */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
                  <i className="ri-question-line mr-2"></i>
                  Why Use This Command?
                </h3>
                <p className="text-blue-800 leading-relaxed">
                  {commandDatabase[selectedCommand].why}
                </p>
              </div>

              {/* Usage Syntax */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <i className="ri-code-line mr-2"></i>
                  Usage Syntax
                </h3>
                <div className="bg-gray-900 rounded-lg p-4">
                  <code className="text-green-400 font-mono">
                    {commandDatabase[selectedCommand].usage}
                  </code>
                </div>
              </div>

              {/* Examples */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <i className="ri-play-line mr-2"></i>
                  Practical Examples
                </h3>
                <div className="space-y-4">
                  {commandDatabase[selectedCommand].examples.map((example, index) => (
                    <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <div className="bg-gray-900 rounded-lg p-3 mb-2">
                        <code className="text-green-400 font-mono text-sm">
                          $ {example.command}
                        </code>
                      </div>
                      <p className="text-gray-700 text-sm">{example.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Options & Flags */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <i className="ri-settings-3-line mr-2"></i>
                  Common Options & Flags
                </h3>
                <div className="grid gap-3">
                  {commandDatabase[selectedCommand].options.map((option, index) => (
                    <div key={index} className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
                      <code className="font-mono text-purple-600 bg-purple-100 px-2 py-1 rounded text-sm min-w-fit">
                        {option.flag}
                      </code>
                      <p className="text-gray-700 text-sm">{option.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close Button */}
              <div className="flex justify-end pt-4 border-t">
                <button
                  onClick={() => setShowDetails(false)}
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Got It!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}