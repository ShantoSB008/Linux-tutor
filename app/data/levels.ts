
export interface Level {
  id: number;
  title: string;
  description: string;
  commands: string[];
  points: number;
  estimatedTime: string;
  icon: string;
  color: string;
  tutorial: {
    title: string;
    content: string;
    why: string;
    examples: { command: string; description: string }[];
  };
  exercises: {
    instruction: string;
    expectedCommand: string;
    hint: string;
  }[];
}

export const levelsData: Level[] = [
  {
    id: 1,
    title: "Basic Navigation",
    description: "Learn to navigate the file system with fundamental commands",
    commands: ["pwd", "ls", "cd"],
    points: 50,
    estimatedTime: "10 min",
    icon: "ri-folder-line",
    color: "bg-blue-500",
    tutorial: {
      title: "Navigation Basics",
      content: "Navigation is the foundation of using Linux. These commands help you understand where you are and move around the file system.",
      why: "Every Linux user needs to navigate the file system efficiently. These commands are used constantly in daily tasks, from finding files to organizing directories. Mastering navigation is essential for any Linux operation.",
      examples: [
        { command: "pwd", description: "Shows your current directory location" },
        { command: "ls", description: "Lists files and folders in current directory" },
        { command: "ls -la", description: "Lists all files with detailed information" },
        { command: "cd /home", description: "Changes to the /home directory" },
        { command: "cd ..", description: "Goes up one directory level" }
      ]
    },
    exercises: [
      {
        instruction: "Check your current directory location",
        expectedCommand: "pwd",
        hint: "Use the command that prints the working directory"
      },
      {
        instruction: "List all files in the current directory",
        expectedCommand: "ls",
        hint: "Use the list command"
      },
      {
        instruction: "Change to the documents directory",
        expectedCommand: "cd documents",
        hint: "Use cd followed by the directory name"
      },
      {
        instruction: "List files with detailed information",
        expectedCommand: "ls -l",
        hint: "Use ls with the -l flag for long format"
      }
    ]
  },
  {
    id: 2,
    title: "File Operations",
    description: "Create, copy, move, and delete files and directories",
    commands: ["touch", "mkdir", "cp", "mv", "rm"],
    points: 75,
    estimatedTime: "15 min",
    icon: "ri-file-line",
    color: "bg-green-500",
    tutorial: {
      title: "File Management",
      content: "File operations are essential for organizing and managing your data. Learn to create, copy, move, and remove files efficiently.",
      why: "File management is crucial for maintaining an organized system. Whether you're backing up important files, organizing projects, or cleaning up disk space, these commands are indispensable for daily Linux usage.",
      examples: [
        { command: "touch myfile.txt", description: "Creates an empty file named myfile.txt" },
        { command: "mkdir newfolder", description: "Creates a new directory called newfolder" },
        { command: "cp file1.txt file2.txt", description: "Copies file1.txt to file2.txt" },
        { command: "mv oldname.txt newname.txt", description: "Renames oldname.txt to newname.txt" },
        { command: "rm unwanted.txt", description: "Deletes the unwanted.txt file" }
      ]
    },
    exercises: [
      {
        instruction: "Create a new file called 'test.txt'",
        expectedCommand: "touch test.txt",
        hint: "Use touch to create an empty file"
      },
      {
        instruction: "Create a directory named 'backup'",
        expectedCommand: "mkdir backup",
        hint: "Use mkdir to create a new directory"
      },
      {
        instruction: "Copy report.txt to backup_report.txt",
        expectedCommand: "cp report.txt backup_report.txt",
        hint: "Use cp followed by source and destination"
      }
    ]
  },
  {
    id: 3,
    title: "File Permissions",
    description: "Understand and modify file permissions and ownership",
    commands: ["chmod", "chown", "ls -l"],
    points: 100,
    estimatedTime: "20 min",
    icon: "ri-shield-line",
    color: "bg-yellow-500",
    tutorial: {
      title: "File Permissions & Security",
      content: "File permissions control who can read, write, or execute files. This is fundamental to Linux security and multi-user systems.",
      why: "Understanding permissions is crucial for system security, collaboration, and preventing unauthorized access. It's essential for server administration, development environments, and protecting sensitive data.",
      examples: [
        { command: "ls -l", description: "Shows detailed file information including permissions" },
        { command: "chmod 755 script.sh", description: "Sets read/write/execute for owner, read/execute for others" },
        { command: "chmod +x program", description: "Makes a file executable" },
        { command: "chown user:group file.txt", description: "Changes file ownership to user and group" }
      ]
    },
    exercises: [
      {
        instruction: "List files with detailed permissions",
        expectedCommand: "ls -l",
        hint: "Use ls with the -l flag for long format"
      },
      {
        instruction: "Make a file executable for everyone",
        expectedCommand: "chmod +x test.txt",
        hint: "Use chmod +x to add execute permission"
      }
    ]
  },
  {
    id: 4,
    title: "Text Processing",
    description: "Work with text files using cat, grep, and other tools",
    commands: ["cat", "grep", "head", "tail", "wc"],
    points: 90,
    estimatedTime: "18 min",
    icon: "ri-file-text-line",
    color: "bg-purple-500",
    tutorial: {
      title: "Text File Processing",
      content: "Text processing is powerful in Linux. Learn to view, search, and analyze text files efficiently.",
      why: "Text processing is essential for log analysis, configuration file management, data extraction, and automation. These skills are vital for system administration, development, and data analysis tasks.",
      examples: [
        { command: "cat file.txt", description: "Displays the entire contents of file.txt" },
        { command: "grep 'pattern' file.txt", description: "Searches for 'pattern' in file.txt" },
        { command: "head -10 file.txt", description: "Shows first 10 lines of file.txt" },
        { command: "tail -f logfile.log", description: "Follows new lines added to logfile.log" },
        { command: "wc -l file.txt", description: "Counts lines in file.txt" }
      ]
    },
    exercises: [
      {
        instruction: "Display the contents of notes.md file",
        expectedCommand: "cat notes.md",
        hint: "Use cat to display file contents"
      },
      {
        instruction: "Search for the word 'Linux' in report.txt",
        expectedCommand: "grep Linux report.txt",
        hint: "Use grep to search for patterns in files"
      },
      {
        instruction: "Count the lines in report.txt",
        expectedCommand: "wc -l report.txt",
        hint: "Use wc -l to count lines in a file"
      }
    ]
  },
  {
    id: 5,
    title: "Process Management",
    description: "Monitor and control running processes",
    commands: ["ps", "top", "kill", "killall", "jobs"],
    points: 120,
    estimatedTime: "22 min",
    icon: "ri-cpu-line",
    color: "bg-red-500",
    tutorial: {
      title: "Process Management",
      content: "Learn to monitor system processes, check resource usage, and control running applications.",
      why: "Process management is critical for system performance, troubleshooting, and resource optimization. These skills help identify problematic processes, monitor system health, and maintain optimal performance.",
      examples: [
        { command: "ps aux", description: "Lists all running processes with details" },
        { command: "top", description: "Shows real-time process information and system stats" },
        { command: "kill 1234", description: "Terminates process with ID 1234" },
        { command: "killall firefox", description: "Terminates all processes named firefox" },
        { command: "jobs", description: "Shows jobs running in current terminal" }
      ]
    },
    exercises: [
      {
        instruction: "List all running processes",
        expectedCommand: "ps aux",
        hint: "Use ps aux to see all processes"
      },
      {
        instruction: "Show real-time system processes",
        expectedCommand: "top",
        hint: "Use top to see live process information"
      },
      {
        instruction: "Show background jobs in current terminal",
        expectedCommand: "jobs",
        hint: "Use jobs to see running background tasks"
      }
    ]
  },
  {
    id: 6,
    title: "System Information",
    description: "Get information about your system and hardware",
    commands: ["uname", "df", "du", "free", "uptime"],
    points: 85,
    estimatedTime: "15 min",
    icon: "ri-computer-line",
    color: "bg-indigo-500",
    tutorial: {
      title: "System Information Commands",
      content: "Monitor system resources, check disk usage, and gather information about your Linux system.",
      why: "System monitoring is essential for maintaining healthy systems, planning capacity, troubleshooting performance issues, and ensuring optimal resource utilization in both personal and server environments.",
      examples: [
        { command: "uname -a", description: "Shows detailed system information" },
        { command: "df -h", description: "Displays disk space usage in human-readable format" },
        { command: "du -sh folder", description: "Shows size of folder in human-readable format" },
        { command: "free -h", description: "Shows memory usage information" },
        { command: "uptime", description: "Shows how long system has been running" }
      ]
    },
    exercises: [
      {
        instruction: "Check disk space usage",
        expectedCommand: "df -h",
        hint: "Use df -h to see disk usage in readable format"
      },
      {
        instruction: "Check available memory",
        expectedCommand: "free -h",
        hint: "Use free -h to see memory usage"
      },
      {
        instruction: "Check system uptime",
        expectedCommand: "uptime",
        hint: "Use uptime to see how long the system has been running"
      }
    ]
  },
  {
    id: 7,
    title: "Network Commands",
    description: "Basic networking tools and connectivity testing",
    commands: ["ping", "wget", "curl", "netstat", "ss"],
    points: 95,
    estimatedTime: "18 min",
    icon: "ri-wifi-line",
    color: "bg-teal-500",
    tutorial: {
      title: "Network Diagnostics",
      content: "Learn essential networking commands for connectivity testing, file downloading, and network analysis.",
      why: "Network commands are vital for troubleshooting connectivity issues, downloading files, testing server responses, and monitoring network connections in both development and production environments.",
      examples: [
        { command: "ping google.com", description: "Tests connectivity to google.com" },
        { command: "wget https://example.com/file.zip", description: "Downloads file.zip from example.com" },
        { command: "curl -I https://example.com", description: "Gets HTTP headers from example.com" },
        { command: "netstat -tuln", description: "Shows listening network ports" },
        { command: "ss -tuln", description: "Modern alternative to netstat" }
      ]
    },
    exercises: [
      {
        instruction: "Test connectivity to google.com",
        expectedCommand: "ping google.com",
        hint: "Use ping to test network connectivity"
      },
      {
        instruction: "Download a file using wget",
        expectedCommand: "wget https://example.com/file.txt",
        hint: "Use wget followed by the URL"
      }
    ]
  },
  {
    id: 8,
    title: "Archives & Compression",
    description: "Create and extract compressed archives",
    commands: ["tar", "gzip", "gunzip", "zip", "unzip"],
    points: 110,
    estimatedTime: "20 min",
    icon: "ri-archive-line",
    color: "bg-orange-500",
    tutorial: {
      title: "File Compression & Archives",
      content: "Learn to create, compress, and extract archives for efficient file storage and transfer.",
      why: "Archive management is essential for backup strategies, software distribution, file transfer optimization, and storage space management. These skills are crucial for system administration and development workflows.",
      examples: [
        { command: "tar -czf archive.tar.gz folder/", description: "Creates compressed archive of folder" },
        { command: "tar -xzf archive.tar.gz", description: "Extracts compressed archive" },
        { command: "gzip file.txt", description: "Compresses file.txt to file.txt.gz" },
        { command: "zip -r backup.zip documents/", description: "Creates zip archive of documents folder" },
        { command: "unzip backup.zip", description: "Extracts zip archive" }
      ]
    },
    exercises: [
      {
        instruction: "Create a compressed tar archive of documents directory",
        expectedCommand: "tar -czf documents.tar.gz documents/",
        hint: "Use tar -czf to create compressed archive"
      },
      {
        instruction: "Extract a tar.gz archive",
        expectedCommand: "tar -xzf backup.tar.gz",
        hint: "Use tar -xzf to extract compressed archive"
      }
    ]
  },
  {
    id: 9,
    title: "Advanced Text Processing",
    description: "Master advanced text manipulation with awk, sed, and more",
    commands: ["awk", "sed", "sort", "uniq", "cut"],
    points: 130,
    estimatedTime: "25 min",
    icon: "ri-code-line",
    color: "bg-pink-500",
    tutorial: {
      title: "Advanced Text Manipulation",
      content: "Master powerful text processing tools for data extraction, transformation, and analysis.",
      why: "Advanced text processing is invaluable for log analysis, data processing, configuration management, and automation scripts. These tools can replace complex programming tasks with simple command-line operations.",
      examples: [
        { command: "awk '{print $1}' file.txt", description: "Prints first column of each line" },
        { command: "sed 's/old/new/g' file.txt", description: "Replaces 'old' with 'new' in file" },
        { command: "sort file.txt", description: "Sorts lines in file alphabetically" },
        { command: "uniq -c sorted.txt", description: "Counts unique lines in sorted file" },
        { command: "cut -d',' -f2 data.csv", description: "Extracts second column from CSV" }
      ]
    },
    exercises: [
      {
        instruction: "Print the first column of a file using awk",
        expectedCommand: "awk '{print $1}' report.txt",
        hint: "Use awk to print specific columns"
      },
      {
        instruction: "Replace text in a file using sed",
        expectedCommand: "sed 's/Linux/GNU-Linux/g' notes.md",
        hint: "Use sed with s/old/new/g pattern"
      }
    ]
  },
  {
    id: 10,
    title: "Shell Scripting Basics",
    description: "Introduction to bash scripting and automation",
    commands: ["bash", "echo", "read", "if", "for"],
    points: 150,
    estimatedTime: "30 min",
    icon: "ri-terminal-box-line",
    color: "bg-gray-700",
    tutorial: {
      title: "Shell Scripting Fundamentals",
      content: "Learn to create bash scripts for automation and combining multiple commands into reusable programs.",
      why: "Shell scripting enables automation of repetitive tasks, system administration, deployment processes, and complex workflows. It's essential for DevOps, system administration, and efficient command-line productivity.",
      examples: [
        { command: "#!/bin/bash", description: "Shebang line to specify bash interpreter" },
        { command: "echo 'Hello World'", description: "Prints text to terminal" },
        { command: "read -p 'Enter name: ' name", description: "Prompts user for input" },
        { command: "if [ -f file.txt ]; then echo 'exists'; fi", description: "Conditional check if file exists" },
        { command: "for i in {1..5}; do echo $i; done", description: "Loop that prints numbers 1-5" }
      ]
    },
    exercises: [
      {
        instruction: "Print 'Hello Linux' to the terminal",
        expectedCommand: "echo 'Hello Linux'",
        hint: "Use echo to print text"
      },
      {
        instruction: "Create a simple for loop that counts from 1 to 3",
        expectedCommand: "for i in {1..3}; do echo $i; done",
        hint: "Use for loop with range {1..3}"
      }
    ]
  },
  {
    id: 11,
    title: "File Search and Find",
    description: "Master file searching with find, locate, and which commands",
    commands: ["find", "locate", "which", "whereis", "type"],
    points: 105,
    estimatedTime: "20 min",
    icon: "ri-search-line",
    color: "bg-cyan-500",
    tutorial: {
      title: "File Search Mastery",
      content: "Learn powerful search commands to locate files, directories, and executables across your system.",
      why: "File searching is essential for system administration, debugging, and efficient file management. These commands help you quickly locate resources, troubleshoot missing files, and understand your system structure.",
      examples: [
        { command: "find /home -name '*.txt'", description: "Finds all .txt files in /home directory" },
        { command: "find . -type d -name 'project*'", description: "Finds directories starting with 'project'" },
        { command: "locate filename.txt", description: "Quickly locates filename.txt using database" },
        { command: "which python", description: "Shows path to python executable" },
        { command: "whereis bash", description: "Shows locations of bash binary and manual" }
      ]
    },
    exercises: [
      {
        instruction: "Find all .txt files in the current directory and subdirectories",
        expectedCommand: "find . -name '*.txt'",
        hint: "Use find with -name pattern to search for files"
      },
      {
        instruction: "Locate the bash executable path",
        expectedCommand: "which bash",
        hint: "Use which to find executable locations"
      },
      {
        instruction: "Find all directories named 'projects'",
        expectedCommand: "find . -type d -name 'projects'",
        hint: "Use find with -type d to search for directories"
      }
    ]
  },
  {
    id: 12,
    title: "Environment Variables",
    description: "Work with environment variables and system configuration",
    commands: ["env", "export", "echo $VAR", "printenv", "set"],
    points: 95,
    estimatedTime: "18 min",
    icon: "ri-settings-3-line",
    color: "bg-emerald-500",
    tutorial: {
      title: "Environment Configuration",
      content: "Master environment variables to configure your shell environment and system behavior.",
      why: "Environment variables control application behavior, system paths, and user preferences. Understanding them is crucial for software development, system administration, and customizing your Linux experience.",
      examples: [
        { command: "env", description: "Lists all environment variables" },
        { command: "export PATH=$PATH:/new/path", description: "Adds a new directory to PATH" },
        { command: "echo $HOME", description: "Displays the HOME variable value" },
        { command: "printenv USER", description: "Shows specific environment variable" },
        { command: "export EDITOR=vim", description: "Sets default text editor" }
      ]
    },
    exercises: [
      {
        instruction: "Display your home directory path",
        expectedCommand: "echo $HOME",
        hint: "Use echo with $HOME variable"
      },
      {
        instruction: "List all environment variables",
        expectedCommand: "env",
        hint: "Use env command to see all variables"
      },
      {
        instruction: "Show your current username",
        expectedCommand: "echo $USER",
        hint: "Use echo with $USER variable"
      }
    ]
  },
  {
    id: 13,
    title: "Package Management",
    description: "Install and manage software packages",
    commands: ["apt", "apt-get", "dpkg", "snap", "flatpak"],
    points: 115,
    estimatedTime: "22 min",
    icon: "ri-download-line",
    color: "bg-violet-500",
    tutorial: {
      title: "Software Package Management",
      content: "Learn to install, update, and remove software packages using various package managers.",
      why: "Package management is essential for maintaining software, security updates, and installing new applications. Modern Linux systems rely heavily on package managers for software distribution and dependency resolution.",
      examples: [
        { command: "apt update", description: "Updates package repository information" },
        { command: "apt install vim", description: "Installs vim text editor" },
        { command: "apt remove firefox", description: "Removes firefox package" },
        { command: "dpkg -l", description: "Lists all installed packages" },
        { command: "snap list", description: "Shows installed snap packages" }
      ]
    },
    exercises: [
      {
        instruction: "Update package repository information",
        expectedCommand: "apt update",
        hint: "Use apt update to refresh package lists"
      },
      {
        instruction: "List all installed packages",
        expectedCommand: "dpkg -l",
        hint: "Use dpkg -l to see installed packages"
      }
    ]
  },
  {
    id: 14,
    title: "System Monitoring",
    description: "Monitor system performance and resource usage",
    commands: ["htop", "iotop", "vmstat", "iostat", "lsof"],
    points: 125,
    estimatedTime: "24 min",
    icon: "ri-pulse-line",
    color: "bg-rose-500",
    tutorial: {
      title: "Advanced System Monitoring",
      content: "Master advanced monitoring tools to analyze system performance, resource usage, and troubleshoot issues.",
      why: "System monitoring is critical for maintaining optimal performance, identifying bottlenecks, and preventing system failures. These skills are essential for system administrators and DevOps professionals.",
      examples: [
        { command: "htop", description: "Interactive process viewer with real-time updates" },
        { command: "iotop", description: "Shows disk I/O usage by processes" },
        { command: "vmstat 5", description: "Reports virtual memory statistics every 5 seconds" },
        { command: "iostat -x 1", description: "Shows extended disk statistics every second" },
        { command: "lsof -i", description: "Lists open network connections" }
      ]
    },
    exercises: [
      {
        instruction: "Show interactive process monitor",
        expectedCommand: "htop",
        hint: "Use htop for interactive process monitoring"
      },
      {
        instruction: "Display virtual memory statistics",
        expectedCommand: "vmstat",
        hint: "Use vmstat to see memory and system stats"
      }
    ]
  },
  {
    id: 15,
    title: "Advanced Networking",
    description: "Advanced network configuration and troubleshooting",
    commands: ["netstat", "ss", "nmap", "tcpdump", "iptables"],
    points: 140,
    estimatedTime: "26 min",
    icon: "ri-global-line",
    color: "bg-sky-500",
    tutorial: {
      title: "Network Administration",
      content: "Learn advanced networking commands for configuration, monitoring, and security management.",
      why: "Network administration skills are crucial for server management, security, and troubleshooting connectivity issues. These tools are essential for network engineers and system administrators.",
      examples: [
        { command: "netstat -tuln", description: "Shows listening ports and connections" },
        { command: "ss -tulpn", description: "Modern replacement for netstat with process info" },
        { command: "nmap -sn 192.168.1.0/24", description: "Scans network for active hosts" },
        { command: "tcpdump -i eth0", description: "Captures network packets on eth0 interface" },
        { command: "iptables -L", description: "Lists current firewall rules" }
      ]
    },
    exercises: [
      {
        instruction: "Show all listening network ports",
        expectedCommand: "netstat -tuln",
        hint: "Use netstat -tuln to see listening ports"
      },
      {
        instruction: "Show network connections with process information",
        expectedCommand: "ss -tulpn",
        hint: "Use ss -tulpn for detailed connection info"
      }
    ]
  }
];
