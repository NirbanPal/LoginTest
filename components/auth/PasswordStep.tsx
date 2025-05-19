"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Eye, EyeOff, Lock } from "lucide-react";

interface PasswordStepProps {
  email: string;
  isEmailVerified: boolean;
  isOtpVerified: boolean;
  onRegister: () => void;
}

export function PasswordStep({ 
  email, 
  isEmailVerified,
  isOtpVerified,
  onRegister 
}: PasswordStepProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [errors, setErrors] = useState<{
    password?: string;
    confirmPassword?: string;
  }>({});
  
  const validatePassword = () => {
    const newErrors: {
      password?: string;
      confirmPassword?: string;
    } = {};
    
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleRegister = () => {
    if (!validatePassword()) return;
    
    setIsRegistering(true);
    
    // Mock API call to register user
    setTimeout(() => {
      setIsRegistering(false);
      onRegister();
    }, 1500);
  };
  
  const passwordStrength = (): { strength: string; color: string } => {
    if (password.length === 0) return { strength: "Empty", color: "bg-gray-200" };
    if (password.length < 6) return { strength: "Weak", color: "bg-red-500" };
    if (password.length < 10) return { strength: "Medium", color: "bg-yellow-500" };
    return { strength: "Strong", color: "bg-green-500" };
  };
  
  const { strength, color } = passwordStrength();
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-gray-700 font-medium">{email}</span>
          {isEmailVerified && isOtpVerified && (
            <CheckCircle2 className="h-5 w-5 text-blue-600" />
          )}
        </div>
        <p className="text-sm text-gray-600">
          Create a secure password for your account
        </p>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-700 font-medium block">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? "border-red-500 focus:ring-red-500" : ""}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
          
          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span>Password strength:</span>
              <span className={`
                ${strength === "Weak" ? "text-red-600" : ""}
                ${strength === "Medium" ? "text-yellow-600" : ""}
                ${strength === "Strong" ? "text-green-600" : ""}
                ${strength === "Empty" ? "text-gray-500" : ""}
              `}>
                {strength}
              </span>
            </div>
            <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full ${color} transition-all duration-300`} 
                style={{ 
                  width: password.length === 0 
                    ? "0%" 
                    : password.length < 6 
                    ? "33%" 
                    : password.length < 10 
                    ? "66%" 
                    : "100%" 
                }}
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-gray-700 font-medium block">
            Confirm Password
          </Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={errors.confirmPassword ? "border-red-500 focus:ring-red-500" : ""}
              autoComplete="new-password"
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>
      </div>
      
      <Button 
        onClick={handleRegister}
        disabled={!password || !confirmPassword || isRegistering}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isRegistering ? (
          <div className="flex items-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Registering...
          </div>
        ) : (
          "Register Account"
        )}
      </Button>
      
      <div className="text-center text-sm text-gray-500">
        <p className="flex items-center justify-center gap-1">
          <Lock className="h-3 w-3" />
          Your password is securely encrypted
        </p>
      </div>
    </div>
  );
}