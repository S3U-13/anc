const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

const fetchAllData = (token) =>
  Promise.all([
    apiRequest("/api/user/sum-anc-service", "GET", null, token),
    apiRequest("/api/user/chart-anc-service", "GET", null, token),
    apiRequest("/api/user/radial-anc-service", "GET", null, token),
  ]).then(([sum, bar, radial]) => ({
    sumData: sum.data || [],
    chartBarData: bar.data || [],
    chartRadialData: radial.data || [],
  }));

const fetchDataAnc = (token) =>
  apiRequest("/api/user/ancservice", "GET", null, token);
const fetchRoundById = (roundId, token) =>
  apiRequest(`/api/user/show-service-by-id/${roundId}`, "GET", null, token);

export {
  loginAPI,
  fetchAllData,
  fetchDataAnc,
  fetchRoundById,
  apiRequest,
};
