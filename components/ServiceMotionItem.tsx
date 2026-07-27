"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { revealItem } from "./Reveal";

export default function ServiceMotionItem({ children }: { children: ReactNode }) {
  return <motion.div variants={revealItem}>{children}</motion.div>;
}
