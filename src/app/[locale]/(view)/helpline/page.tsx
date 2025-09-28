import HotLineCard from "@/components/HotLineCard";
import { useTranslations } from "next-intl";

export default function HotLinePage() {
  const t = useTranslations("Helpline");

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold mt-16 mb-8">{t("title")}</h1>
        <p className="text-lg mb-8 text-center">{t("subtitle")}</p>
        <HotLineCard />
      </div>
    </>
  );
}