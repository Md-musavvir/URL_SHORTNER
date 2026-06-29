import api from "../lib/axios";

export const shortenUrl = (data) => {
  return api.post("/url/shorten", data);
};

export const getAllUrls = () => {
  return api.get("/url/getAllUrl");
};

export const deleteUrl = (id) => {
  return api.delete(`/url/delete/${id}`);
};
