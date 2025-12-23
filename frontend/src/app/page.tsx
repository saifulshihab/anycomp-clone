import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Box>
      <Box sx={{ border: 1, borderColor: "divider" }}>
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4
          }}
        >
          <Box sx={{ py: 4 }}>
            <Typography variant="h6" align="center" fontWeight={600}>
              Anycomp Clone
            </Typography>
          </Box>
          <Link href="/dashboard">
            <Button variant="contained">Go To Dashboard</Button>
          </Link>
        </Container>
      </Box>
      {/* Specialist */}
      <Box>
        <Container>
          {/* Heading */}
          <Box sx={{ my: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Register a New Company
            </Typography>
            <Typography variant="body2" color="#888">
              Get Your Company Registered with a Trusted Specialists
            </Typography>
          </Box>
          {/* Filters */}
          <Box sx={{ display: "flex", gap: 3 }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel size="small" id="price-select-label">
                Price
              </InputLabel>
              <Select
                size="small"
                label="Price"
                labelId="price-select-label"
                id="price-select"
              >
                <MenuItem value={10}>1000</MenuItem>
                <MenuItem value={20}>2000</MenuItem>
                <MenuItem value={30}>3000</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel size="small" id="sort-select-label">
                Sort by
              </InputLabel>
              <Select
                size="small"
                label="Sort by"
                labelId="sort-select-label"
                id="sort-select"
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {/* Specialists */}
          <Grid container spacing={6} sx={{ my: 4 }}>
            {Array(4)
              .fill(0)
              .map((_, idx) => (
                <Grid key={idx} size={4}>
                  <Box>
                    <Box
                      sx={{
                        position: "relative",
                        height: 220
                      }}
                    >
                      <Image fill alt="logo" src="/images/logo.png" />
                    </Box>
                    <Box>
                      <Typography variant="body1">Adam Low</Typography>
                      <Typography variant="body2">
                        Register your Company with the best Company Secretary in
                        KL
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
