// src/components/ui/button.jsx
import React from 'react';
import clsx from 'clsx'; // Install this if necessary: npm install clsx

const Button = ({ children, variant = 'primary', size = 'md', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-md focus:outline-none transition';
  const variants = {
    primary: 'bg-blue-700 text-white hover:bg-blue-800',
    outline: 'border border-1 border-blue-700 text-blue-700 hover:bg-blue-100',
    ghost: 'text-blue-700 hover:bg-gray-200',
  };
  const sizes = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      className={clsx(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
