import { addToast } from "@heroui/toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const apiRequest = async (
  endpoint,
  method = "GET",
  body = null,
  token = null
) => {
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  try {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    });

    const data = await res.json().catch(() => ({}));
    if (
      res.status === 400 ||
      res.status === 401 ||
      res.status === 403 ||
      res.status === 404 ||
      res.status === 409
    ) {
      addToast({
        title: "ไม่สำเร็จ",
        description: "เข้าสู่ระบบไม่สำเร็จ",
        color: "danger",
        variant: "flat",
      });
      return null; // ❌ ไม่ throw
    }
    return { data, res };
  } catch (error) {
    addToast({
      title: "เกิดข้อผิดพลาด",
      description: "ไม่สามารถเชื่อมต่อกับ server ได้ โปรดลองใหม่ภายหลัง",
      variant: "flat",
      color: "danger",
    });
    return null; // ❌ ไม่ throw
  }
};

// ใช้กับ login
const loginAPI = (user_name, password) =>
  apiRequest("/api/login", "POST", { user_name, password });

export { loginAPI, apiRequest };
