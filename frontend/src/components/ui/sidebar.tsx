"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  School,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Kelas",
    href: "/kelas",
    icon: School,
  },
  {
    name: "Siswa",
    href: "/siswa",
    icon: Users,
  }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen w-64 bg-background border-r">
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold">Sistem Sekolah</h1>
      </div>
      <nav className="space-y-1 px-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center px-4 py-3 text-sm font-medium rounded-md",
              pathname === item.href
                ? "bg-muted text-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-4 px-6">
        <button className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
          <LogOut className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
} 