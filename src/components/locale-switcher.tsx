"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dictionary } from "@/interfaces/dictionary";
import { GlobeIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { i18n, Locale } from "../../i18n.config";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function LocaleSwitcher({
  locale,
  dictionary,
  target = "select",
}: {
  locale: Locale;
  dictionary: Dictionary;
  target: "select" | "dropdown";
}) {
  const router = useRouter();
  const pathName = usePathname();
  const [currentLocale, setCurrentLocale] = useState(locale);

  useEffect(() => {
    setCurrentLocale(locale);
  }, [locale]);

  const redirectedPathName = (locale: Locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const handleValueChange = (newValue: string) => {
    const newPath = redirectedPathName(newValue as Locale);
    router.push(newPath);
  };

  if (target === "dropdown") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost">
                  <GlobeIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Change locale</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {i18n.locales.map((locale) => (
            <DropdownMenuCheckboxItem
              key={locale}
              checked={currentLocale === locale}
              onCheckedChange={() => {
                handleValueChange(locale);
              }}
            >
              {dictionary.locales[locale]}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (target === "select") {
    return (
      <Select value={currentLocale} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select locale" />
        </SelectTrigger>
        <SelectContent>
          {i18n.locales.map((locale) => (
            <SelectItem key={locale} value={locale}>
              {dictionary.locales[locale]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
}
