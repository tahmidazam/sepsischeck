import * as React from "react";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const kbdVariants = cva(
  "pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded px-1.5 font-mono text-xs font-medium text-muted-foreground opacity-100"
);

export function Kbd({
  keys,
  className,
  ...props
}: {
  keys: string[];
  className?: string | undefined;
}) {
  return (
    <kbd className={cn(kbdVariants(), className)} {...props}>
      {keys.map((key, index) => (
        <span key={index}>{key}</span>
      ))}
    </kbd>
  );
}
