"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

interface SuccessStepProps {
  email: string;
}

export function SuccessStep({ email }: SuccessStepProps) {
  return (
    <div className="text-center space-y-6 animate-fade-in">
      <div className="flex justify-center">
        <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-12 w-12 text-green-600 animate-success-check" />
        </div>
      </div>
      
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Registration Successful!</h2>
        <p className="text-gray-600">
          Your account has been created successfully.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          A confirmation email has been sent to {email}
        </p>
      </div>
      
      <div className="pt-4">
        <Link href="/login">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8">
            Go to Login
          </Button>
        </Link>
      </div>
    </div>
  );
}