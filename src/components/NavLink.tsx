"use client";

import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface NavLinkProps extends LinkProps {
  children: React.ReactNode;
  className?: string; // className can be a string or a function in React Router, but simpler here
  activeClassName?: string;
  exact?: boolean;
  to?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, to, exact, href, ...props }, ref) => {
    const pathname = usePathname();
    // Handle 'to' prop from React Router if present, otherwise use 'href'
    const linkHref = (to || href || "") as string;

    const isActive = exact
      ? pathname === linkHref
      : pathname?.startsWith(linkHref);

    return (
      <Link
        ref={ref}
        href={linkHref}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
