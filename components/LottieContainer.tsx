import { LottieOptions, useLottie } from "lottie-react";
import React, { CSSProperties } from "react";

interface LottieContainerProps {
  style?: CSSProperties;
  lottie: Object;
  options?: LottieOptions;
}

const LottieContainer: React.FC<LottieContainerProps> = ({
  lottie,
  options,
  style,
}) => {
  const data: LottieOptions = {
    animationData: lottie,
    autoPlay: true,
    loop: true,
    ...options,
  };
  const { View } = useLottie(data, style);
  return View;
};

export default LottieContainer;
