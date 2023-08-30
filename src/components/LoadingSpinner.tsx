import React from 'react';

interface LoadingProps {
  text?: string;
}

const LoadingSpinner: React.FC<LoadingProps> = ({ text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-primary mb-4"></div>
      <p className="text-gray-600">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
