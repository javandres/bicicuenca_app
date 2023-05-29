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

export default function HomePlanificador() {
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
              src="/assets/images/home/print3.png"
              sx={{ maxWidth: 520, mx: 'auto', pt: 5 }}
            />
          </m.div>

          <Box sx={{ mt: 3, mx: 'auto', px: 3, maxWidth: 760 }}>
            {/* <m.div variants={varFade().inDown}>
              <Typography variant="overline" sx={{ color: 'text.disabled' }}>
                new start
              </Typography>
            </m.div> */}

            <m.div variants={varFade().inDown}>
              <Typography variant="h2" sx={{ mt: 2, mb: 3 }}>
                Planificador de rutas multimodal
              </Typography>
            </m.div>

            <m.div variants={varFade().inDown}>
              <Typography sx={{ color: 'text.secondary' }}>
                Permite evaluar el sistema mediante la cálculo y visualización de rutas combinando
                los diferentes medios de transporte como: Bici pública, tranvía, buses, bicicleta
                privada, caminata y auto, para ésto se implementó la plataforma de código abierto
                <a href="https://www.opentripplanner.org">OpenTripPlanner</a>
                <br />
                El planificador de rutas multimodal es muy útil para el análisis de accesibilidad,
                ya que permite identificar rutas y áreas de cobertura teniendo en cuenta las
                diferentes opciones de transporte disponibles.
                <br />
                La interfáz de usuario presenta triángulo de preferencia que permite al usuario
                ajustar la ruta entre rutas más rápidas, con menores pendientes, y más amigables
                para las bicis.
                <br />
                <br />
                Se puede interactual con el ruteador multimodal mediante Sistemas de Información
                Geográfica, lenguajes de programación como Python o R interactuando con la API de la
                instancia OpenTripPLanner con la dirección:
                <a href="http://201.159.223.152/otp/routers/cuenca">
                  http://201.159.223.152/otp/routers/cuenca/index/routes
                </a>
              </Typography>
            </m.div>
          </Box>
        </Paper>
      </Container>
    </RootStyle>
  );
}
