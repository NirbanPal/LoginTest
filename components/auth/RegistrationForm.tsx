"use client";

import { useState } from "react";
import { EmailStep } from "./EmailStep";
import { OtpStep } from "./OtpStep";
import { PasswordStep } from "./PasswordStep";
import { SuccessStep } from "./SuccessStep";

type RegistrationStep = "email" | "otp" | "password" | "success";

export default function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>("email");
  const [email, setEmail] = useState<string>("");
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);
  const [isOtpVerified, setIsOtpVerified] = useState<boolean>(false);
  
  // Mock functions for verification
  const handleVerifyEmail = () => {
    // In a real app, this would trigger an API call to send OTP
    setIsEmailVerified(true);
    setCurrentStep("otp");
  };

  const handleVerifyOtp = () => {
    // In a real app, this would verify OTP with backend
    setIsOtpVerified(true);
    setCurrentStep("password");
  };

  const handleRegister = () => {
    // In a real app, this would submit all data to backend
    setCurrentStep("success");
  };

  return (
    <div 
      className="w-full min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.pexels.com/photos/8471799/pexels-photo-8471799.jpeg?auto=compress&cs=tinysrgb&w=1600')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="max-w-md w-full bg-white/90 backdrop-blur-sm rounded-xl shadow-2xl p-8 md:p-10 overflow-hidden">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800 mb-2">Join Our School</h1>
          <p className="text-gray-600">Create your account to get started</p>
        </div>
        
        <div className="mb-6 flex justify-center">
          <div className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "email" || isEmailVerified ? "bg-blue-600" : "bg-gray-300"} text-white`}>
              1
            </div>
            <div className={`w-12 h-1 ${currentStep === "otp" || isOtpVerified || currentStep === "password" || currentStep === "success" ? "bg-blue-600" : "bg-gray-300"}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "otp" || isOtpVerified || currentStep === "password" || currentStep === "success" ? "bg-blue-600" : "bg-gray-300"} text-white`}>
              2
            </div>
            <div className={`w-12 h-1 ${currentStep === "password" || currentStep === "success" ? "bg-blue-600" : "bg-gray-300"}`}></div>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep === "password" || currentStep === "success" ? "bg-blue-600" : "bg-gray-300"} text-white`}>
              3
            </div>
          </div>
        </div>
        
        {/* Step 1: Email */}
        {currentStep === "email" && (
          <EmailStep 
            email={email} 
            setEmail={setEmail} 
            onVerify={handleVerifyEmail}
          />
        )}
        
        {/* Step 2: OTP */}
        {currentStep === "otp" && (
          <OtpStep 
            email={email} 
            isEmailVerified={isEmailVerified}
            onVerify={handleVerifyOtp}
          />
        )}
        
        {/* Step 3: Password */}
        {currentStep === "password" && (
          <PasswordStep 
            email={email}
            isEmailVerified={isEmailVerified}
            isOtpVerified={isOtpVerified}
            onRegister={handleRegister}
          />
        )}
        
        {/* Success Step */}
        {currentStep === "success" && (
          <SuccessStep email={email} />
        )}
      </div>
    </div>
  );
}