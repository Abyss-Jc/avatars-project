import api from "../api";

export const getAvatarsInfo = () => api.get('/avatars')
export const getAvatarFrame = (avatarId) => api.get(`/avatars/avatar/${avatarId}`)