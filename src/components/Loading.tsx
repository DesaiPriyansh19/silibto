"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface LoadingProps {
  message?: string; // optional, defaults to "Loading..."
}

const Loading: React.FC<LoadingProps> = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <DotLottieReact
        src="https://lottie.host/cf9b2982-bfdd-4ed2-ba55-a57e4b2d3eab/ofpk8OvmyH.lottie"
        loop
        autoplay
        style={{ width: "200px", height: "200px" }}
      />
      <p className="mt-0 text-black text-lg font-light animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default Loading;
