"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { validateProfileForm } from "@/lib/validation";
import { getUserProfile, updateUserProfile } from "@/lib/api";

export default function EditProfilePage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    birthDate: "",
    gender: "",
    description: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // Redirect unauthenticated users to login page
    if (!authLoading && !user) {
      router.push("/login");
      return;
    }

    // Fetch user profile once authenticated
    if (user) {
      fetchUserProfile();
    }
  }, [user, authLoading, router]);

  const fetchUserProfile = async () => {
    try {
      setIsLoading(true);
      const profileData = await getUserProfile();

      // Format birthDate for input field (YYYY-MM-DD format)
      const formattedDate = profileData.birthDate
        ? new Date(profileData.birthDate).toISOString().split("T")[0]
        : "";

      setFormData({
        email: profileData.email || "",
        name: profileData.name || "",
        birthDate: formattedDate,
        gender: profileData.gender || "",
        description: profileData.description || "",
      });
    } catch (error) {
      // Handle API errors gracefully
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError("Failed to load profile data");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear success message when user starts editing
    setSuccessMessage(null);

    // Validate individual field on change
    const fieldErrors = validateProfileForm({ ...formData, [name]: value });
    setErrors((prev) => ({ ...prev, [name]: fieldErrors[name] || "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setSuccessMessage(null);

    // Validate all fields before submitting
    const formErrors = validateProfileForm(formData);
    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        setIsSaving(true);
        await updateUserProfile(formData);
        setSuccessMessage("Profile updated successfully");
      } catch (error: any) {
        // Handle API error responses based on status code
        if (error.response && error.response.data) {
          const { statusCode, message } = error.response.data;

          if (statusCode === 404) {
            setServerError("Profile not found.");
          } else {
            setServerError(message || "Failed to update profile.");
          }
        } else if (error.message === "Network Error") {
          setServerError("Network error. Please try again later.");
        } else {
          setServerError("Failed to update profile.");
        }
      } finally {
        setIsSaving(false);
      }
    }
  };

  // Show loading message while fetching user profile
  if (isLoading) {
    return (
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <p className="text-center">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      {serverError && <p className="text-red-500 mb-4">{serverError}</p>}
      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
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

        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
