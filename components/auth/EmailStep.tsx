"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2 } from "lucide-react";

interface EmailStepProps {
  email: string;
  setEmail: (email: string) => void;
  onVerify: () => void;
}

export function EmailStep({ email, setEmail, onVerify }: EmailStepProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isValid, setIsValid] = useState(true);
  
  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const handleVerify = () => {
    if (!validateEmail(email)) {
      setIsValid(false);
      return;
    }
    
    setIsValid(true);
    setIsVerifying(true);
    
    // Simulate API call to verify email
    setTimeout(() => {
      setIsVerifying(false);
      onVerify();
    }, 1500);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-700 font-medium block">
          Email Address
        </Label>
        <div className="relative">
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (!isValid) setIsValid(validateEmail(e.target.value));
            }}
            placeholder="you@example.com"
            className={`pr-10 ${!isValid ? "border-red-500 focus:ring-red-500" : "border-input"}`}
            autoComplete="email"
          />
        </div>
        {!isValid && (
          <p className="text-red-500 text-sm mt-1">Please enter a valid email address</p>
        )}
      </div>
      
      <Button 
        onClick={handleVerify} 
        disabled={!email || isVerifying} 
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
          "Verify Email"
        )}
      </Button>
      
      <p className="text-sm text-gray-500 text-center">
        We&apos;ll send a verification code to this email
      </p>
    </div>
  );
}