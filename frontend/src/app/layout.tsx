import { AppContextProvider } from "@/contexts/app-context";
import { theme } from "@/theme";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";
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
          <AppContextProvider>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </AppContextProvider>
          <Toaster />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
