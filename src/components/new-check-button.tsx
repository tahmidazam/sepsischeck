"use client";

import { Dictionary } from "@/interfaces/dictionary";
import { useCheckStore } from "@/state/check-store";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import { Button } from "./ui/button";

export default function NewCheckButton({
  dictionary,
  className,
}: {
  dictionary: Dictionary;
  className?: string;
}) {
  const reset = useCheckStore(useShallow((state) => state.reset));
  const router = useRouter();

  return (
    <Button
      className={className}
      onClick={() => {
        reset();

        router.push("/new");
      }}
    >
      {dictionary.buttons.newCheck}
    </Button>
  );
}
