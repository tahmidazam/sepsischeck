"use client";

import ParameterLabel from "@/components/parameter-label";
import { Dictionary } from "@/interfaces/dictionary";
import { Parameter, PARAMETERS } from "@/interfaces/parameter";
import { ParameterControlElement } from "@/interfaces/parameter-control-element";
import { EmblaViewportRefType } from "embla-carousel-react";
import { MutableRefObject } from "react";
import ParameterControl from "./parameter-control";

export default function ParameterCarousel({
  dictionary,
  emblaRef,
  controlRefs,
}: {
  dictionary: Dictionary;
  emblaRef: EmblaViewportRefType;
  controlRefs: MutableRefObject<Map<string, ParameterControlElement>>;
}) {
  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {PARAMETERS.map((parameter) => (
          <div key={parameter} className="shrink-0 grow-0 basis-full min-w-0 ">
            <div className=" flex flex-col gap-4 justify-end p-4 overflow-y-scroll max-w-lg mx-auto">
              <ParameterLabel
                parameter={parameter as Parameter}
                dictionary={dictionary}
              />

              <ParameterControl
                parameter={parameter}
                dictionary={dictionary}
                controlRefs={controlRefs}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
