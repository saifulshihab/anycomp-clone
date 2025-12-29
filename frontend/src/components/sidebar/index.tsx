"use client";

import { Avatar, Typography } from "@mui/material";
import {
  File,
  MessagesSquare,
  Pencil,
  ScrollText,
  Tag,
  Users
} from "lucide-react";
import Link from "next/link";
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
  return (
    <div className="w-70 bg-white">
      <div className="flex h-15 items-center justify-center border-b border-gray-300 px-2">
        <Link href="/" style={{ textDecoration: "none" }}>
          <Typography sx={{ fontWeight: 600 }} variant="h6">
            ANYCOMP CLONE
          </Typography>
        </Link>
      </div>
      {/* Profile */}
      <div className="my-10 px-3">
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
          />
        ))}
      </div>
    </div>
  );
}
