"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dictionary } from "@/interfaces/dictionary";
import { Parameter, PARAMETERS } from "@/interfaces/parameter";
import { ParameterControlElement } from "@/interfaces/parameter-control-element";
import { useCheckStore } from "@/state/check-store";
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  Cross2Icon,
  PlusIcon,
} from "@radix-ui/react-icons";
import useEmblaCarousel from "embla-carousel-react";
import { useRouter } from "next/navigation";
import { MutableRefObject, useEffect, useMemo, useRef } from "react";
import { useShallow } from "zustand/react/shallow";
import { Locale } from "../../../../i18n.config";
import ParameterCarousel from "../../../components/parameter-carousel";

export default function NewCheck({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const router = useRouter();

  const selectedParameter = useCheckStore(
    useShallow((state) => state.selectedParameter)
  );
  const toggleParameterOmission = useCheckStore(
    useShallow((state) => state.toggleParameterOmission)
  );
  const selectedParameterOmitted = useCheckStore(
    useShallow((state) =>
      state.newCheck.omittedParameters.includes(selectedParameter)
    )
  );
  const globalValidationError = useCheckStore(
    useShallow((state) => state.validationError)
  );
  const saveCheck = useCheckStore(useShallow((state) => state.saveCheck));
  const setSelectedParameter = useCheckStore(
    useShallow((state) => state.setSelectedParameter)
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({
    duration: 15,
  });

  const controlRefs: MutableRefObject<Map<string, ParameterControlElement>> =
    useRef(new Map());

  useEffect(() => {
    if (!emblaApi) return;

    setSelectedParameter(
      PARAMETERS[emblaApi.selectedScrollSnap()] as Parameter
    );

    emblaApi.on("select", () => {
      const selectedScrollSnap = emblaApi.selectedScrollSnap();

      setSelectedParameter(PARAMETERS[selectedScrollSnap] as Parameter);

      const nextControl = controlRefs.current.get(
        PARAMETERS[selectedScrollSnap]
      );

      if (nextControl) nextControl.focus({ preventScroll: true });
    });
  }, [emblaApi, setSelectedParameter]);

  useEffect(() => {
    if (emblaApi) emblaApi.reInit({ watchDrag: !globalValidationError });
  }, [emblaApi, globalValidationError]);

  const progress = useMemo(() => {
    const index = PARAMETERS.indexOf(selectedParameter);

    return ((index + 1) / PARAMETERS.length) * 100;
  }, [selectedParameter]);

  const next = () => {
    if (globalValidationError) return;

    if (selectedParameter === "pupilState") {
      const id = saveCheck();
      router.push(`/${locale}/check/${id}`);
    } else {
      if (emblaApi) emblaApi.scrollNext();
    }
  };

  const omit = () => toggleParameterOmission(selectedParameter);

  const previous = () => {
    if (globalValidationError || selectedParameter === "ageBand") return;

    if (emblaApi) emblaApi.scrollPrev();
  };

  return (
    <div className="flex flex-col justify-between">
      <Progress value={progress} />

      <ParameterCarousel
        dictionary={dictionary}
        emblaRef={emblaRef}
        controlRefs={controlRefs}
      />

      <div className="grid grid-cols-3 gap-2 px-4 max-w-lg mx-auto w-full">
        <Button
          variant="secondary"
          disabled={selectedParameter === "ageBand" || globalValidationError}
          onClick={previous}
        >
          <ChevronLeftIcon className="mr-2 h-4 w-4" />
          {dictionary.buttons.previous}
        </Button>

        <Button
          onClick={omit}
          variant={selectedParameterOmitted ? "secondary" : "destructive"}
        >
          {selectedParameterOmitted ? (
            <>
              <PlusIcon className="mr-2 h-4 w-4" />
              {dictionary.buttons.add}
            </>
          ) : (
            <>
              <Cross2Icon className="mr-2 h-4 w-4" />
              {dictionary.buttons.omit}
            </>
          )}
        </Button>

        <Button onClick={next} disabled={globalValidationError}>
          {selectedParameter === "pupilState" ? (
            <>
              <CheckIcon className="mr-2 h-4 w-4" />
              {dictionary.buttons.complete}
            </>
          ) : (
            <>
              {dictionary.buttons.next}
              <ChevronRightIcon className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
