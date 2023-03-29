// next
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Container, Typography, Box } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';

// ----------------------------------------------------------------------

Maps.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Maps() {
  const { themeStretch } = useSettingsContext();
  const [iframeHeight, setIframeHeight] = useState(800);

  return (
    <>
      <Head>
        <title> Mapas</title>
      </Head>

      <Container
        maxWidth={themeStretch ? false : 'xl'}
        style={{
          overflow: 'hidden',
          width: '100%',
          height: '100%',
        }}
      >
        <iframe
          title="otp"
          src="https://kepler.gl/demo"
          frameBorder="0"
          height={iframeHeight}
          width="100%"
          scrolling="no"
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Container>
    </>
  );
}
