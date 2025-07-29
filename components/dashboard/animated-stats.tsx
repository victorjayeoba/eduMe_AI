'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Award, Zap, Crown, Medal } from 'lucide-react';

interface AnimatedStatsProps {
  xp: number;
  position: number;
  totalUsers: number;
  streak: number;
}

export function AnimatedStats({ 
  xp = 1250, 
  position = 3, 
  totalUsers = 256, 
  streak = 7 
}: AnimatedStatsProps) {
  const [isXpHovered, setIsXpHovered] = useState(false);
  const [isPositionHovered, setIsPositionHovered] = useState(false);
  const [isStreakHovered, setIsStreakHovered] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  // Function to render position icon based on ranking
  const renderPositionIcon = () => {
    if (position === 1) {
      return <Crown className={`${isPositionHovered ? "text-amber-500" : "text-gray-500"} h-4 w-4`} />;
    } else if (position === 2) {
      return <Trophy className={`${isPositionHovered ? "text-zinc-400" : "text-gray-500"} h-4 w-4`} />;
    } else if (position === 3) {
      return <Medal className={`${isPositionHovered ? "text-amber-700" : "text-gray-500"} h-4 w-4`} />;
    } else {
      return null;
    }
  };

  // Function to get appropriate background color
  const getBackgroundColor = (isHovered: boolean, type: string) => {
    if (!isHovered) return "bg-gray-100";

    switch (type) {
      case 'xp':
        return "bg-gradient-to-r from-indigo-100 to-blue-100";
      case 'position':
        return position <= 3 ? "bg-gradient-to-r from-amber-50 to-yellow-100" : "bg-gray-100";
      case 'streak':
        return "bg-gradient-to-r from-red-50 to-orange-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <motion.div 
      className="flex items-center space-x-3"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* XP Counter */}
      <motion.div
        className={`flex items-center px-3 py-1.5 rounded-full transition-all duration-300 ${getBackgroundColor(isXpHovered, 'xp')}`}
        onMouseEnter={() => setIsXpHovered(true)}
        onMouseLeave={() => setIsXpHovered(false)}
        variants={itemVariants}
        whileHover={{ 
          scale: 1.05, 
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" 
        }}
      >
        <motion.div 
          animate={isXpHovered ? { 
            rotateZ: [0, -10, 10, -5, 5, 0],
            scale: [1, 1.2, 1],
            transition: { duration: 0.5 }
          } : {}}
        >
          <Zap className={`h-4 w-4 mr-1.5 ${isXpHovered ? "text-blue-500" : "text-gray-500"}`} />
        </motion.div>
        <span className="text-xs font-medium">
          <span className="font-bold">{xp.toLocaleString()}</span> XP
        </span>
      </motion.div>

      {/* Position */}
      <motion.div
        className={`flex items-center px-3 py-1.5 rounded-full transition-all duration-300 ${getBackgroundColor(isPositionHovered, 'position')}`}
        onMouseEnter={() => setIsPositionHovered(true)}
        onMouseLeave={() => setIsPositionHovered(false)}
        variants={itemVariants}
        whileHover={{ 
          scale: 1.05, 
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" 
        }}
      >
        {position <= 3 ? (
          <motion.div 
            animate={isPositionHovered ? { 
              rotateY: [0, 360],
              transition: { duration: 0.8 }
            } : {}}
            className="mr-1.5"
          >
            {renderPositionIcon()}
          </motion.div>
        ) : null}
        <span className="text-xs font-medium">
          {position <= 3 ? (
            <span className="font-bold">#{position}</span>
          ) : (
            <span>
              <span className="font-bold">{position}</span>/{totalUsers}
            </span>
          )}
        </span>
      </motion.div>

      {/* Streak */}
      <motion.div
        className={`flex items-center px-3 py-1.5 rounded-full transition-all duration-300 ${getBackgroundColor(isStreakHovered, 'streak')}`}
        onMouseEnter={() => setIsStreakHovered(true)}
        onMouseLeave={() => setIsStreakHovered(false)}
        variants={itemVariants}
        whileHover={{ 
          scale: 1.05, 
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)" 
        }}
      >
        <motion.div 
          animate={isStreakHovered ? {
            scale: [1, 1.3, 1],
            transition: { 
              repeat: 1,
              repeatType: "reverse",
              duration: 0.3
            }
          } : {}}
        >
          <Award className={`h-4 w-4 mr-1.5 ${isStreakHovered ? "text-orange-500" : "text-gray-500"}`} />
        </motion.div>
        <span className="text-xs font-medium">
          <span className="font-bold">{streak}</span> Day Streak
        </span>
        {isStreakHovered && (
          <motion.div 
            className="flex ml-1.5"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { 
                opacity: 1,
                transition: {
                  staggerChildren: 0.05
                }
              }
            }}
          >
            {[...Array(Math.min(streak, 5))].map((_, i) => (
              <motion.div 
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-orange-400 mx-0.5"
                variants={{
                  hidden: { opacity: 0, scale: 0 },
                  visible: { 
                    opacity: 1, 
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300
                    }
                  }
                }}
              />
            ))}
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
} 