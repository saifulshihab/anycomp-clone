import Header from "@/components/header";
import { Container } from "@mui/material";

export default function PublicLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-2">
      <Header />
      <Container className="mb-2">{children}</Container>
    </div>
  );
}
