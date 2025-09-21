import React from 'react';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  variant = 'default',
  hover = true,
  className = '',
  onClick,
  ...props 
}) => {
  const baseClasses = 'rounded-xl transition-all duration-300';
  
  const variants = {
    default: 'bg-white/80 backdrop-blur-sm border border-white/20 shadow-lg',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg',
    dark: 'bg-gray-800/80 backdrop-blur-sm border border-gray-700/20 shadow-lg',
    gradient: 'bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm border border-white/30 shadow-lg',
    elevated: 'bg-white shadow-2xl border border-gray-100'
  };
  
  const hoverClasses = hover ? 'hover:shadow-xl hover:scale-[1.02] cursor-pointer' : '';
  
  const classes = `${baseClasses} ${variants[variant]} ${hoverClasses} ${className}`;
  
  const MotionCard = motion.div;
  
  return (
    <MotionCard
      className={classes}
      onClick={onClick}
      whileHover={hover ? { y: -5, scale: 1.02 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </MotionCard>
  );
};

export default Card;

