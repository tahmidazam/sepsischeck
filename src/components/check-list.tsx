"use client";

import { Dictionary } from "@/interfaces/dictionary";
import { getDateFnsLocale } from "@/lib/get-date-fns-locale";
import { useCheckStore } from "@/state/check-store";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { Locale } from "../../i18n.config";
import { Table, TableBody, TableCell, TableRow } from "./ui/table";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "./ui/context-menu";
import { Button } from "./ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Footer from "./footer";
import Link from "next/link";

export default function CheckList({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  const checkResults = useCheckStore((state) => state.checkResults);
  const deleteCheck = useCheckStore((state) => state.deleteCheck);
  const router = useRouter();

  const navigationToCheck = (id: string) => {
    router.push(`/${locale}/check/${id}`);
  };

  if (checkResults.length > 0)
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
                <ContextMenu key={checkResult.id}>
                  <ContextMenuTrigger asChild>
                    <TableRow
                      key={checkResult.id}
                      onClick={() => navigationToCheck(checkResult.id)}
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
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem
                      onClick={() => navigationToCheck(checkResult.id)}
                    >
                      {dictionary.buttons.openCheck}
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem
                      onClick={() => deleteCheck(checkResult.id)}
                    >
                      {dictionary.buttons.deleteCheck}
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))}
          </TableBody>
        </Table>

        <Footer
          dictionary={dictionary}
          className="text-left text-pretty pt-4"
        />
      </div>
    );

  return (
    <div className="flex flex-col justify-center flex-grow max-w-lg mx-auto w-full py-4 gap-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-medium tracking-tight text-center">
          {dictionary.hero.title}
        </h1>

        <p className="text-lg text-center text-balance">
          {dictionary.hero.subtitle}
        </p>
      </div>

      <div className="flex flex-row justify-center">
        <Button variant="secondary" asChild>
          <Link href="https://github.com/tahmidazam/sepsischeck">
            <GitHubLogoIcon className="mr-2" />
            {dictionary.buttons.viewOnGitHub}
          </Link>
        </Button>
      </div>

      <Footer dictionary={dictionary} className="justify-center" />
    </div>
  );
}
