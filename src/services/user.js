import API_URL from "./api";
import {apiFetch} from "./api";

export async function getUsers(page = 1) {
  const token = localStorage.getItem("token");

  const response = await apiFetch(`/users?page=${page}`);

  if (!response.ok) {
    throw new Error("Unable to get users");
  }

  return response.json();
}
export async function createUser(userData) {
  const token = localStorage.getItem("token");

  const response = await apiFetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to create user"
    );
  }

  return data;
}
export async function getUser(id) {
  const token = localStorage.getItem("token");

  const response = await apiFetch(`/users/${id}`);
  const data = await response.json();

    if (response.status === 404) {
  throw new Error("User not found. It may have been deleted.");
  }

  if (!response.ok) {
  throw new Error(data.message || "Unable to load user.");
  }
  return data;
}

export async function updateUser(id, userData) {
  const token = localStorage.getItem("token");

  const response = await apiFetch(`/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to update user");
  }

  return data;
}
export async function deleteUser(id) {
  const token = localStorage.getItem("token");

  const response = await apiFetch(`/users/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to delete user");
  }

  return data;
}