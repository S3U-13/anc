const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const apiRequest = async (
  endpoint,
  method = "GET",
  body = null,
  token = null
) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.error || "API request failed");
  return { data, res };
};

// ใช้กับ login
const loginAPI = (user_name, password) =>
  apiRequest("/api/login", "POST", { user_name, password });

export { loginAPI, apiRequest };
