"use client";
import { Button } from "@heroui/button";
import React, { useEffect, useRef, useState } from "react";
import LoginModal from "./login/page";
import { gsap } from "gsap";

export default function Page() {
  const buttonRef = useRef(null);
  const logoRef = useRef(null);
  const iconRef = useRef(null);
  const textRefs = useRef([]);
  const [openLoginModal, setOpenLoginModal] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // 🎬 โลโก้เข้ามา + เด้งวน
    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: -30 },
      { opacity: 1, y: 0, duration: 0.8 }
    );
    gsap.to(logoRef.current, {
      y: -8,
      duration: 1.2,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });

    // 🪄 ข้อความ fade-in ทีละบรรทัด
    tl.fromTo(
      textRefs.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 },
      "-=0.3"
    );

    // 🧠 ปุ่ม: ขึ้นมาทีหลังพร้อมเด้งเล็กน้อย
    tl.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.9, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" },
      "-=0.2"
    );

    // 👩‍⚕️ ภาพหมอ: เคลื่อนจากขวา + fade-in
    tl.fromTo(
      iconRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1 },
      "-=0.5"
    );
  }, []);

  const handleMouseEnter = () => {
    gsap.to(buttonRef.current, {
      scale: 1.05,
      duration: 0.2,
      ease: "power1.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power1.inOut",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 overflow-hidden">
      <div className="grid grid-cols-12 gap-10 items-center max-w-6xl mx-auto px-8">
        {/* ด้านข้อความ */}
        <div className="col-span-6 flex flex-col justify-center space-y-6">
          <div className="flex justify-center">
            <img
              ref={logoRef}
              src="/images/logoppk.png"
              alt="logo"
              className="w-28 h-28 object-contain"
            />
          </div>

          <div className="text-center space-y-2">
            <h1
              ref={(el) => (textRefs.current[0] = el)}
              className="text-2xl text-gray-500"
            >
              Welcome To
            </h1>
            <h2
              ref={(el) => (textRefs.current[1] = el)}
              className="text-3xl font-semibold text-gray-800"
            >
              สมุดฝากครรภ์ Online
            </h2>
            <h3
              ref={(el) => (textRefs.current[2] = el)}
              className="text-xl text-gray-600"
            >
              โรงพยาบาลพระปกเกล้า
            </h3>
          </div>

          <div className="pt-4 px-10">
            <Button
              ref={buttonRef}
              className="w-full text-xl font-medium py-6 rounded-xl shadow-sm bg-green-500 hover:bg-green-600 text-white transition-all duration-200"
              variant="flat"
              onPress={() => setOpenLoginModal(true)}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              เข้าสู่ระบบ
            </Button>
          </div>
        </div>

        {/* ด้านภาพ */}
        <div className="col-span-6 w-[700px]">
          <img
            ref={iconRef}
            src="/images/doctor_anc.png"
            className="w-full h-auto object-contain"
            alt="หมอหญิง"
          />
        </div>

        <LoginModal
          openModalLogin={openLoginModal}
          closeModalLogin={() => setOpenLoginModal(false)}
        />
      </div>
    </div>
  );
}
