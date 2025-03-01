"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { validateLoginForm } from "@/lib/validation";

export default function LoginPage() {
  const router = useRouter();
  const { user, login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if user is already logged in
    if (user) {
      router.push("/editProfile");
    }
  }, [user, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate field on change
    const fieldErrors = validateLoginForm({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Validate all fields before submission
    const formErrors = validateLoginForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        await login(formData);
        router.push("/editProfile");
      } catch (error: any) {
        if (error.response && error.response.data) {
          const { statusCode, message } = error.response.data;

          if (statusCode === 404) {
            setServerError("User not found.");
          } else if (statusCode === 401) {
            setServerError("Incorrect username or password.");
          } else {
            setServerError(message || "An unexpected error occurred.");
          }
        } else if (error.message === "Network Error") {
          setServerError("Network error. Please try again later.");
        } else {
          setServerError("An unexpected error occurred.");
        }
      }
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {serverError && <p className="text-red-500 mb-4">{serverError}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        <div>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <p className="mt-4 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/signup" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
