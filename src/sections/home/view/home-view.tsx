'use client';

import { useScroll } from 'framer-motion';
import { useState, useEffect } from 'react';

import Box from '@mui/system/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';

import axios from 'src/utils/axios';
import { fDate } from 'src/utils/format-time';

import MainLayout from 'src/layouts/main';
import { HOST_API } from 'src/config-global';

import ScrollProgress from 'src/components/scroll-progress';

import AppCurrentDownload from '../app-current-download';
import EcommerceYearlySales from '../ecommerce-yearly-sales';
import EcommerceWidgetSummary from '../ecommerce-widget-summary';
// ----------------------------------------------------------------------

export default function OverviewEcommerceView() {
  // const { user } = useMockedUser();
  const { scrollYProgress } = useScroll();

  const init = useBoolean(true);

  const [stat, setStat] = useState({
    hour: [],
    total: {} as any,
  });

  const chartBgColor = '#fdfdfd'; // FDF8FF , F5FCFF, FFFDF2

  useEffect(() => {
    (async () => {
      const { data: hourData } = await axios.get(`${HOST_API}/public/stat/hour`);
      const { data: totalData } = await axios.get(`${HOST_API}/public/stat/total`);
      setStat({ hour: hourData, total: totalData });
      init.onFalse();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (init.value) return null;

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
            <Box sx={{ pt: 16, animation: 'float 3s ease-in-out infinite' }}>
              <img src="assets/hero/glob.png" alt="glob" style={{ width: '100%' }} />
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 6 }}>
          <Typography variant="h2" sx={{ pl: 1 }}>
            Our stats
          </Typography>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid xs={4} md={4} lg={4}>
            <EcommerceWidgetSummary
              title="Product Sold"
              total={stat.total?.carbonEmissionCount}
              sx={{ backgroundColor: chartBgColor }}
            />
          </Grid>

          <Grid xs={4}>
            <EcommerceWidgetSummary
              title="Total Balance"
              total={stat.total?.tradeCount}
              sx={{ backgroundColor: chartBgColor }}
            />
          </Grid>

          <Grid xs={4}>
            <EcommerceWidgetSummary
              title="Sales Profit"
              total={+stat.total.usdcCount / 10e18}
              sx={{ backgroundColor: chartBgColor }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 6 }}>
          <Grid xs={12} md={6} lg={4}>
            <AppCurrentDownload
              sx={{ backgroundColor: chartBgColor }}
              title="Amount of waste collected"
              chart={{
                series: [
                  { label: 'Paper', value: 12244 },
                  { label: 'Paper', value: 53345 },
                  { label: 'Paper', value: 44313 },
                  { label: 'Paper', value: 78343 },
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            <EcommerceYearlySales
              sx={{ backgroundColor: chartBgColor }}
              title="Monthly classification"
              subheader=""
              chart={{
                categories: stat.hour.map((item: any) => fDate(item.timestamp)),
                series: [
                  {
                    year: '2019',
                    data: [
                      {
                        name: 'Carbon Emission',
                        data: stat.hour.map((item: any) => item.carbonEmissionCount),
                      },
                    ],
                  },
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            <EcommerceYearlySales
              sx={{ backgroundColor: chartBgColor }}
              title="Monthly classification"
              subheader=""
              chart={{
                categories: stat.hour.map((item: any) => fDate(item.timestamp)),
                series: [
                  {
                    year: '2019',
                    data: [
                      {
                        name: 'Trade',
                        data: stat.hour.map((item: any) => item.tradeCount),
                      },
                    ],
                  },
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={8}>
            <EcommerceYearlySales
              sx={{ backgroundColor: chartBgColor }}
              title="Monthly classification"
              subheader=""
              chart={{
                categories: stat.hour.map((item: any) => fDate(item.timestamp)),
                series: [
                  {
                    year: '2019',
                    data: [
                      {
                        name: 'USDC',
                        data: stat.hour.map((item: any) => item.usdcCount / 10e18),
                      },
                    ],
                  },
                ],
              }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <AppCurrentDownload
              sx={{ backgroundColor: chartBgColor }}
              title="Separated by type"
              chart={{
                series: [
                  { label: 'Paper', value: 12244 },
                  { label: 'Paper', value: 53345 },
                  { label: 'Paper', value: 44313 },
                  { label: 'Paper', value: 78343 },
                ],
              }}
            />
          </Grid>
        </Grid>
      </Container>
    </MainLayout>
  );
}
