import { useEffect, useRef } from "react";

export default function HeygenEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = "https://labs.heygen.com";
    const url =
      host +
      "/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJkZWQ0MjMxOTYyM2E0NzhlYTc3ZTcyNDQ4ODFiNTJjYSIsInByZXZpZXdJbWciOiJodHRwczovL2ZpbGVzMi5oZXlnZW4uYWkvYXZhdGFyL3YzL2RlZDQyMzE5NjIzYTQ3OGVhNzdlNzI0NDg4MWI1MmNhL2Z1bGwvMi4yL3ByZXZpZXdfdGFyZ2V0LndlYnAiLCJuZWVkUmVtb3ZlQmFja2dyb3VuZCI6ZmFsc2UsImtub3dsZWRnZUJhc2VJZCI6IjRkYjBiMDI4NGIxNDQzMjM5YjEzMTE5MDdhNDI5YmUzIiwidXNlcm5hbWUiOiJhMmI4YzYwOWQ1NGM0OTYzOGNhMGNkM2FlOWJiZTU0OCJ9&inIFrame=1";

    const wrapDiv = document.createElement("div");
    wrapDiv.id = "heygen-streaming-embed";

    const iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.title = "Streaming Embed";
    iframe.allow = "microphone";
    iframe.allowFullscreen = false;
    iframe.role = "dialog";

    // Add CSS directly here
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

      #heygen-streaming-embed.expand {
      }

      #heygen-streaming-embed iframe {
        width: 100%;
        height: 100%;
        border: none;
      }
    `;

    wrapDiv.appendChild(stylesheet);
    wrapDiv.appendChild(iframe);

    if (containerRef.current) {
      containerRef.current.appendChild(wrapDiv);
    }

    // const handleMessage = (e) => {
    //   if (e.origin === host && e.data?.type === "streaming-embed") {
    //     if (e.data.action === "show") {
    //       wrapDiv.classList.add("expand");
    //     } else if (e.data.action === "hide") {
    //       wrapDiv.classList.remove("expand");
    //     }
    //   }
    // };

    // window.addEventListener("message", handleMessage);

    // return () => {
    //   window.removeEventListener("message", handleMessage);
    //   wrapDiv.remove();
    // };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: "70vh", // centers vertically in page section
      }}
    />
  );
}
