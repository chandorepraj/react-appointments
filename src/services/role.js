import API_URL from "./api";
import {apiFetch} from "./api";

export async function getRoles(page = 1) {
  const token = localStorage.getItem("token");

  const response = await apiFetch(`/roles?page=${page}`);

  if (!response.ok) {
    throw new Error("Unable to get roles");
  }

  return response.json();
}
export async function createRole(roleData) {
  const token = localStorage.getItem("token");

  const response = await apiFetch("/roles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roleData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to create role"
    );
  }

  return data;
}
export async function getRole(id) {
  const token = localStorage.getItem("token");

  const response = await apiFetch(`/roles/${id}`);
  const data = await response.json();

    if (response.status === 404) {
  throw new Error("Role not found. It may have been deleted.");
  }

  if (!response.ok) {
  throw new Error(data.message || "Unable to load role.");
  }
  return data;
}

export async function updateRole(id, roleData) {
  const token = localStorage.getItem("token");

  const response = await apiFetch(`/roles/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roleData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to update role");
  }

  return data;
}
export async function deleteRole(id) {
  const token = localStorage.getItem("token");

  const response = await apiFetch(`/roles/${id}`, {
    method: "DELETE",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to delete role");
  }

  return data;
}