import React from "react";

interface LoadingProps {
  loadingText?: string;
}

const LoadingAnimation: React.FC<LoadingProps> = ({ loadingText }) => {
  return (
    <div className="LoadingAnimationContainer">
      <div className="loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <div className="text">
        <h4> {loadingText ? loadingText : "Loading..."}</h4>
      </div>
    </div>
  );
};

export default LoadingAnimation;
