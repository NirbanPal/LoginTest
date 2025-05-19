import RegistrationForm from "@/components/auth/RegistrationForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - School Management System",
  description: "Create an account for the School Management System",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <RegistrationForm />
    </main>
  );
}