"use client";

import { useAppContext } from "@/contexts/app-context";
import { Avatar, Drawer, Typography } from "@mui/material";
import {
  File,
  MessagesSquare,
  Pencil,
  ScrollText,
  Tag,
  Users
} from "lucide-react";
import Link from "next/link";
import React from "react";
import NavItem from "./nav-item";

const mainNavItems = [
  {
    text: "Specialists",
    icon: <Tag size={20} />,
    href: "/dashboard/specialists"
  },
  {
    text: "Clients",
    icon: <Users size={20} />,
    href: "/dashboard/clients"
  },
  {
    text: "Service Orders",
    icon: <File size={20} />,
    href: "/dashboard/orders"
  },
  {
    text: "eSignature",
    icon: <Pencil size={20} />,
    href: "/dashboard/e-signature"
  },
  {
    text: "Messages",
    icon: <MessagesSquare size={20} />,
    href: "/dashboard/messages"
  },
  {
    text: "Invoices & Receipts",
    icon: <ScrollText size={20} />,
    href: "/dashboard/invoices"
  }
];

export function AppSidebar() {
  const { isSidebarDrawerOpen, setIsSidebarDrawerOpen } = useAppContext();

  const handleCloseSidebarDrawer = () => setIsSidebarDrawerOpen(false);

  const Sidebar = () => (
    <div className="h-full w-70 bg-white">
      <div className="flex h-15 items-center justify-center px-2">
        <Link href="/" onClick={handleCloseSidebarDrawer}>
          <Typography sx={{ fontWeight: 600 }} variant="h6">
            ANYCOMP CLONE
          </Typography>
        </Link>
      </div>
      <div className="h-[calc(100%-60px)] border-r border-r-gray-300">
        {/* Profile */}
        <div className="px-3 py-10">
          <Typography
            variant="body1"
            sx={{ fontSize: 18, mb: 2, fontWeight: 600 }}
          >
            Profile
          </Typography>
          <div className="flex items-center gap-3">
            <Avatar />
            <div>
              <Typography fontSize={16} variant="body1">
                Gwen Lam
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: "primary.main", fontSize: 12, fontWeight: 600 }}
              >
                ST Comp Holdings Sdn Bhd
              </Typography>
            </div>
          </div>
        </div>
        {/* Nav menu */}
        <div className="mb-4 px-3">
          <Typography
            variant="body1"
            sx={{ fontSize: 14, fontWeight: 600, color: "gray" }}
          >
            Dashboard
          </Typography>
        </div>
        <div className="flex flex-col gap-1 px-3">
          {mainNavItems.map((item, idx) => (
            <NavItem
              key={idx}
              icon={item.icon}
              text={item.text}
              href={item.href}
              onClick={handleCloseSidebarDrawer}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <React.Fragment>
      <div className="hidden lg:block">
        <Sidebar />
      </div>
      <Drawer
        open={isSidebarDrawerOpen}
        onClose={() => setIsSidebarDrawerOpen(false)}
      >
        <Sidebar />
      </Drawer>
    </React.Fragment>
  );
}
