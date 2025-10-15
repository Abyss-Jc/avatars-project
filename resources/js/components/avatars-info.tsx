import { useEffect, useRef, useState } from "react";

interface Avatar {
    source: string;
  }
  
  interface AvatarInfoProps {
    avatar: Avatar;
  }

export default function AvatarInfo({avatar} : AvatarInfoProps ) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!avatar?.source) return;

    const host = "https://labs.heygen.com";
    const url = host + avatar.source;

    const wrapDiv = document.createElement("div");
    wrapDiv.id = "heygen-streaming-embed";

    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.title = "Streaming Embed";
    iframe.allow = "microphone";
    iframe.allowFullscreen = false;
    iframe.role = "dialog";

    const stylesheet = document.createElement("style");
    stylesheet.innerHTML = `
      #heygen-streaming-embed {
        width: 950px;
        height: 535px;
        border-radius: 12px;
        overflow: hidden;
        border: 2px solid #fff;
        box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease-in-out;
        background: #000;
      }

      #heygen-streaming-embed iframe {
        width: 100%;
        height: 100%;
        border: none;
      }
    `;

    wrapDiv.appendChild(stylesheet);
    wrapDiv.appendChild(iframe);

    containerRef.current?.appendChild(wrapDiv);

    return () => {
        wrapDiv.remove(); // cleanup on unmount or avatar change
    };
}, [avatar]);


    return (
        <div
        ref={containerRef}
        style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            minHeight: "70vh",
        }}
        >
        </div>
  );
}
