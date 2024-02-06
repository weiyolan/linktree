import { SidebarLink } from "@/components/SidebarItems";
import { Cog, Globe, HomeIcon } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/", title: "Home", icon: HomeIcon },
  { href: "/account", title: "Account", icon: Cog },
  { href: "/settings", title: "Settings", icon: Cog },
  { href: "/resend", title: "Resend", icon: Globe },
  { href: "/pages", title: "Pages", icon: Globe },
  { href: "/movies", title: "Movies", icon: Globe },
];

export const additionalLinks: AdditionalLinks[] = [
  {
    title: "Test",
    links: [
      { href: "/", title: "Home", icon: HomeIcon },
      { href: "/account", title: "Account", icon: Cog },
      { href: "/settings", title: "Settings", icon: Cog },
      { href: "/resend", title: "Resend", icon: Globe },
      // { href: "/pages", title: "Resend", icon: Globe },
    ],
  },
];
