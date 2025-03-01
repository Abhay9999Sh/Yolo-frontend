"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { getUserProfile } from "@/lib/api";

export default function Header() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const profileData = await getUserProfile();
          setUsername(profileData.username);
        } catch (error) {
          console.error("Failed to fetch user profile", error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  // Only show header when user is logged in
  if (!user || isLoading) {
    return null;
  }

  return (
    <header className="bg-white shadow-sm py-4 px-6 flex justify-between items-center">
      <div className="font-medium">
        Welcome, &nbsp; <b>{username}</b>
      </div>
      <Button onClick={handleLogout} variant="outline" disabled={isLoading}>
        Logout
      </Button>
    </header>
  );
}
