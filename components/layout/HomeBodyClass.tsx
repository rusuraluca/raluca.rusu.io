"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Sets body.is-home for blog homepage layout. */
export function HomeBodyClass() {
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.toggle("is-home", pathname === "/");
    return () => document.body.classList.remove("is-home");
  }, [pathname]);

  return null;
}
