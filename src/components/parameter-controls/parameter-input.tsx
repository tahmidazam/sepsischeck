"use client";

import { CheckSchema } from "@/interfaces/check";
import { Dictionary } from "@/interfaces/dictionary";
import { UnitfulParameter } from "@/interfaces/parameter";
import { ParameterControlElement } from "@/interfaces/parameter-control-element";
import setRef from "@/lib/set-ref";
import {
  CheckStore,
  defaultCheckState,
  useCheckStore,
} from "@/state/check-store";
import { D_DIMER_CONCENTRATION_UNITS } from "@/units/d-dimer-concentration-unit";
import { FIBRINOGEN_CONCENTRATION_UNITS } from "@/units/fibrinogen-concentration-unit";
import { LACTATE_CONCENTRATION_UNITS } from "@/units/lactate-concentration-unit";
import { MEAN_ARTERIAL_PRESSURE_UNITS } from "@/units/mean-arterial-pressure-unit";
import { PLATELET_CONCENTRATION_UNITS } from "@/units/platelet-concentration-unit";
import {
  ChangeEventHandler,
  MutableRefObject,
  useEffect,
  useState,
} from "react";
import { useShallow } from "zustand/react/shallow";
import ParameterLabel from "../parameter-label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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
    useShallow((state) => state.setGlobalValidationError)
  );

  const [value, setValue] = useState<string>(String(storeValue));
  const [validationError, setValidationError] = useState<boolean>(false);

  const handleOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);

    const result = CheckSchema.shape[parameter].shape.value.safeParse(
      event.target.value
    );

    if (omitted || (result.success && event.target.value !== "")) {
      setStoreValue(result.data ?? defaultCheckState.newCheck[parameter].value);
      setValidationError(false);
      setGlobalValidationError(false);
    } else {
      setValidationError(true);
      setGlobalValidationError(true);
    }
  };

  useEffect(() => {
    if (omitted) {
      setGlobalValidationError(false);
      setValidationError(false);
    }
  }, [omitted, setGlobalValidationError]);

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
    <div className=" flex flex-col gap-4 justify-end p-4 overflow-y-scroll max-w-lg mx-auto w-full">
      <ParameterLabel
        parameter={parameter}
        dictionary={dictionary}
        presentError={validationError}
      />

      <div className="grid grid-cols-3 gap-2">
        <Input
          className="text-right col-span-2"
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
    </div>
  );
}
