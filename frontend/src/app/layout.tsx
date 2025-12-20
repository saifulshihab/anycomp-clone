import { AppSidebar } from "@/components/sidebar";
import { theme } from "@/theme";
import { Avatar, Box, IconButton } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { Bell, MessageSquareIcon } from "lucide-react";
import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Anycomp Clone",
  description:
    "Connect with a licensed Company Secretary and appoint them to register your company."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${redHatDisplay.className}`} suppressHydrationWarning>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex", minHeight: "100vh" }}>
              <AppSidebar />
              <Box sx={{ flex: 1, bgcolor: "#F8F7FA", px: 6, py: 10 }}>
                {/* Profile bar  */}
                <Box
                  sx={{
                    bgcolor: "white",
                    boxShadow: 1,
                    height: 60,
                    display: "flex",
                    alignItems: "center",
                    px: 10,
                    justifyContent: "end"
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
                {/* Page Content */}
                <Box>{children}</Box>
              </Box>
            </Box>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
