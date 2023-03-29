// next
import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Container, Typography, Box } from '@mui/material';
import { supersetDataProvider } from 'src/utils/supersetsDataProvider';
import { embedDashboard } from '@superset-ui/embedded-sdk';
import { Dashboard } from 'superset-dashboard-sdk';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';

// ----------------------------------------------------------------------

Dashboard1.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Dashboard1() {
  const { themeStretch } = useSettingsContext();
  const [iframeHeight, setIframeHeight] = useState(800);
  const [streamsetUrl, setStreamsetUrl] = useState(process.env.NEXT_PUBLIC_DASHBOARD_URL);
  const [dashboardId, setDashboardId] = useState(process.env.NEXT_PUBLIC_DASHBOARD1_ID);

  const getToken = async () => {
    const rawResponse = await fetch('/api/superset');

    const jsonResponse = await rawResponse.json();

    return `${jsonResponse.token}`;
  };

  useEffect(() => {
    const embed = async () => {
      await embedDashboard({
        id: `${dashboardId}`, // given by the Superset embedding UI
        supersetDomain: `${streamsetUrl}`,
        mountPoint: document.getElementById('dashboard') as HTMLElement, // html element in which iframe render
        fetchGuestToken: () => getToken(),
        dashboardUiConfig: {
          hideTitle: true,
          hideChartControls: true,
          hideTab: true,
          filters: {
            expanded: false,
          },
        },
      });
    };
    if (document.getElementById('dashboard')) {
      embed();
    }
  }, []);

  return (
    <>
      <Head>
        <title> Dashboard</title>
      </Head>

      <Container
        maxWidth={themeStretch ? false : 'xl'}
        style={{
          // position: 'absolute',
          overflow: 'hidden',
          width: '100%',
          height: '100%',
        }}
      >
        <div
          id="dashboard"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </Container>
    </>
  );
}
