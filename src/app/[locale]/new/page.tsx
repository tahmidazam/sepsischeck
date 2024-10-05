import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "../../../../i18n.config";
import NewCheck from "./new-check";

export default async function NewCheckPage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const dictionary = await getDictionary(locale);

  return <NewCheck locale={locale} dictionary={dictionary} />;
}
