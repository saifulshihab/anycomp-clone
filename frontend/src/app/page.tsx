import {
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
    <div>
      <div className="border border-gray-300">
        <Container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 4
          }}
        >
          <div className="py-4">
            <Typography variant="h6" align="center" fontWeight={600}>
              Anycomp Clone
            </Typography>
          </div>
          <Link href="/dashboard">
            <Button variant="contained">Go To Dashboard</Button>
          </Link>
        </Container>
      </div>
      {/* Specialist */}
      <div>
        <Container>
          {/* Heading */}
          <div className="my-4">
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Register a New Company
            </Typography>
            <Typography variant="body2" color="#888">
              Get Your Company Registered with a Trusted Specialists
            </Typography>
          </div>
          {/* Filters */}
          <div className="flex gap-3">
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
          </div>
          {/* Specialists */}
          <Grid container spacing={6} sx={{ my: 4 }}>
            {Array(4)
              .fill(0)
              .map((_, idx) => (
                <Grid key={idx} size={4}>
                  <div>
                    <div className="relative h-55">
                      <Image fill alt="logo" src="/images/logo.png" />
                    </div>
                    <div>
                      <Typography variant="body1">Adam Low</Typography>
                      <Typography variant="body2">
                        Register your Company with the best Company Secretary in
                        KL
                      </Typography>
                    </div>
                  </div>
                </Grid>
              ))}
          </Grid>
        </Container>
      </div>
    </div>
  );
}
