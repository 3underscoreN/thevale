import { cn } from "@/lib/utils";

import { BentoButton } from "@/components/BentoGridMenu/BentoButton";

import MenuItem from "@/components/BentoGridMenu/MenuItem";

const menuItems: MenuItem[] = [
  {
    title: "創造回聲",
    testid: "create",
    description: "創造屬於你的回聲，讓心中的話語化為聲音，回蕩在山谷之中。",
    href: "/create",
    className: "row-span-2",
    color: "green",
  },
  {
    title: "靜谷之聲",
    testid: "silent",
    description: "探索其他旅人創造的回聲，感受他們的情感與故事。",
    href: "/viewsilent",
    className: "",
    color: "blue",
  },
  {
    title: "星光之聲",
    testid: "starlight",
    description: "在星光下，聆聽特別的回聲，感受來自同路人的支持。",
    href: "/viewstarlight",
    className: "",
    color: "amber",
  },
  {
    title: "山谷聽友",
    testid: "chatbot",
    description: "與智能聊天機器人交流，分享你的心情與故事，獲得陪伴與支持。",
    href: "/chatbot",
    className: "row-span-2",
    color: "pink",
  },
];

export default function BentoGridMenu({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 grid-flow-row md:grid-flow-col gap-4", className)} {...props}>
      {menuItems.map(({ title, testid, description, href, className, color }, index) => (
        <BentoButton key={index} title={title} testid={testid} description={description} href={href} className={className} color={color} />
      ))}
    </div>
  );
}