import { Box, Typography } from "@mui/material";
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          borderRadius: 1,
          px: 3,
          py: 2,
          color: isActive ? "white" : "inherit",
          bgcolor: isActive ? "primary.main" : "inherit",
          ":hover": {
            bgcolor: "primary.main",
            color: "white"
          }
        }}
      >
        <Box>{icon}</Box>
        <Typography variant="body2" sx={{ fontSize: 14, fontWeight: 500 }}>
          {text}
        </Typography>
      </Box>
    </Link>
  );
}

export default NavItem;
