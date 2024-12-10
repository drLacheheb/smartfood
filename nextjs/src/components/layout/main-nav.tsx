"use client";

import * as React from "react";
import Link from "next/link";
import { navLinks } from "@/config/nav-links";
import { usePathname } from "next/navigation";
import { Icons } from "../icons";

export function MainNav() {
  const pathname = usePathname();
  return (
    <div className="mr-4 hidden md:flex">
      <Link
        href="/"
        className="mx-6 flex items-center space-x-2 font-bold text-primary"
      >
        <Icons.logo />
      </Link>
      <nav className="flex items-center space-x-4 text-sm font-medium rtl:space-x-reverse">
        {pathname == "/" &&
          navLinks.map((link) => (
            <Link
              href={link.href}
              key={link.href}
              className="transition-colors hover:text-foreground/80"
            >
              {link.title}
            </Link>
          ))}
      </nav>
    </div>
  );
}
