"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { validateSignupForm } from "@/lib/validation";

export default function SignupPage() {
  const router = useRouter();
  const { user, signup, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    birthDate: "",
    gender: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if user is already logged in
    if (user) {
      router.push("/editProfile");
    }
  }, [user, router]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate field on change
    const fieldErrors = validateSignupForm({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    // Validate all fields before submission
    const formErrors = validateSignupForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        await signup(formData);
        router.push("/login");
      } catch (error: any) {
        if (error.response && error.response.data) {
          const { statusCode, message } = error.response.data;

          if (statusCode === 409) {
            setServerError("Email or username is already in use.");
          } else if (statusCode === 400) {
            setServerError("Invalid input. Please check your details.");
          } else {
            setServerError(message || "An unexpected error occurred.");
          }
        } else {
          setServerError("An unexpected error occurred.");
        }
      }
    }
  };

  return (
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
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
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
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

        <div>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <Input
            type="date"
            name="birthDate"
            placeholder="Birth Date"
            value={formData.birthDate}
            onChange={handleChange}
          />
          {errors.birthDate && (
            <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>
          )}
        </div>

        <div>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        <div>
          <textarea
            name="description"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </Button>
      </form>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
