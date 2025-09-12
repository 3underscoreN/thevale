type MenuItem = {
  title: string;
  testid: string | undefined;
  description: string;
  href: string;
  className: string;
  color: "green" | "blue" | "amber" | "pink";
}

export default MenuItem;