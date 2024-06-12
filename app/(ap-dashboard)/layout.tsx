import React from "react";
import type { Metadata } from "next";
import DashboardHeader from "@/components/ap-dashboard/DashboardHeader";

type APDashboardLayoutProps = {
  children: React.ReactNode;
};

const APDashboardLayout = ({ children }: APDashboardLayoutProps) => {
  return (
    <>
      <DashboardHeader />
      <div className="p-4 max-w-4xl mx-auto">
        {children}
      </div>
    </>
  )
};

export default APDashboardLayout;

export const metadata: Metadata = {
  title: '[blog.nekozuki.me] Activity Pub Dashboard',
  robots: 'noindex',
};