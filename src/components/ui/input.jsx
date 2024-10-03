// src/components/ui/input.jsx
import React from 'react';

export const Input = ({ className = '', ...props }) => {
  return (
    <input
      className={`px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${className}`}
      {...props}
    />
  );
};
