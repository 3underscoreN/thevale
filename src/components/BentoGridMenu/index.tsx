import { cn } from "@/lib/utils";

import { BentoButton } from "@/components/BentoGridMenu/BentoButton";

import MenuItem from "@/components/BentoGridMenu/MenuItem";

import { useTranslations } from "next-intl";

export default function BentoGridMenu({ className, ...props }: React.ComponentProps<"div">) {
  const t = useTranslations("LandingPage.Actions");

  const menuItems: MenuItem[] = [
    { /* Create */
      title: t("Create.title"),
      testid: "create",
      description: t("Create.desc"),
      href: "/create",
      className: "row-span-2",
      color: "green",
    },
    { /* View Silent */
      title: t("ViewSilent.title"),
      testid: "silent",
      description: t("ViewSilent.desc"),
      href: "/viewsilent",
      className: "",
      color: "blue",
    },
    { /* View Starlight */
      title: t("ViewStarlight.title"),
      testid: "starlight",
      description: t("ViewStarlight.desc"),
      href: "/viewstarlight",
      className: "",
      color: "amber",
    },
    {
      title: t("Chatbot.title"),
      testid: "chatbot",
      description: t("Chatbot.desc"),
      href: "/chatbot",
      className: "row-span-2",
      color: "pink",
    },
  ];

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 grid-flow-row md:grid-flow-col gap-4", className)} {...props}>
      {menuItems.map(({ title, testid, description, href, className, color }, index) => (
        <BentoButton key={index} title={title} testid={testid} description={description} href={href} className={className} color={color} />
      ))}
    </div>
  );
}
