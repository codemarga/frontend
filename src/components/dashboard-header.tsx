"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioIcon } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function DashboardHeader() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/problems", label: "Problems" },
    { href: "/contest", label: "Contest" },
    { href: "/leaderboard", label: "Leaderboard" },
    { href: "/groups", label: "Groups" },
    { href: "/signup", label: "Signup"},
  ];

    const [session, setSession] = useState<any | null>(null);
  
    useEffect(() => {
      const fetchSession = async () => {
        const response = await fetch("/api/session");
        const data = await response.json();
        setSession(data.data);
      };
  
      fetchSession();
    }, []);

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Image src="/logo.svg" alt="CodeMarga" width={40} height={40} />
          <span className="text-2xl font-bold text-gray-600">CodeMarga</span>
        </div>
        <nav className="hidden md:flex items-center space-x-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`custom-link ${
                pathname === link.href ? "active-link" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <Input className="max-w-[200px]" placeholder="Search..." />
          <Button variant="outline">Create Group</Button>
          <Button>Join Group</Button>
          <Image src={session?.user?.image} alt="User" width={32} height={32} className="rounded-full" />
          <RadioIcon className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </header>
  );
}
