import { es } from "date-fns/locale";
import { enGB } from "date-fns/locale";
import { Locale } from "../../i18n.config";

export function getDateFnsLocale(locale: Locale) {
  switch (locale) {
    case "es":
      return es;
    case "en-GB":
      return enGB;
  }
}
