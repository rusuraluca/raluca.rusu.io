"use client";

import { useSyncExternalStore, useState } from "react";
import { blogHomeAssets } from "@/components/blog/blog-home-assets";
import { applyTheme } from "@/lib/theme-client";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return document.documentElement.getAttribute("data-theme") === "dark";
}

function getServerSnapshot() {
  return false;
}

/** Figma light-switch illustration — toggles site theme on click. */
export function BlogModeSwitch({ className = "" }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [pressed, setPressed] = useState(false);
  const theme = isDark ? "dark" : "light";
  const assets = blogHomeAssets[theme];

  function toggle() {
    applyTheme(isDark ? "light" : "dark");
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      onTouchCancel={() => setPressed(false)}
      className={`blog-nav__mode ${pressed ? "blog-nav__mode--pressed" : ""} ${className}`.trim()}
    >
      <span className="blog-nav__label blog-nav__label--mode">mode</span>
      <span className="blog-nav__icon-wrap blog-nav__icon-wrap--mode">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={assets.toggle}
          alt=""
          width={103}
          height={157}
          className="blog-nav__icon blog-nav__icon--toggle"
        />
      </span>
    </button>
  );
}
