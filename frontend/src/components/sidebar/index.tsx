"use client";

import { Avatar } from "@mui/material";
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
    icon: <Tag />,
    href: "/specialists"
  },
  {
    text: "Clients",
    icon: <Users />,
    href: "/clients"
  },
  {
    text: "Service Orders",
    icon: <File />,
    href: "/orders"
  },
  {
    text: "eSignature",
    icon: <Pencil />,
    href: "/e-signature"
  },
  {
    text: "Messages",
    icon: <MessagesSquare />,
    href: "/messages"
  },
  {
    text: "Invoices & Receipts",
    icon: <ScrollText />,
    href: "/invoices"
  }
];

export function AppSidebar() {
  return (
    <div className="w-70 bg-white px-2">
      <div className="mt-10 flex justify-center">
        <Link href="/">
          <h2 className="text-2xl font-extrabold uppercase">Anycomp Clone</h2>
        </Link>
      </div>
      {/* Profile */}
      <div className="mt-10 px-3">
        <div className="mb-10 space-y-2">
          <h2 className="text-lg font-semibold">Profile</h2>
          <div className="flex items-center gap-3">
            <Avatar />
            <div>
              <p className="text-sm">Gwen Lam</p>
              <p className="text-xs">ST Comp Holdings Sdn Bhd</p>
            </div>
          </div>
        </div>
      </div>
      {/* Nav menu */}
      <div className="mb-4 px-3">
        <p className="text-sm font-bold text-gray-500">Dashboard</p>
      </div>
      <div className="flex flex-col space-y-1">
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
