import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false 
}) => {
  const cardVariants = {
    hover: {
      y: -5,
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
    },
  };

  return (
    <motion.div
      variants={hover ? cardVariants : {}}
      whileHover={hover ? 'hover' : {}}
      className={`bg-white rounded-xl shadow-lg border border-gray-100 ${className}`}
    >
      {children}
    </motion.div>
  );
};