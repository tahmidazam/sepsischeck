import { ThemeProvider } from "@/components/theme-provider";
import TopToolbar from "@/components/top-toolbar";
import { getDictionary } from "@/lib/get-dictionary";
import type { Metadata } from "next";
import { i18n, Locale } from "../../../i18n.config";
import "./globals.css";

export const metadata: Metadata = {
  title: "SepsisCheck",
  description: "Paediatric sepsis and septic shock diagnostics",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale: locale }));
}

export default async function Root({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const dictionary = await getDictionary(params.locale);

  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body className="h-dvh flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TopToolbar locale={params.locale} dictionary={dictionary} />

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
