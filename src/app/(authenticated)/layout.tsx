import { DashboardHeader } from "@/components/dashboard-header";
import React from "react";

export default function BasicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>
    <DashboardHeader />
    {children}
    </div>;
};

