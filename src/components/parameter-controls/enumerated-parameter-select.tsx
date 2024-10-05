"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AGE_BANDS } from "@/interfaces/age-band";
import { Dictionary } from "@/interfaces/dictionary";
import { EnumeratedParameter } from "@/interfaces/parameter";
import { ParameterControlElement } from "@/interfaces/parameter-control-element";
import { PUPIL_STATES } from "@/interfaces/pupil-state";
import { RESPIRATORY_SUPPORT_CASES } from "@/interfaces/respiratory-support";
import setRef from "@/lib/set-ref";
import { CheckStore, useCheckStore } from "@/state/check-store";
import { MutableRefObject } from "react";
import { useShallow } from "zustand/react/shallow";

export default function EnumeratedParameterSelect<Option extends string>({
  dictionary,
  parameter,
  setterSelector,
  controlRefs,
}: {
  dictionary: Dictionary;
  parameter: EnumeratedParameter;
  setterSelector: (state: CheckStore) => (value: Option) => void;
  controlRefs: MutableRefObject<Map<string, ParameterControlElement>>;
}) {
  const storeValue = useCheckStore(
    useShallow((state) => state.newCheck[parameter])
  );
  const setStoreValue = useCheckStore(useShallow(setterSelector));
  const omitted = useCheckStore(
    useShallow((state) => state.newCheck.omittedParameters.includes(parameter))
  );

  const getCases = () => {
    switch (parameter) {
      case "ageBand":
        return AGE_BANDS.slice();
      case "respiratorySupport":
        return RESPIRATORY_SUPPORT_CASES.slice();
      case "pupilState":
        return PUPIL_STATES.slice();
    }
  };

  const labelDictionary: {
    [key: string]: string;
  } = dictionary[`${parameter}Labels`];

  return (
    <Select
      value={omitted ? undefined : storeValue}
      onValueChange={setStoreValue}
      disabled={omitted}
    >
      <SelectTrigger ref={(node) => setRef(controlRefs, parameter, node)}>
        <SelectValue placeholder="--" />
      </SelectTrigger>
      <SelectContent>
        {getCases().map((key) => (
          <SelectItem key={key} value={key}>
            {labelDictionary[key]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
