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

export default function HomeDetalle() {
  return (
    <RootStyle>
      <Container>
        <Paper
          sx={{
            pb: 10,
            borderRadius: 3,
            textAlign: 'center',
            bgcolor: 'background.neutral',
          }}
          component={MotionViewport}
        >
          <m.div variants={varFade().inUp}>
            <Image
              alt="cover"
              src="/assets/images/home/print2.png"
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
                Detalle de registro de estaciones
              </Typography>
            </m.div>

            <m.div variants={varFade().inDown}>
              <Typography sx={{ color: 'text.secondary' }}>
                Muestra datos de número de registros medidos por minuto de anclajes disponibles,
                número de bicicletas disponibles y estado, los datos son mostrados desagregados por
                cada estación.
                <br />
                El núumero de registros hace referencia a los datos obtenidos del sistema cada
                minuto.
              </Typography>
            </m.div>
          </Box>
        </Paper>
      </Container>
    </RootStyle>
  );
}
