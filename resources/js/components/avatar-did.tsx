import { useEffect, useRef } from "react";

interface DIDAgentProps {
  // Optional: you can pass agentId, clientKey, name, mode, etc. as props
  agentId?: string;
  clientKey?: string;
  name?: string;
  mode?: string;
}

export default function DIDAgent({
  agentId = "v2_agt_PFwLeX4t",
  clientKey = "Z29vZ2xlLW9hdXRoMnwxMDgwNjU5MzgxMzUxMjQ0OTA5MTY6dW9KUk5FZFJkTWs1aXE1Xzh4aDVZ",
  name = "did-agent",
  mode = "full",
}: DIDAgentProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const divId = "did-agent-container";

  useEffect(() => {
    if (!containerRef.current) return;

    // Create a div for the agent
    const agentDiv = document.createElement("div");
    agentDiv.id = divId;
    containerRef.current.appendChild(agentDiv);

    // Create the script
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://agent.d-id.com/v2/index.js";
    script.setAttribute("data-mode", mode);
    script.setAttribute("data-client-key", clientKey);
    script.setAttribute("data-agent-id", agentId);
    script.setAttribute("data-name", name);
    script.setAttribute("data-monitor", "true");
    script.setAttribute("data-target-id", divId);

    containerRef.current.appendChild(script);

    // Cleanup on unmount
    return () => {
      script.remove();
      agentDiv.remove();
    };
  }, [agentId, clientKey, name, mode]);

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
    />
  );
}
