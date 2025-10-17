const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://172.16.30.38:3000";

const loginAPI = async (user_name, password) => {
  const res = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_name, password }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Login failed");
  return { data, res };
}
export {loginAPI,}
