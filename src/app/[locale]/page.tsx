import CheckList from "@/components/check-list";
import NewCheckButton from "@/components/new-check-button";
import { Separator } from "@/components/ui/separator";
import { getDictionary } from "@/lib/get-dictionary";
import { Locale } from "../../../i18n.config";

export default async function HomePage({
  params: { locale },
}: {
  params: { locale: Locale };
}) {
  const dictionary = await getDictionary(locale);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <CheckList locale={locale} dictionary={dictionary} />

      <Separator />

      <div className="max-w-lg w-full mx-auto p-4 gap-8">
        <NewCheckButton dictionary={dictionary} className="w-full" />
      </div>
    </div>
  );
}
