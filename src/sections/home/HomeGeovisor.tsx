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

export default function HomeGeovisor() {
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
              src="/assets/images/home/print4.png"
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
                Geovisor
              </Typography>
            </m.div>

            <m.div variants={varFade().inDown}>
              <Typography sx={{ color: 'text.secondary' }}>
                Es una aplicación que permite la visualización de los datos espacio-temporales y
                capas geográficas en un mapa interactivo.
                <br />
                Mediante el consumo de los servicios web abiertos WMS y WFS permite la visualización
                de datos geoespaciales, como imágenes satelitales, capas de información geográfica,
                modelos 3D y otros datos abiertos de otras instituciones como el GAD de Cuenca,
                Universidad de Cuenca, Universidad del Azuay, la plataforma es compatible con una
                amplia gama de estándares abiertos de datos geoespaciales, lo que permite a los
                usuarios integrar datos de diferentes fuentes y compartir datos con otros sistemas.
                <br />
                <br />
                Entre las capas geográficas disponibles se puede encontrar: Equipamientos urbanos
                principales (educación, salud, recreación, cultural, administrativo) y puntos de
                interés. Isocronas de viaje a partir de cada estación en rangos de 5 minutos.
                Reporte del número de oportunidades urbanas accesibles desde cada estación dentro de
                las isocŕonas. Infraestructura ciclística urbana. Biciestacionamientos Talleres de
                bicicletas.
                <br />
                <br />
                Se puede acceder a los servicios web web espaciaes en
                <a href="http://geoserver.bici.ubica.ec:9998/geoserver/">
                  http://geoserver.bici.ubica.ec:9998/geoserver/
                </a>
              </Typography>
            </m.div>
          </Box>
        </Paper>
      </Container>
    </RootStyle>
  );
}
