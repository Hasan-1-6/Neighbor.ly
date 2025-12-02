import React from 'react'
import { TriangleAlert, Home, ArrowLeft } from 'lucide-react';

const PrimaryButton = ({ icon: Icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center space-x-2 rounded-xl bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition duration-200 ease-in-out hover:bg-indigo-700 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/50 active:bg-indigo-800 w-full md:w-auto"
    aria-label={text}
  >
    <Icon className="h-5 w-5" />
    <span>{text}</span>
  </button>
);
const SecondaryButton = ({ icon: Icon, text, onClick }) => (
  <button
    onClick={onClick}
    className="flex items-center justify-center space-x-2 rounded-xl bg-gray-200 px-6 py-3 text-sm font-semibold text-gray-800 shadow-md transition duration-200 ease-in-out hover:bg-gray-300 focus:outline-none focus:ring-4 focus:ring-gray-300/70 active:bg-gray-400 w-full md:w-auto"
    aria-label={text}
  >
    <Icon className="h-5 w-5" />
    <span>{text}</span>
  </button>
);
const Error = () => {
  const status = 404;
  const errorTitle = "Page Not Found";
  const errorMessage = "Oops! We can't seem to find the page you're looking for. It might have been moved or deleted.";
  const handleGoHome = () => {
    window.location.href = "/"
  };
  const handleGoBack = () => {
    window.location.href = "/"
  };
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4 antialiased">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 sm:p-12 text-center border border-gray-300">
        <div className="flex flex-col items-center mb-8">
          <div className="p-4 bg-red-100 rounded-full mb-4">
            <TriangleAlert className="w-10 h-10 text-red-600" />
          </div>
          <h1 className="text-7xl sm:text-9xl font-extrabold text-red-600 tracking-tight">
            {status}
          </h1>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          {errorTitle}
        </h2>
        <p className="text-base sm:text-lg text-gray-600 mb-10 leading-relaxed max-w-lg mx-auto">
          {errorMessage}
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <SecondaryButton 
            icon={ArrowLeft} 
            text="Go Back" 
            onClick={handleGoBack}
          />
          <PrimaryButton 
            icon={Home} 
            text="Take Me Home" 
            onClick={handleGoHome} 
          />
        </div>
      </div>
      <div className="mt-8 text-xs text-gray-500">
        <p>If the error persists, please contact support.</p>
      </div>

    </div>
  );
};

export default Error;