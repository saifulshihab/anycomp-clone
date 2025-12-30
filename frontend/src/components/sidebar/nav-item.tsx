import { Typography } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../../utils";

type Props = {
  icon: React.ReactNode;
  text: string;
  href: string;
  onClick?: () => void;
};

function NavItem(props: Props) {
  const { icon, text, href, onClick } = props;
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href} onClick={onClick}>
      <div
        className={cn(
          "hover:bg-primary flex items-center gap-3 rounded-sm px-3 py-2 transition-all hover:text-white",
          {
            "text-white": isActive,
            "text-inherit": !isActive,
            "bg-primary": isActive,
            "bg-inherit": !isActive
          }
        )}
      >
        <div>{icon}</div>
        <Typography variant="body2" sx={{ fontSize: 14, fontWeight: 500 }}>
          {text}
        </Typography>
      </div>
    </Link>
  );
}

export default NavItem;
