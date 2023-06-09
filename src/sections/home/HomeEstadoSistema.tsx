/* eslint-disable react/no-unescaped-entities */
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

export default function HomeEstadoSistema() {
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
          <m.div variants={varFade().inUp}>
            <Image
              alt="cover"
              src="/assets/images/home/print1.png"
              sx={{ maxWidth: 520, mx: 'auto', pt: 5 }}
            />
          </m.div>

          <Box sx={{ mt: 3, mx: 'auto', px: 3, maxWidth: 560 }}>
            {/* <m.div variants={varFade().inDown}>
              <Typography variant="overline" sx={{ color: 'text.disabled' }}>
                new start
              </Typography>
            </m.div> */}

            <m.div variants={varFade().inDown}>
              <Typography variant="h2" sx={{ mt: 2, mb: 3 }}>
                Estado del sistema
              </Typography>
            </m.div>

            <m.div variants={varFade().inDown}>
              <Typography sx={{ color: 'text.secondary' }}>
                Visualización en tiempo real del estado del sistema, muestra datos sobre el número
                de anclajes, bicicletas disponibles, estaciones activas e inactivas y series
                temporales de todo el sistema
                <br />
                <br />
                <ul>
                  <li>
                    <span> Número de anclajes:</span> número de espacios de estacionamiento
                    disponibles en el sistema
                  </li>
                  <li>Número de biciletas: número de bicicletas disponibles para uso.</li>
                  <li>Estaciones. Activas: número de estaciones operativas.</li>
                  <li>
                    Estaciones. Inactivas: representa el número de estaciones no operativas. sistema
                  </li>
                </ul>
              </Typography>
            </m.div>
          </Box>
        </Paper>
      </Container>
    </RootStyle>
  );
}
