"use client";
import { addToast } from "@heroui/toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { PiEyeSlashThin, PiEyeThin } from "react-icons/pi";
import Swal from "sweetalert2";

export default function () {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  // Mock user data
  const validUser = {
    user_name: "test_user01",
    password: "12345678",
  };

  // Toggle password visibility
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();

    try {
      if (userName === validUser.user_name && password === validUser.password) {
        localStorage.setItem("token", "mock-token");
        console.log("Login Successful!");
        router.push("/dashboard");
        addToast({
          title: "สำเร็จ",
          description: "เข้าสู่ระบบสำเร็จ",
          variant: "flat",
          color: "success",
        });
      } else {
        setError("Invalid email or password.");
        addToast({
          title: "ไม่สำเร็จ",
          description: "เข้าสู่ระบบไม่สำเร็จ",
          variant: "flat",
          color: "warning",
        });
      }
    } catch (error) {
      console.log(error);
      addToast({
        title: "error",
        description: 'เกิดข้อผิดพลาด',
        variant: "flat",
        color: "warning",
      });
    }
    // Validate email and password
  };
  return (
    <div className="min-h-screen bg-[#f0ebf8] p-[10px] flex justify-center items-center">
      <div className="flex rounded-xl overflow-hidden shadow-lg border border-gray-200">
        <div className="bg-white  w-[600px] h-[700px] p-[10px]">
          <div className="w-[195px] h-[55px] overflow-hidden mt-[20px] ml-[20px]">
            <img className="w-full h-full" src="/images/logo.png" />
          </div>
          <div className="w-[370px] mx-auto mt-[80px]">
            <h1 className="text-4xl font-bold mb-[20px] text-black">Login</h1>
            <form action="" onSubmit={handleLogin}>
              <div>
                <label className="text-sm text-black" htmlFor="">
                  User name
                </label>
                <br />
                <input
                  className="p-2 rounded-sm border border-gray-200 w-full mt-[5px] text-black"
                  id="user_name"
                  value={userName}
                  name="user_name"
                  type="text"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="mt-[20px]">
                <label className="text-sm text-black" htmlFor="">
                  Password
                </label>
                <br />
                <div className="relative">
                  <input
                    className="p-2 rounded-sm border border-gray-200 w-full mt-[5px] text-black"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    autoCapitalize="none"
                    autoComplete="password"
                    autoCorrect="off"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute top-4 right-3 text-black"
                  >
                    {showPassword ? (
                      <PiEyeThin size={20} />
                    ) : (
                      <PiEyeSlashThin size={20} />
                    )}
                  </button>
                </div>
              </div>
              <div className="mt-[20px]">
                <input type="checkbox" />
                <span className="ml-[5px] font-bold text-black">
                  remember me
                </span>
                <a
                  className="underline text-[#68449c] hover:text-[#6337a0] ml-[100px]"
                  href=""
                >
                  Forget Password
                </a>
              </div>
              <div className="mt-[20px]">
                <button
                  type="submit"
                  className="w-full bg-[#68449c] hover:bg-[#6337a0] p-2 text-white text-md rounded-sm"
                >
                  เข้าสู่ระบบ
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="relative w-[600px] h-[700px] overflow-hidden shadow-[#a88cdc] shadow-xl">
          {/* Background Layer */}
          {/* <div
                        className="absolute inset-0 bg-[url('https://scontent.fbkk21-1.fna.fbcdn.net/v/t39.30808-6/306794415_541248258002192_7275606197614530346_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=p97m0tSWTWMQ7kNvwGpc2wL&_nc_oc=AdmtZiCY53PuctvwWlNvBledMmFL5wtzehx6BKeUqf9r2qfXxXEMtXp8FroWtoyh_1A&_nc_zt=23&_nc_ht=scontent.fbkk21-1.fna&_nc_gid=Yp6aJHAUrfMSRw3YoeJZEQ&oh=00_Afap9vmGzRr2mNHseW5oADqtW8wgMGXu5oGysYQgbSjqEg&oe=68BF1237')] 
               bg-cover bg-right filter"
                    ></div> */}

          {/* Optional overlay สีถ้าต้องการ */}
          {/* <div className="absolute inset-0 bg-[#a88cdc] bg-opacity-30"></div> */}

          {/* Content Layer */}
          <div className="relative">
            <img
              className="w-[600px] h-[700px] bg-cover"
              src="/images/login_page.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}
