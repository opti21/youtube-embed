"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false });

interface VideoPlayerProps {
  url: string;
}

export function VideoPlayer({ url }: VideoPlayerProps) {
  const [isReady, setIsReady] = useState(false);

  return (
    <div className="relative w-full overflow-hidden rounded-lg bg-neutral-100 pt-[56.25%] shadow-lg dark:bg-neutral-800">
      <div
        className={`absolute left-0 top-0 h-full w-full ${!isReady ? "animate-pulse" : ""}`}
      >
        <ReactPlayer
          url={url}
          width="100%"
          height="100%"
          controls
          playing={false}
          onReady={() => setIsReady(true)}
          config={{
            youtube: {
              playerVars: {
                modestbranding: 1,
                rel: 0,
              },
            },
          }}
        />
      </div>
    </div>
  );
}
