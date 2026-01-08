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
      credentials: "include",
    });

    const data = await res.json().catch(() => ({}));
    if (res.status >= 200 && res.status < 300) {
      addToast({
        title: "สำเร็จ",
        description: "เข้าสู่ระบบสำเร็จ",
        color: "success",
        variant: "flat",
      });
    }
    if (res.status === 400) {
      addToast({
        title: "ไม่สำเร็จ",
        description: "กรุณากรอก user password",
        color: "danger",
        variant: "flat",
      });
      return null; // ❌ ไม่ throw
    }
    if (res.status === 401) {
      addToast({
        title: "ไม่สำเร็จ",
        description: " user หรือ password ไม่ถูกต้อง",
        color: "danger",
        variant: "flat",
      });
      return null; // ❌ ไม่ throw
    }
    if (res.status === 404) {
      addToast({
        title: "ไม่มี ผ้ใช้ นี้ในระบบ",
        description: "กรุณาติดต่อเจ้าหน้าที่",
        color: "danger",
        variant: "flat",
      });
      return null; // ❌ ไม่ throw
    }
    if (res.status === 503) {
      addToast({
        title: "เซิร์ฟเวอร์ไม่พร้อมใช้งาน",
        description: "กรุณาติดต่อเจ้าหน้าที่",
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
const loginAPI = (user_name, password, rememberMe) =>
  apiRequest("/api/login", "POST", { user_name, password, rememberMe });

export { loginAPI, apiRequest };
