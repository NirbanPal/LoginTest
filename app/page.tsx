import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">School Management System</h1>
        <p className="text-gray-600">Welcome to our school management system. Please register to get started.</p>
        <div className="flex justify-center">
          <Link href="/register">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-lg text-lg font-medium">
              Register Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}