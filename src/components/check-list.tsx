"use client";

import { Dictionary } from "@/interfaces/dictionary";
import { getDateFnsLocale } from "@/lib/get-date-fns-locale";
import { useCheckStore } from "@/state/check-store";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { Locale } from "../../i18n.config";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";

export default function CheckList({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const checkResults = useCheckStore((state) => state.checkResults);
  const router = useRouter();

  return (
    <div className="flex flex-col flex-grow max-w-lg mx-auto w-full py-4 gap-2">
      <h1 className="px-4 text-lg font-medium tracking-tight">Past checks</h1>

      <Table>
        <TableBody>
          {checkResults
            .toSorted((a, b) => {
              return (
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
              );
            })
            .map((checkResult) => (
              <TableRow
                key={checkResult.id}
                onClick={() => {
                  router.push(`/${locale}/check/${checkResult.id}`);
                }}
              >
                <TableCell className="font-medium pl-4">
                  {dictionary.diagnosisLabels[checkResult.diagnosis]}
                </TableCell>

                <TableCell className="text-right text-muted-foreground pr-4">
                  {formatDistanceToNow(new Date(checkResult.timestamp), {
                    addSuffix: true,
                    locale: getDateFnsLocale(locale),
                  })}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
