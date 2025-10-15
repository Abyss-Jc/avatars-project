import api from "../api";

export const getAvatarsInfo = () => api.get('/avatars')
export const getAvatarFrame = (avatarId) => api.get(`/avatars/avatar/${avatarId}`)
export const getDidAgent = (agentId) => api.get('/avatars/did-agent', {
    params: { agent_id: agentId },
  })