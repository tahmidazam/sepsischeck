"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Check } from "@/interfaces/check";
import { CheckComponents } from "@/interfaces/check-components";
import { Diagnosis } from "@/interfaces/diagnosis";
import { Dictionary } from "@/interfaces/dictionary";
import { useState } from "react";
import { Button } from "./ui/button";

type ExportFormat = "json";

export default function DownloadButton({
  dictionary,
  check,
  components,
  score,
  diagnosis,
  id,
}: {
  dictionary: Dictionary;
  check: Check;
  components: CheckComponents;
  score: number | null;
  diagnosis: Diagnosis;
  id: string;
}) {
  const [format, setFormat] = useState<ExportFormat>("json");

  const download = () => {
    const mutableCheck = {
      ...structuredClone(check),
      omittedParameters: check.omittedParameters,
    };

    mutableCheck.omittedParameters.forEach((parameter: string) => {
      if (parameter in mutableCheck)
        delete mutableCheck[parameter as keyof typeof mutableCheck];
    });

    const payload = JSON.stringify({
      ...mutableCheck,
      score,
      diagnosis,
      components,
    });
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${id}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" className="w-full">
          {dictionary.buttons.download}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Download check</AlertDialogTitle>
          <AlertDialogDescription>
            Download the check to disk.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Select
          value={format}
          onValueChange={(value) => setFormat(value as ExportFormat)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a export format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="json">
              JavaScript Object Notation (JSON)
            </SelectItem>
          </SelectContent>
        </Select>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={download}>Download</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
