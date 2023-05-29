import { m, useScroll, useSpring } from 'framer-motion';
// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import HomeDetalle from 'src/sections/home/HomeDetalle';
import HomeEstadoSistema from 'src/sections/home/HomeEstadoSistema';
// layouts
// sections
import HomePlanificador from 'src/sections/home/HomePlanificador';
import HomeGeovisor from 'src/sections/home/HomeGeovisor';
import HomeIntro from 'src/sections/home/HomeIntro';
import { HomeLookingFor } from '../sections/home';
import MainLayout from '../layouts/main';

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------

export default function HomePage() {
  const theme = useTheme();

  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const progress = (
    <m.div
      style={{
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 1999,
        position: 'fixed',
        transformOrigin: '0%',
        backgroundColor: theme.palette.primary.main,
        scaleX,
      }}
    />
  );

  return (
    <>
      <Head>
        <title> Cuenca - Análisis de datos y apoyo al sistema de bicicletas compartidas </title>
      </Head>

      {progress}

      {/* <HomeHero /> */}

      <Box
        sx={{
          overflow: 'hidden',
          position: 'relative',
          bgcolor: 'background.default',
        }}
      >
        <HomeLookingFor />
        <HomeIntro />
        <HomeEstadoSistema />
        <HomeDetalle />
        <HomePlanificador />
        <HomeGeovisor />
      </Box>
    </>
  );
}
