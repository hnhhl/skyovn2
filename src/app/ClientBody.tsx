"use client";

import { useEffect, useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

export default function ClientBody({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    document.body.className = "antialiased";
    setMounted(true);
  }, []);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className="antialiased">
      <AuthProvider>
        {children}
      </AuthProvider>
    </div>
  );
}
