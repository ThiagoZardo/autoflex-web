"use client";

import Sidebar from "./Sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="ml-[220px] flex-1 p-10">{children}</main>
    </div>
  );
}
