import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "../../../../../i18n.config";
import CheckSummary from "./check-summary";

export default async function CheckPage(
  props: {
    params: Promise<{ locale: Locale; id: string }>;
  }
) {
  const params = await props.params;

  const {
    locale,
    id
  } = params;

  const dictionary = await getDictionary(locale);

  return (
    <div>
      <CheckSummary dictionary={dictionary} checkId={id} />
    </div>
  );
}
