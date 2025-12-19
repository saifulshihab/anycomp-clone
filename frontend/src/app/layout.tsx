import { AppSidebar } from "@/components/sidebar";
import { theme } from "@/theme";
import { Avatar, IconButton } from "@mui/material";
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
            <div className="flex">
              <AppSidebar />
              <div className="flex-1 space-y-6 bg-[#F8F7FA] text-black px-4 py-10">
                {/* Profile bar  */}
                <div className="bg-white shadow h-15 flex items-center px-10 justify-end">
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
                {/* Page Content */}
                <div className="min-h-[calc(100vh-10.25rem)]">{children}</div>
              </div>
            </div>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
