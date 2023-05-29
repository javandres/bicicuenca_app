import { m } from 'framer-motion';
// @mui
import Image from 'src/components/image/Image';
import { styled } from '@mui/material/styles';
import { Box, Paper, Container, Typography } from '@mui/material';
// components
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 0),
  },
}));

// ----------------------------------------------------------------------

export default function HomeIntro() {
  return (
    <RootStyle>
      <Container>
        <Paper
          sx={{
            pb: 6,
            borderRadius: 3,
            textAlign: 'center',
            bgcolor: 'background.neutral',
          }}
          component={MotionViewport}
        >
          <Box sx={{ mt: 3, mx: 'auto', px: 3, maxWidth: 560 }}>
            <m.div variants={varFade().inDown}>
              <Typography variant="overline" sx={{ color: 'text.disabled' }}>
                *****
              </Typography>
            </m.div>

            <m.div variants={varFade().inDown}>
              <Typography variant="h3" sx={{ mt: 2, mb: 3 }}>
                Plataforma de datos abiertos para soporte al sistema de Bíci Pública de Cuenca
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>
                El objetivo de ésta plataforma de datos del sistema de Bici Pública de Cuenca, es
                ser una herramienta para el personal del GAD de Cuenca y la Empresa Pública de
                Movilidad EMOV que permita conocer el estado en tiempo real, visualización de series
                temporales, exploración del sistema con un planificador de rutas multimodal, y
                visualización de datos en un mapa interactivo.
              </Typography>
            </m.div>
          </Box>
        </Paper>
      </Container>
    </RootStyle>
  );
}
