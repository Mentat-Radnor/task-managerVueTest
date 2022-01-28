import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export async function getTask() {
  const response = await apiClient.get("http://localhost:3000/task");
  return response.data;
}

export async function deleteTask(index) {
  try {
    await apiClient.delete(`http://localhost:3000/task/${index}`);
  } catch (error) {
    console.log(error);
  }
}

export async function postTask(value) {
  try {
    value.id = uuidv4();
    value.completed = false;
    await apiClient.post(`http://localhost:3000/task`, value);
  } catch (error) {
    console.log(error);
  }
}

export async function updateTask(value, id) {
  try {
    await apiClient.patch(`http://localhost:3000/task/${id}`, value);
  } catch (error) {
    console.log(error);
  }
}
