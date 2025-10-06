'use client'
import React from "react";
import { useState } from "react";

export default function useHook() {
  const steps = ["wife", "husband"];
  const [activeStep, setActiveStep] = useState("wife");
  return {
    steps,
    activeStep,
    setActiveStep,
  };
}
