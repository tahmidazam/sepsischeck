"use client";

import { Input } from "@/components/ui/input";
import { CheckSchema } from "@/interfaces/check";
import { Dictionary } from "@/interfaces/dictionary";
import { DimensionlessParameter } from "@/interfaces/parameter";
import { ParameterControlElement } from "@/interfaces/parameter-control-element";
import setRef from "@/lib/set-ref";
import { cn } from "@/lib/utils";
import {
  CheckStore,
  defaultCheckState,
  useCheckStore,
} from "@/state/check-store";
import { ChangeEventHandler, MutableRefObject, useState } from "react";
import { useShallow } from "zustand/react/shallow";

export default function DimensionlessParameterInput({
  dictionary,
  parameter,
  setterSelector,
  trailingText,
  controlRefs,
}: {
  dictionary: Dictionary;
  parameter: DimensionlessParameter;
  setterSelector: (state: CheckStore) => (value: number) => void;
  trailingText?: string;
  controlRefs: MutableRefObject<Map<string, ParameterControlElement>>;
}) {
  const storeValue = useCheckStore(
    useShallow((state) => state.newCheck[parameter])
  );
  const setStoreValue = useCheckStore(useShallow(setterSelector));
  const omitted = useCheckStore(
    useShallow((state) => state.newCheck.omittedParameters.includes(parameter))
  );
  const setGlobalValidationError = useCheckStore(
    useShallow((state) => state.setValidationError)
  );

  const [value, setValue] = useState<string>(String(storeValue));
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);

    const result = CheckSchema.shape[parameter].safeParse(event.target.value);

    if (omitted || (result.success && event.target.value !== "")) {
      setStoreValue(result.data ?? defaultCheckState.newCheck[parameter]);
      setValidationError(null);
      setGlobalValidationError(false);
    } else {
      setValidationError(dictionary.invalidValue);
      setGlobalValidationError(true);
    }
  };

  return (
    <div className="flex flex-row items-center gap-2">
      <Input
        className={cn(
          "text-right col-span-2",
          validationError && "bg-destructive/20"
        )}
        value={omitted ? "--" : value}
        onChange={handleOnChange}
        disabled={omitted}
        ref={(node) => setRef(controlRefs, parameter, node)}
        tabIndex={-1}
        inputMode="decimal"
      />

      {trailingText && <p>{trailingText}</p>}
    </div>
  );
}
