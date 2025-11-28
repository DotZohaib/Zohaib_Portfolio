"use client";
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between text-sm">
          {/* Left Side */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-600 dark:text-gray-400">
                Available for new opportunities
              </span>
            </div>
          </div>

          {/* Right Side - Social Links */}
          <div className="flex items-center gap-4">
            <a href="https://github.com/DotZohaib" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" />
            </a>
            <a href="https://www.linkedin.com/in/zohaib-ali-dayo-7862261b5/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-blue-600" />
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=zuhaibalid@gmail.com&su=Contact%20Request&body=Hello%20Zuhaib">
              <Mail className="w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-red-500" />
            </a>
            <a href="https://wa.me/923493237141">
              <ExternalLink className="w-4 h-4 text-gray-600 dark:text-gray-400 hover:text-green-500" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}