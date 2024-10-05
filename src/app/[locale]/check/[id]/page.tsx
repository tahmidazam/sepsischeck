import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "../../../../../i18n.config";
import CheckSummary from "./check-summary";

export default async function CheckPage({
  params: { locale, id },
}: {
  params: { locale: Locale; id: string };
}) {
  const dictionary = await getDictionary(locale);

  return (
    <div>
      <CheckSummary dictionary={dictionary} checkId={id} />
    </div>
  );
}
