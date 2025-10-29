import { useAuth } from "@/context/AuthContext";
import { addToast } from "@heroui/toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const useApiRequest = () => {
  const { token } = useAuth(); // ✅ ดึง token จาก context อัตโนมัติ

  const apiRequest = async (endpoint, method = "GET", body = null) => {
    if (!token) {
      addToast({
        title: "ข้อผิดพลาด",
        description: "Token ไม่ถูกต้อง",
        variant: "flat",
        color: "danger",
      });
      return null;
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
    const options = { method, headers };
    if (body && method !== "GET") options.body = JSON.stringify(body);

    try {
      const res = await fetch(`${API_URL}${endpoint}`, options);
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        addToast({
          title: "เกิดข้อผิดพลาด",
          description: data?.error || "API request failed",
          variant: "flat",
          color: "danger",
        });
        return null; // ❌ ไม่ throw
      }

      return data;
    } catch (err) {
      addToast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถเชื่อมต่อกับ server ได้ โปรดลองใหม่ภายหลัง",
        variant: "flat",
        color: "danger",
      });
      return null; // ❌ ไม่ throw
    }
  };

  // ไม่ต้องส่ง token อีกแล้ว
  //dashboard page
  const fetchAllData = () =>
    Promise.all([
      apiRequest("/api/user/sum-anc-service", "GET"),
      apiRequest("/api/user/chart-anc-service", "GET"),
      apiRequest("/api/user/radial-anc-service", "GET"),
    ]).then(([sum, bar, radial]) => ({
      sumData: sum || [],
      chartBarData: bar || [],
      chartRadialData: radial || [],
    }));
  // anc page
  const fetchDataAnc = () => apiRequest("/api/user/anc", "GET");
  //anc search hn
  const patWifeData = async (value, form, setPat) => {
    try {
      const data = await apiRequest(`/api/user/pat/${value}`, "GET");

      // set state
      setPat(data);

      // อัปเดต form field
      form.setFieldValue("hn_wife", data.hn || "");
      form.setFieldValue("sex", data.sex_name.lookupname || "");

      addToast({
        title: "สำเร็จ",
        description: "ดึงข้อมูลสำเร็จ",
        variant: "flat",
        color: "primary",
      });

      return data;
    } catch (err) {
      // console.error(err);
      addToast({
        title: "ไม่พบข้อมูล",
        description: err.message || "เกิดข้อผิดพลาด",
        variant: "flat",
        color: "danger",
      });
      throw err;
    }
  };
  const patHusbandData = async (value, form, setPatHusband) => {
    try {
      const data = await apiRequest(`/api/user/pat/${value}`, "GET");

      // set state
      setPatHusband(data);

      // อัปเดต form field
      form.setFieldValue("hn_husband", data.hn || "");

      addToast({
        title: "สำเร็จ",
        description: "ดึงข้อมูลสำเร็จ",
        variant: "flat",
        color: "primary",
      });

      return data;
    } catch (err) {
      // console.error(err);
      addToast({
        title: "ไม่พบข้อมูล",
        description: err.message || "เกิดข้อผิดพลาด",
        variant: "flat",
        color: "danger",
      });
      throw err;
    }
  };
  // anc submit
  const submitAnc = async (value) => {
    try {
      const data = await apiRequest("/api/user/anc", "POST", value);

      addToast({
        title: "สำเร็จ",
        description: "ลงทะเบียน ANC สำเร็จ",
        variant: "flat",
        color: "success",
      });

      return data;
    } catch (err) {
      // console.error(err);
      addToast({
        title: "ไม่สำเร็จ",
        description: err.message || "ลงทะเบียน ANC ไม่สำเร็จ",
        variant: "flat",
        color: "danger",
      });
      throw err;
    }
  };
  // data anc by id
  const selectedAncById = async (AncNo) => {
    return apiRequest(`/api/user/anc/${AncNo}`, "GET");
  };
  const submitEditAnc = async (value, AncNo) => {
    try {
      const data = await apiRequest(`/api/user/anc/${AncNo}`, "PUT", value);

      addToast({
        title: "สำเร็จ",
        description: "เเก้ไขทะเบียน ANC สำเร็จ",
        variant: "flat",
        color: "success",
      });

      return data;
    } catch (err) {
      // console.error(err);
      addToast({
        title: "ไม่สำเร็จ",
        description: err.message || "เเก้ไขทะเบียน ANC ไม่สำเร็จ",
        variant: "flat",
        color: "danger",
      });
      throw err;
    }
  };
  //anc service page
  const fetchDataAncService = () => apiRequest("/api/user/ancservice", "GET");
  const selectedRoundById = async (roundId) => {
    return apiRequest(`/api/user/show-service-by-id/${roundId}`, "GET");
  };
  const fetchChoice = () => apiRequest("/api/user/mapAll", "GET");
  const fetchCoverage = () => apiRequest("/api/user/coveragesite", "GET");
  const fetchSelectDataAnc = () => apiRequest("/api/user/pull-anc", "GET");
  //anc service create
  const submitCreateAncService = async (value) => {
    try {
      const data = await apiRequest("/api/user/ancservice", "POST", value);

      addToast({
        title: "สำเร็จ",
        description: "เพิ่มข้อมูลสำเร็จ",
        variant: "flat",
        color: "success",
      });

      return data;
    } catch (err) {
      // console.error(err);
      addToast({
        title: "ไม่สำเร็จ",
        description: "เพิ่มข้อมูลไม่สำเร็จ",
        variant: "flat",
        color: "danger",
      });
    }
  };
  //anc service edit
  const submitEditAncService = async (value, id) => {
    try {
      const data = await apiRequest(
        `/api/user/edit-service-by-id/${id}`,
        "PUT",
        value
      );

      addToast({
        title: "สำเร็จ",
        description: "เเก้ไขข้อมูลสำเร็จ",
        variant: "flat",
        color: "success",
      });
      return data;
    } catch (err) {
      // console.error(err);
      addToast({
        title: "ไม่สำเร็จ",
        description: "เเก้ไขข้อมูลไม่สำเร็จ",
        variant: "flat",
        color: "danger",
      });
    }
  };

  // user page
  const fetchDataUser = () => apiRequest("/api/admin/user", "GET");
  const submitUserById = async (id) => {
    return apiRequest(`/api/admin/viewUser/${id}`, "GET");
  };
  // create user page
  const fetchPosition = () => apiRequest("/api/admin/position", "GET");
  const fetchRole = () => apiRequest("/api/admin/role", "GET");

  const submitCreateUser = async (value) => {
    try {
      const data = await apiRequest(`/api/admin/addUser`, "POST", value);

      addToast({
        title: "สำเร็จ",
        description: "เพิ่มผู้ใช้สำเร็จ",
        color: "success",
      });
      return data;
    } catch (err) {
      // console.error(err);
      addToast({
        title: "ไม่สำเร็จ",
        description: err.message || "เกิดข้อผิดพลาด",
        color: "danger",
      });
    }
  };

  const submitEditUser = async (value, id) => {
    try {
      const data = await apiRequest(`/api/admin/editUser/${id}`, "PUT", value);

      addToast({
        title: "สำเร็จ",
        description: "เเก้ไขข้อมูลสำเร็จ",
        variant: "flat",
        color: "success",
      });
      return data;
    } catch (err) {
      // console.error(err);
      addToast({
        title: "ไม่สำเร็จ",
        description: "เเก้ไขข้อมูลไม่สำเร็จ",
        variant: "flat",
        color: "danger",
      });
    }
  };

  const logoutAPI = () => apiRequest("/api/logout", "POST");

  return {
    apiRequest,
    fetchAllData,
    fetchDataAnc,
    fetchDataAncService,
    patWifeData,
    patHusbandData,
    submitAnc,
    selectedAncById,
    submitEditAnc,
    selectedRoundById,
    fetchChoice,
    fetchCoverage,
    submitCreateAncService,
    fetchSelectDataAnc,
    submitEditAncService,
    fetchDataUser,
    fetchPosition,
    fetchRole,
    submitCreateUser,
    logoutAPI,
    submitUserById,
    submitEditUser,
  };
};
