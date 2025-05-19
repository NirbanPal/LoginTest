"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

interface OtpStepProps {
  email: string;
  isEmailVerified: boolean;
  onVerify: () => void;
}

export function OtpStep({ email, isEmailVerified, onVerify }: OtpStepProps) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [isVerifying, setIsVerifying] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [timer, setTimer] = useState(60);
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    
    return () => clearInterval(countdown);
  }, []);
  
  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Only take first character
    setOtp(newOtp);
    
    // If the input is filled, move to the next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    
    // Reset invalid state when user types
    if (isInvalid) {
      setIsInvalid(false);
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Move to the previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text");
    
    // Check if pasted data is all numbers and has correct length
    if (!/^\d+$/.test(pastedData)) return;
    
    const digits = pastedData.slice(0, 6).split("");
    const newOtp = [...otp];
    
    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });
    
    setOtp(newOtp);
    
    // Focus the input after the last filled position
    if (digits.length < 6) {
      inputRefs.current[digits.length]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };
  
  const handleVerify = () => {
    const otpValue = otp.join("");
    
    if (otpValue.length !== 6) {
      setIsInvalid(true);
      return;
    }
    
    setIsVerifying(true);
    
    // Mock verification - in a real app this would be an API call
    setTimeout(() => {
      // For demo purposes, let's consider "123456" as valid OTP
      if (otpValue === "123456") {
        setIsVerifying(false);
        onVerify();
      } else {
        setIsVerifying(false);
        setIsInvalid(true);
      }
    }, 1500);
  };
  
  const handleResend = () => {
    // Reset OTP fields
    setOtp(Array(6).fill(""));
    setIsInvalid(false);
    
    // Reset timer
    setTimer(60);
    
    // In a real app, this would trigger API call to resend OTP
    console.log("Resending OTP to", email);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-gray-700 font-medium">{email}</span>
          {isEmailVerified && (
            <CheckCircle2 className="h-5 w-5 text-blue-600 animate-scale-in" />
          )}
        </div>
        <p className="text-sm text-gray-600">
          Please enter the 6-digit code sent to your email
        </p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="otp-input-0" className="sr-only">OTP Code</Label>
        <div className="flex justify-between gap-2">
          {otp.map((digit, index) => (
            <div key={index} className="w-full relative">
              <Input
                id={`otp-input-${index}`}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className={`text-center text-xl h-14 ${
                  isInvalid ? "border-red-500 focus:ring-red-500" : "border-input"
                } transition-all duration-200 ${
                  digit ? "bg-blue-50 border-blue-200" : ""
                }`}
                maxLength={1}
                inputMode="numeric"
                autoComplete="one-time-code"
              />
              <div 
                className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                  digit ? "w-4/5" : ""
                }`} 
              />
            </div>
          ))}
        </div>
        {isInvalid && (
          <p className="text-red-500 text-sm mt-1">
            Invalid code. Please try again.
          </p>
        )}
      </div>
      
      <Button 
        onClick={handleVerify} 
        disabled={otp.join("").length !== 6 || isVerifying}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isVerifying ? (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Verifying...
          </div>
        ) : (
          "Verify Code"
        )}
      </Button>
      
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-1">
          Didn&apos;t receive the code?
        </p>
        <Button
          variant="ghost"
          onClick={handleResend}
          disabled={timer > 0}
          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 text-sm h-auto p-1"
        >
          {timer > 0 ? `Resend in ${timer}s` : "Resend Code"}
        </Button>
      </div>
    </div>
  );
}