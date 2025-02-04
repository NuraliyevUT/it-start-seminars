import api from "./api";

export const getSeminars = async () => {
  const response = await api.get("/");
  return response.data;
};

export const addSeminar = async (seminar) => {
  const response = await api.post("/", seminar);
  return response.data;
};

export const updateSeminar = async (id, seminar) => {
  const response = await api.put(`/${id}`, seminar);
  return response.data;
};

export const deleteSeminar = async (id) => {
  await api.delete(`/${id}`);
};
