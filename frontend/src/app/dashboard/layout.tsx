import { AppSidebar } from "@/components/sidebar";
import { Avatar, Box, IconButton } from "@mui/material";
import { Bell, MessageSquareIcon } from "lucide-react";

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <AppSidebar />
      <Box sx={{ flex: 1, bgcolor: "#F8F7FA" }}>
        <Box
          sx={{
            px: 10,
            height: 60,
            bgcolor: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            borderBottom: 1,
            borderColor: "divider"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <IconButton>
              <MessageSquareIcon size={18} />
            </IconButton>
            <IconButton>
              <Bell size={18} />
            </IconButton>
            <Avatar />
          </Box>
        </Box>
        <Box sx={{ p: 6 }}>{children}</Box>
      </Box>
    </Box>
  );
}
