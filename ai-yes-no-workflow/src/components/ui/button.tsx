import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "outline" | "ghost" | "danger"; size?: "sm" | "md" };
export function Button({ className, variant = "outline", size = "md", ...props }: Props) {
  return <button className={cn("button", `button-${variant}`, `button-${size}`, className)} {...props} />;
}
