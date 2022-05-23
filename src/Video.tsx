import React, { memo } from "react";

export const Video: React.FC = memo(() => {
  return (
    <video
      loop
      muted
      autoPlay
      className="fixed top-0 left-0 right-0 bottom-0 w-screen h-screen  object-cover "
    >
      <source src="/countdown-timer/octagon.mp4"></source>
    </video>
  );
});
