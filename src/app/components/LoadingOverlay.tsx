// File: src/app/components/LoadingOverlay.tsx
import React from 'react';
import { BeatLoader } from 'react-spinners';

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-content">
        <BeatLoader color="#4A56E2" />
        <p>Loading... Please wait.</p>
      </div>
    </div>
  );
};

export default LoadingOverlay;