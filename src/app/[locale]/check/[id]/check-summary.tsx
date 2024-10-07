"use client";

import DownloadButton from "@/components/download-button";
import NewCheckButton from "@/components/new-check-button";
import { DataTable } from "@/components/ui/data-table";
import { CheckResult } from "@/interfaces/check-result";
import { Dictionary } from "@/interfaces/dictionary";
import { Parameter, PARAMETERS } from "@/interfaces/parameter";
import formatParameter from "@/lib/format-parameter";
import { useCheckStore } from "@/state/check-store";
import { notFound } from "next/navigation";
import { useShallow } from "zustand/react/shallow";

interface FormattedParameter {
  parameterLabel: string;
  value: string;
}

export default function CheckSummary({
  dictionary,
  checkId,
}: {
  dictionary: Dictionary;
  checkId: string;
}) {
  const checkResults: CheckResult | undefined = useCheckStore(
    useShallow((state) => state.checkResults.find((c) => c.id === checkId))
  );

  if (!checkResults) {
    return notFound();
  }

  const { check, components, score, diagnosis, id, timestamp } = checkResults;

  const formattedCheck: FormattedParameter[] = PARAMETERS.map((parameter) => ({
    parameterLabel: dictionary.parameters[parameter].primary,
    value: formatParameter(
      dictionary,
      parameter,
      check[parameter]!,
      check.omittedParameters as Parameter[]
    ),
  }));

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-center tracking-tight text-4xl font-medium">
            {dictionary.diagnosisLabels[diagnosis]}
          </p>

          <p className="text-center">
            {dictionary.scoreLabel.replace("${1}", String(score))}
          </p>
        </div>

        <DataTable
          columns={[
            {
              accessorKey: "componentLabel",
              header: dictionary.table.component,
            },
            {
              accessorKey: "score",
              header: dictionary.table.score,
            },
          ]}
          data={[
            {
              componentLabel: dictionary.parameterTypeLabels.respiratory,
              score: components.respiratoryComponent ?? "N/A",
            },
            {
              componentLabel: dictionary.parameterTypeLabels.cardiovascular,
              score: components.cardiovascularComponent ?? "N/A",
            },
            {
              componentLabel: dictionary.parameterTypeLabels.coagulation,
              score: components.coagulationComponent ?? "N/A",
            },
            {
              componentLabel: dictionary.parameterTypeLabels.neurological,
              score: components.neurologicalComponent ?? "N/A",
            },
          ]}
        />

        <DataTable
          columns={[
            {
              accessorKey: "parameterLabel",
              header: dictionary.table.parameter,
            },
            {
              accessorKey: "value",
              header: dictionary.table.value,
            },
          ]}
          data={formattedCheck}
        />

        <p className="text-muted-foreground text-xs">
          Check with local identifier <span className="font-mono">{id}</span>{" "}
          completed at {new Date(timestamp).toLocaleString()} with SepsisCheck
          v0.0.1
          {"."}
        </p>

        <div className="flex flex-row gap-4">
          <DownloadButton
            id={id}
            check={check}
            dictionary={dictionary}
            components={components}
            score={score}
            diagnosis={diagnosis}
          />
          <NewCheckButton dictionary={dictionary} className="w-full" />
        </div>
      </div>
    </div>
  );
}
