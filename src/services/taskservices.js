import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const getTasks = async () => {
  return axios.get(API_URL+"/getAll");
};

export const createTask = async (task) => {
return axios.post(API_URL+"/task", task);
};

export const updateTask = async (id, task) => {
  return axios.put(`${API_URL}/updateTask`, { ...task, id }); 
};

export const deleteTask = async (id) => {
  return axios.delete(`${API_URL}/deleteTask`, {
    params: { id }
  });
};
