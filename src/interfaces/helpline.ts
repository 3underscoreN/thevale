export type Helpline = {
  "title": string;
  "type": "hotline" | "chatroom" | "website";
  "phone": string | null;
  "link": string;
  "opening_hours": string | null;
  "is247": boolean | null;
  "description": string | null;
}