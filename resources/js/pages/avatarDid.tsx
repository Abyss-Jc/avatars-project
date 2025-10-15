import React, { useEffect, useState } from "react";
import { getDidAgent } from "../services/avatarsService";

function AgentViewer({ agentId = "v2_agt_PFwLeX4t" }) {
  const [agentData, setAgentData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAgent = async () => {
      try {
        const data = await getDidAgent(agentId);
        setAgentData(data);
      } catch (err) {
        console.error("Error loading D-ID agent:", err);
      }
    };

    loadAgent();
  }, [agentId]);

  if (error) return <p>{error}</p>;
  if (!agentData) return <p>Loading agent...</p>;

  return (
    <div>
      <h2>Agent: {agentData.id}</h2>
      <pre>{JSON.stringify(agentData, null, 2)}</pre>
    </div>
  );
}

export default AgentViewer;
