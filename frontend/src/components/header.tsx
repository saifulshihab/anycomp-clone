import { Button, Container, Typography } from "@mui/material";
import Link from "next/link";

function Header() {
  return (
    <div className="border-b border-gray-300">
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 4
        }}
      >
        <div className="py-4">
          <Link href="/">
            <Typography
              variant="h5"
              align="center"
              sx={{ textTransform: "uppercase" }}
              fontWeight={600}
            >
              Anycomp Clone
            </Typography>
          </Link>
        </div>
        <Link href="/dashboard">
          <Button variant="contained">Go To Dashboard</Button>
        </Link>
      </Container>
    </div>
  );
}

export default Header;
