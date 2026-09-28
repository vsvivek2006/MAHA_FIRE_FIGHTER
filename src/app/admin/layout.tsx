import { ReactNode } from "react";
import { AdminNav } from "@/components/admin/AdminNav";

export const metadata = {
  title: "Admin Panel | Maha Firefighters",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <AdminNav />
      <main className="flex-1">{children}</main>
    </div>
  );
}
