"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 8 }}     // fade in + small slide up
        animate={{ opacity: 1, y: 0 }}     // natural snap-in
        exit={{ opacity: 0, y: -8 }}       // fade out + small slide up
        transition={{
          duration: 0.18,                  // still fast
          ease: "easeOut",                 // smooth finish
        }}
        style={{ willChange: "opacity, transform" }}
        className="flex-1"
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
