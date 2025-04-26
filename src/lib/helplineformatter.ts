import { Helpline } from "@/interfaces/helpline";

export function HelplineType2Text(h: Helpline) {
  switch (h.type) {
    case "hotline":
      return "熱線";
    case "chatroom":
      return "即時聊天";
    case "website":
      return "網站";
    default:
      return "其他";
  }
}