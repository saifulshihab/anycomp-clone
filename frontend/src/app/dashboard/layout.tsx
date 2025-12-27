import { AppSidebar } from "@/components/sidebar";
import { Avatar, IconButton } from "@mui/material";
import { Bell, MessageSquareIcon } from "lucide-react";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <div className="flex-1 bg-[#F8F7FA]">
        <div className="flex h-15 items-center justify-end border-b border-gray-300 px-10">
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
