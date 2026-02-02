import React from 'react';
import { CirclesWithBar } from 'react-loader-spinner';

/**
 * Custom Loader component with theme color
 * @param {Object} props - Component props
 * @param {string} props.message - Loading message (optional)
 * @param {boolean} props.fullScreen - Show as fullscreen overlay (optional)
 * @returns {JSX.Element}
 */
export default function Loader({ message = 'Loading...', fullScreen = false }) {
  const loaderContent = (
    <div className="flex flex-col items-center justify-center py-8">
      <CirclesWithBar
        height="100"
        width="100"
        color="#0072FF"
        outerCircleColor="#0072FF"
        innerCircleColor="#0072FF"
        barColor="#0072FF"
        ariaLabel="circles-with-bar-loading"
        visible={true}
      />
      {message && <p className="mt-4 text-gray-600 text-sm">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-80 z-50">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
}
