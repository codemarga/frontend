/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Code2, Trophy, Terminal, Award, User, Sparkles, Sun, Moon } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";

export function DashboardHeader() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const links = [
    { href: "/", label: "Dashboard", icon: Sparkles },
    { href: "/problems", label: "Problems", icon: Terminal },
    { href: "/contest", label: "Contests", icon: Trophy },
    { href: "/leaderboard", label: "Leaderboard", icon: Award },
    { href: "/profile", label: "Profile", icon: User },
  ];

  const [session, setSession] = useState<any | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/session");
        const data = await response.json();
        setSession(data?.data || null);
      } catch (e) {
        console.error("Failed to fetch session:", e);
      }
    };
    fetchSession();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border/60">
      <div className="container mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
            <Code2 className="w-4.5 h-4.5" />
          </div>
          <span className="text-lg font-bold text-foreground">
            CodeMarga
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-colors ${
                  isActive
                    ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right side: Theme toggle + User */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-8 h-8 text-muted-foreground hover:text-foreground"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </Button>

          <Link href="/profile" className="flex items-center gap-2 hover:opacity-85 transition-opacity">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt="User"
                width={30}
                height={30}
                className="rounded-full ring-2 ring-border"
              />
            ) : (
              <div className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                {session?.user?.name ? session.user.name[0].toUpperCase() : "U"}
              </div>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
