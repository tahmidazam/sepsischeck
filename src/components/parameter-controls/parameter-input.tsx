"use client";

import { CheckSchema } from "@/interfaces/check";
import { D_DIMER_CONCENTRATION_UNITS } from "@/units/d-dimer-concentration-unit";
import { Dictionary } from "@/interfaces/dictionary";
import { FIBRINOGEN_CONCENTRATION_UNITS } from "@/units/fibrinogen-concentration-unit";
import { LACTATE_CONCENTRATION_UNITS } from "@/units/lactate-concentration-unit";
import { MEAN_ARTERIAL_PRESSURE_UNITS } from "@/units/mean-arterial-pressure-unit";
import { UnitfulParameter } from "@/interfaces/parameter";
import { PLATELET_CONCENTRATION_UNITS } from "@/units/platelet-concentration-unit";
import {
  CheckStore,
  defaultCheckState,
  useCheckStore,
} from "@/state/check-store";
import { ChangeEventHandler, MutableRefObject, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import setRef from "@/lib/set-ref";
import { ParameterControlElement } from "@/interfaces/parameter-control-element";
import { cn } from "@/lib/utils";

export default function ParameterInput<Unit>({
  dictionary,
  parameter,
  valueSetterSelector,
  unitSetterSelector,
  controlRefs,
}: {
  dictionary: Dictionary;
  parameter: UnitfulParameter;
  valueSetterSelector: (state: CheckStore) => (value: number) => void;
  unitSetterSelector: (state: CheckStore) => (value: Unit) => void;
  controlRefs: MutableRefObject<Map<string, ParameterControlElement>>;
}) {
  const storeValue = useCheckStore(
    useShallow((state) => state.newCheck[parameter].value)
  );
  const setStoreValue = useCheckStore(useShallow(valueSetterSelector));
  const storeUnitValue = useCheckStore(
    useShallow((state) => state.newCheck[parameter].unit)
  );
  const setStoreUnitValue = useCheckStore(useShallow(unitSetterSelector));
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

    const result = CheckSchema.shape[parameter].shape.value.safeParse(
      event.target.value
    );

    if (omitted || (result.success && event.target.value !== "")) {
      setStoreValue(result.data ?? defaultCheckState.newCheck[parameter].value);
      setValidationError(null);
      setGlobalValidationError(false);
    } else {
      setValidationError(dictionary.invalidValue);
      setGlobalValidationError(true);
    }
  };

  const getCases = () => {
    switch (parameter) {
      case "lactateConcentration":
        return LACTATE_CONCENTRATION_UNITS.slice();
      case "meanArterialPressure":
        return MEAN_ARTERIAL_PRESSURE_UNITS.slice();
      case "plateletConcentration":
        return PLATELET_CONCENTRATION_UNITS.slice();
      case "dDimerConcentration":
        return D_DIMER_CONCENTRATION_UNITS.slice();
      case "fibrinogenConcentration":
        return FIBRINOGEN_CONCENTRATION_UNITS.slice();
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2">
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

      <Select
        value={omitted ? undefined : storeUnitValue}
        onValueChange={(value) => setStoreUnitValue(value as Unit)}
        disabled={omitted}
      >
        <SelectTrigger>
          <SelectValue placeholder="--" />
        </SelectTrigger>
        <SelectContent>
          {getCases().map((key) => (
            <SelectItem key={key} value={key}>
              {key}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
