import { useEffect, useRef, useState } from "react";
import { usePage } from '@inertiajs/react';
import { getAvatarFrame } from "@/services/avatarsService";
import { Loader2 } from 'lucide-react';

export default function AvatarInfo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [avatar, setAvatar] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { props } = usePage();

  useEffect(() => {
    const fecthAvatarData = async () => {
        setIsLoading(true)
        try {
            const response = await getAvatarFrame(props.avatarId);
            const {data} = response;
            setAvatar(data.avatar)
        }
        catch(e) {
            console.error(e)
        }
        finally {
            setIsLoading(false)
        }
    }

    fecthAvatarData();
  }, [props])

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
        width: 640px;
        height: 360px;
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
        {isLoading && (
            <div className="flex w-full justify-center items-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        )}
        </div>
  );
}
