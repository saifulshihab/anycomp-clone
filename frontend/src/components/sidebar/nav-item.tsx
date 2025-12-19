import { cn } from "@/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  icon: React.ReactNode;
  text: string;
  href: string;
};

function NavItem(props: Props) {
  const { icon, text, href } = props;
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href}>
      <div
        className={cn(
          "flex items-center gap-3 rounded px-3 py-2 transition hover:bg-[#002F70] hover:text-white",
          {
            "bg-[#002F70] text-white": isActive
          }
        )}
      >
        <div className="shrink-0">{icon}</div>
        <span className="truncate text-sm font-medium">{text}</span>
      </div>
    </Link>
  );
}

export default NavItem;
