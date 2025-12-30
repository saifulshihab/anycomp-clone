"use client";

import { AppSidebar } from "@/components/sidebar";
import { useAppContext } from "@/contexts/app-context";
import { Avatar, IconButton } from "@mui/material";
import { Bell, Menu, MessageSquareIcon } from "lucide-react";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { setIsSidebarDrawerOpen } = useAppContext();
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 bg-[#F8F7FA]">
        <div className="flex h-15 items-center justify-between border-b border-gray-300 bg-white pr-10 pl-5">
          <div className="hidden lg:block" />
          <IconButton
            className="block lg:hidden"
            onClick={() => setIsSidebarDrawerOpen(true)}
          >
            <Menu />
          </IconButton>
          <div className="flex items-center gap-3">
            <IconButton>
              <MessageSquareIcon size={18} />
            </IconButton>
            <IconButton>
              <Bell size={18} />
            </IconButton>
            <Avatar />
          </div>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
