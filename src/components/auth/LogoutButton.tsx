"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton({ className }: { className?: string }) {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      className={
        className ??
        "inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-[13px] font-bold text-[#475569] transition-colors hover:bg-black/5"
      }
    >
      <LogOut className="h-4 w-4" /> Çıkış
    </button>
  );
}
