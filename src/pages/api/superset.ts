import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { setTimeout } from 'timers/promises';
import { getAccessToken, isTokenExpired } from './token';

async function fetchGuestToken(dashboardId: string): Promise<string> {
  const accessToken = await getAccessToken();

  try {
    console.log(
      `fetchGuestToken from url=${process.env.NEXT_DASHBOARD_URL} dashboardId=${
        dashboardId ?? process.env.NEXT_PUBLIC_DASHBOARD1_ID
      }`
    );
    const body = {
      resources: [
        {
          type: 'dashboard',
          id: `${dashboardId ?? process.env.NEXT_PUBLIC_DASHBOARD1_ID}`,
        },
      ],
      rls: [],
      user: {
        username: 'guest',
        first_name: 'guest',
        last_name: 'guest',
      },
    };

    const response = await fetch(`${process.env.NEXT_DASHBOARD_URL}/api/v1/security/guest_token`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const jsonResponse = await response.json();
    console.log('fetchGuestToken result', jsonResponse);
    return jsonResponse?.token;
  } catch (error) {
    console.error('Error in fetchGuestToken', error);
    console.error(error);
    const retryTime = 2000;
    console.error('Retry in ', retryTime);

    (async () => {
      await setTimeout(retryTime, 'resolved');
      const token = await fetchGuestToken(dashboardId);
      return token;
    })();

    return '';
  }
}

const cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
});

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const guestToken: {
  [key: string]: string;
} = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  const { query } = req;
  const dashboardId: string = `${query.dashboardId}`;

  if (guestToken[dashboardId] && !isTokenExpired(guestToken[dashboardId])) {
    console.log('Existing guest token');
    res.json({ token: guestToken[dashboardId] });
    return;
  }
  console.log('Generating new guest token');
  const token = await fetchGuestToken(dashboardId);
  guestToken[dashboardId] = token;

  res.json({ token: guestToken[dashboardId] });
}
