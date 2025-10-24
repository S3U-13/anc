import { useAuth } from "@/context/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const useApiRequest = () => {
  const apiRequest = async (endpoint, method = "GET", body = null, token) => {
    if (!token) throw new Error("No token provided");

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const options = { method, headers };
    if (body && method !== "GET") options.body = JSON.stringify(body);

    const res = await fetch(`${API_URL}${endpoint}`, options);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) throw new Error(data?.error || "API request failed");
    return data;
  };

  const fetchAncAPI = (token) =>
    apiRequest("/api/user/anc", "GET", null, token);

  return { apiRequest, fetchAncAPI };
};
