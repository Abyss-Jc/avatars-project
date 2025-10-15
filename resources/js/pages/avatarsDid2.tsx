import { useEffect, useRef } from "react";

const DIDAvatarEmbed: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Avoid injecting the script multiple times
    if (document.getElementById("did-agent-script")) return;

    const script = document.createElement("script");
    script.type = "module";
    script.id = "did-agent-script";
    script.src = "https://agent.d-id.com/v2/index.js";
    script.setAttribute("data-mode", "full");
    script.setAttribute(
      "data-client-key",
      "Z29vZ2xlLW9hdXRoMnwxMDgwNjU5MzgxMzUxMjQ0OTA5MTY6dW9KUk5FZFJkTWs1aXE1Xzh4aDVZ"
    );
    script.setAttribute("data-agent-id", "v2_agt_PFwLeX4t");
    script.setAttribute("data-name", "did-agent");
    script.setAttribute("data-monitor", "true");
    script.setAttribute("data-target-id", "did-avatar-container");

    document.body.appendChild(script);

    return () => {
      // Cleanup if component unmounts
      const existing = document.getElementById("did-agent-script");
      if (existing) existing.remove();
    };
  }, []);

  return (
    <div className="w-full h-[600px] flex justify-center items-center">
      {/* Avatar will render inside this div */}
      <div
        id="did-avatar-container"
        ref={containerRef}
        className="h-full w-full"
      ></div>
    </div>
  );
};

export default DIDAvatarEmbed;
