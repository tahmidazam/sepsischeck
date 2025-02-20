import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "../../../../i18n.config";
import NewCheck from "./new-check";

export default async function NewCheckPage(
  props: {
    params: Promise<{ locale: Locale }>;
  }
) {
  const params = await props.params;

  const {
    locale
  } = params;

  const dictionary = await getDictionary(locale);

  return <NewCheck locale={locale} dictionary={dictionary} />;
}
