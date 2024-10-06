import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dictionary } from "@/interfaces/dictionary";
import { Parameter, PARAMETERS } from "@/interfaces/parameter";
import getParameterType from "@/lib/get-parameter-type";
import { cn } from "@/lib/utils";
import {
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";

export default function ParameterLabel({
  parameter,
  dictionary,
  presentError,
}: {
  parameter: Parameter;
  dictionary: Dictionary;
  presentError?: boolean;
}) {
  const parameterDictionary: {
    primary: string;
    secondary?: string;
    description?: string;
  } = dictionary.parameters[parameter];

  return (
    <div className="flex flex-row">
      <div className="flex-grow">
        <p className={cn("font-medium", presentError && "text-destructive")}>
          {presentError && (
            <ExclamationTriangleIcon className="align-middle inline mr-2" />
          )}
          {parameterDictionary.secondary
            ? `${dictionary.parameters[parameter].primary} (${parameterDictionary.secondary})`
            : dictionary.parameters[parameter].primary}{" "}
        </p>

        <p className="text-xs text-muted-foreground">
          {[
            dictionary.parameterCount
              .replaceAll("${1}", String(PARAMETERS.indexOf(parameter) + 1))
              .replaceAll("${2}", String(PARAMETERS.length + 1)),
            dictionary.parameterTypeLabels[getParameterType(parameter)],
          ].join(" · ")}
        </p>
      </div>

      {parameterDictionary.description && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">
              <InfoCircledIcon />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {dictionary.parameters[parameter].primary}
              </DialogTitle>
              <DialogDescription>
                {parameterDictionary.description}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button>Done</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
