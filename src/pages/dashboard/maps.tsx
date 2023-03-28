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
  // let Iref = useRef("");

  // useEffect(() => {
  //   window.addEventListener("message", function (e) {
  //     //if (e.origin !== "https://px7wc.sse.codesandbox.io") return;
  //     console.log("dat", e.data);
  //     setRecievedMessage(e.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   Array.from(document.getElementsByTagName('iframe')).forEach((iframe) => {
  //     iframe?.contentWindow?.addEventListener(
  //       'load',
  //       () => {
  //         const doc = iframe?.contentWindow?.document;
  //         console.log(doc, '===', doc?.body?.scrollHeight);
  //         iframe.height = `${doc?.body?.scrollHeight}px` ?? '500';
  //       },
  //       true
  //     );
  //     iframe?.contentWindow?.addEventListener(
  //       'resize',
  //       () => {
  //         // eslint-disable-next-line no-unsafe-optional-chaining
  //         // iframe.height = `${iframe?.contentWindow?.document?.body?.scrollHeight + 40}`;
  //       },
  //       true
  //     );
  //   });
  // }, []);

  return (
    <>
      <Head>
        <title> Planificador de rutas Multimodal</title>
      </Head>

      {/* <div
        style={{
          position: 'absolute',
          overflow: 'hidden',
          width: '100%',
          height: '95%',
        }}
      >
        
      </div> */}

      <Container
        maxWidth={themeStretch ? false : 'xl'}
        style={{
          // position: 'absolute',
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
          // sandbox="allow-scripts allow-modal"
          loading="lazy"
          // className="responsive-iframe"
          style={{
            // position: 'absolute',
            // top: 0,
            // left: 0,
            // bottom: 0,
            // right: 0,
            width: '100%',
            height: '100%',
          }}

          // onLoad={(event) => {
          //   const { contentWindow } = event.target;
          //   const main = contentWindow?.document?.body?.querySelector('main');

          //   // Because the login form has a dynamic height, observe any size changes and update the iframe height
          //   const resizeObserver = new ResizeObserver((entries) => {
          //     entries.forEach((entry) => {
          //       setIframeHeight(entry.contentRect.height - 100);
          //     });
          //   });

          //   resizeObserver.observe(main);

          //   // When the iframe is hiden (i.e. modal is closed), remove any listeners
          //   const onVisibilityChange = () => {
          //     resizeObserver.disconnect();
          //     contentWindow.addEventListener('visibilitychange', onVisibilityChange);
          //   };

          //   // Add listener for when iframe is hiden (i.e. modal is closed)
          //   contentWindow.addEventListener('visibilitychange', onVisibilityChange);
          // }}
        />

        {/* <Typography variant="h4"> Planificador de rutas multimodal </Typography> */}

        {/* <iframe title="otp" src="http://201.159.223.152/otpui/" width="100%" /> */}
      </Container>
    </>
  );
}
