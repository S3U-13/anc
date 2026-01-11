import { useAuth } from "@/context/AuthContext";
import { addToast } from "@heroui/toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export const useApiRequest = () => {
  const { token } = useAuth(); // ✅ ดึง token จาก context อัตโนมัติ

  const apiRequest = async (endpoint, method = "GET", body = null) => {
    if (!token || token === "undefined") {
      addToast({
        title: "ข้อผิดพลาด",
        description: "Token ไม่ถูกต้องหรือหมดอายุ",
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
      const text = await res.text(); // 👉 ดัก error ที่ไม่ใช่ JSON
      const data = text ? JSON.parse(text) : {};

      // ✅ เช็คตาม status
      if (res.status === 401 || res.status === 403) {
        addToast({
          title: "หมดเวลาใช้งาน",
          description: "กรุณาเข้าสู่ระบบใหม่อีกครั้ง",
          color: "danger",
        });
        return null;
      }

      return data ?? null;
    } catch (error) {
      addToast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถเชื่อมต่อกับ server ได้ โปรดลองใหม่ภายหลัง",
        variant: "flat",
        color: "danger",
      });
      return null;
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
      form.setFieldValue("hn_wife", data?.hn || "");
      if (!form.getFieldValue("wife_address")) {
        form.setFieldValue("wife_address", data?.pat_address || "");
      }
      if (!form.getFieldValue("wife_tel")) {
        form.setFieldValue("wife_tel", data?.pat_address?.phone || "");
      }
      if (!form.getFieldValue("wife_job")) {
        form.setFieldValue(
          "wife_job",
          data?.occupation_detail?.lookupname || ""
        );
      }
      form.setFieldValue("sex", data?.sex_name?.lookupname || "");

      return data;
    } catch (err) {
      console.error(err);
    }
  };
  const patHusbandData = async (value, form, setPatHusband) => {
    try {
      const data = await apiRequest(`/api/user/pat/${value}`, "GET");

      // set state
      setPatHusband(data);

      // อัปเดต form field
      const calculateAge = (birthdate) => {
        if (!birthdate) return "";

        const birth = new Date(birthdate);
        const today = new Date();

        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();

        // ถ้ายังไม่ถึงวันเกิดของปีนี้ ให้ลบ 1
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
          age--;
        }

        return `${age}`;
      };

      form.setFieldValue("hn_husband", data?.hn || "");

      if (!form.getFieldValue("husband_name")) {
        form.setFieldValue(
          "husband_name",
          `${data?.prename}${data?.firstname} ${data?.lastname}`
        );
      }
      if (!form.getFieldValue("husband_age")) {
        form.setFieldValue(
          "husband_age",
          calculateAge(data?.birthdatetime || "")
        ); // ใช้ birthdatetime
      }
      if (!form.getFieldValue("husband_citizencardno")) {
        form.setFieldValue("husband_citizencardno", data?.citizencardno || "");
      }
      if (!form.getFieldValue("husband_race")) {
        form.setFieldValue("husband_race", data?.race_text?.lookupname || "");
      }
      if (!form.getFieldValue("husband_tel")) {
        form.setFieldValue("husband_tel", data?.pat_address?.phone || "");
      }
      if (!form.getFieldValue("husband_job")) {
        form.setFieldValue(
          "husband_job",
          data?.occupation_detail?.lookupname || ""
        );
      }

      return data;
    } catch (err) {
      console.error(err);
    }
  };
  // anc submit
  const submitAnc = async (value) => {
    try {
      const data = await apiRequest("/api/user/anc", "POST", value);

      return data;
    } catch (err) {
      console.error(err);
    }
  };
  // data anc by id
  const selectedAncById = async (AncNo) => {
    return apiRequest(`/api/user/anc/${AncNo}`, "GET");
  };
  const submitEditAnc = async (value, AncNo) => {
    try {
      const data = await apiRequest(`/api/user/anc/${AncNo}`, "PUT", value);

      return data;
    } catch (err) {
      console.error(err);
    }
  };
  //anc service page
  const fetchDataAncService = () => apiRequest("/api/user/ancservice", "GET");
  const selectedRoundById = async (roundId) => {
    return apiRequest(`/api/user/show-service-by-id/${roundId}`, "GET");
  };
  const selectedRoundByIdEditView = async (roundId) => {
    return apiRequest(`/api/user/show-edit-view/${roundId}`, "GET");
  };
  const fetchChoice = () => apiRequest("/api/user/mapAll", "GET");
  const fetchCoverage = () => apiRequest("/api/user/coveragesite", "GET");
  const fetchSelectDataAnc = () => apiRequest("/api/user/pull-anc", "GET");
  const selectedGravidaByAncNo = (anc_no) =>
    apiRequest(`/api/user/ancservice/gravida/${anc_no}`, "GET");
  const selectedDataByAncNoAndGravida = (AncNo, Gravida) =>
    apiRequest(`/api/user/ancservice/${AncNo}/${Gravida}`, "GET");
  //anc service create
  const submitCreateAncService = async (value) => {
    try {
      const data = await apiRequest("/api/user/ancservice", "POST", value);

      return data;
    } catch (err) {
      console.error(err);
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

      return data;
    } catch (err) {
      console.error(err);
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

      return data;
    } catch (err) {
      console.error(err);
    }
  };

  const submitEditUser = async (value, id) => {
    try {
      const data = await apiRequest(`/api/admin/editUser/${id}`, "PUT", value);

      return data;
    } catch (err) {
      console.error(err);
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
    selectedGravidaByAncNo,
    selectedDataByAncNoAndGravida,
    submitEditAncService,
    fetchDataUser,
    fetchPosition,
    fetchRole,
    submitCreateUser,
    logoutAPI,
    submitUserById,
    submitEditUser,
    selectedRoundByIdEditView,
  };
};
