'use client';

import { useScroll } from 'framer-motion';

import Box from '@mui/system/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import MainLayout from 'src/layouts/main';

import ScrollProgress from 'src/components/scroll-progress';
// ----------------------------------------------------------------------

export default function OverviewEcommerceView() {
  // const { user } = useMockedUser();
  const { scrollYProgress } = useScroll();
  // const theme = useTheme();

  return (
    <MainLayout>
      <ScrollProgress scrollYProgress={scrollYProgress} />
      <Container sx={{ pt: 10 }}>
        <Grid container spacing={3}>
          <Grid xs={12} md={8}>
            <Box sx={{ pt: 12, pr: 8 }}>
              <Typography component="h1" variant="h1">
                Turning Waste into Value, One Block at a Time
              </Typography>
              <Typography variant="body1" sx={{ fontSize: 24, fontWeight: '300' }}>
                Waste Protocol Carbon Credit Marketplace is built on the Ethereum blockchain using
                Solidity smart contracts to automate waste transactions, carbon credit purchases,
                and rewards with Waste Coin. We integrated Chainlink oracles to provide real-time
                carbon emission data for accurate carbon credit pricing. The platform features a
                Next.js frontend for a seamless Web2-to-Web3 user experience, with MetaMask
                integration for easy access.
              </Typography>
            </Box>
          </Grid>

          <Grid xs={12} md={4}>
            <Box sx={{ pt: 16 }}>
              <img src="assets/hero/glob.png" alt="glob" />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
}
