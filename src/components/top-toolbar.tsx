import Link from "next/link";
import { Button } from "./ui/button";
import { HomeIcon } from "@radix-ui/react-icons";
import { AppearanceSwitcher } from "./appearance-switcher";
import LocaleSwitcher from "./locale-switcher";
import { Dictionary } from "@/interfaces/dictionary";
import { Locale } from "../../i18n.config";
import { Separator } from "./ui/separator";

export default function TopToolbar({
  locale,
  dictionary,
}: {
  locale: Locale;
  dictionary: Dictionary;
}) {
  return (
    <div className="top-0 sticky bg-inherit z-10">
      <div className="max-w-lg w-full px-4 py-2 flex flex-row justify-between mx-auto">
        <Button variant={"ghost"}>
          <Link href={`/${locale}`}>
            <HomeIcon />
          </Link>
        </Button>

        <div className="flex flex-row gap-2">
          <AppearanceSwitcher dictionary={dictionary} />

          <LocaleSwitcher
            locale={locale}
            dictionary={dictionary}
            target="dropdown"
          />
        </div>
      </div>

      <Separator />
    </div>
  );
}
