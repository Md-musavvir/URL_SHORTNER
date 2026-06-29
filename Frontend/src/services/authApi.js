import api from "../lib/axios";

export const login = (data) => api.post("/user/login", data);

export const register = (data) => api.post("/user/register", data);

export const logout = () => api.post("/user/logout");

export const getCurrentUser = () => api.get("/user/current-user");
