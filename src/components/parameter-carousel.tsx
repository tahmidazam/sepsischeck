"use client";

import { Dictionary } from "@/interfaces/dictionary";
import { ParameterControlElement } from "@/interfaces/parameter-control-element";
import { useCheckStore } from "@/state/check-store";
import { MutableRefObject } from "react";
import { useShallow } from "zustand/react/shallow";
import ParameterControl from "./parameter-control";

export default function ParameterCarousel({
  dictionary,
  controlRefs,
}: {
  dictionary: Dictionary;
  controlRefs: MutableRefObject<Map<string, ParameterControlElement>>;
}) {
  const selectedParameter = useCheckStore(
    useShallow((state) => state.selectedParameter)
  );
  return (
    <ParameterControl
      parameter={selectedParameter}
      dictionary={dictionary}
      controlRefs={controlRefs}
    />
  );
}
