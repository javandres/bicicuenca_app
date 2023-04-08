import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

const accessToken: string = null;

async function fetchAccessToken(): Promise<string> {
  try {
    console.log(
      `fetchAccessToken from url=${process.env.NEXT_DASHBOARD_URL} username=${process.env.NEXT_DASHBOARD_USER}`
    );
    const body = {
      username: `${process.env.NEXT_DASHBOARD_USER}`,
      password: `${process.env.NEXT_DASHBOARD_PASSWORD}`,
      provider: 'db',
      refresh: true,
    };

    const response = await fetch(`${process.env.NEXT_DASHBOARD_URL}/api/v1/security/login`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const jsonResponse = await response.json();

    console.log('fetchAccessToken result:', jsonResponse?.access_token);
    return jsonResponse?.access_token;
  } catch (e) {
    console.error('Error in fetchAccessToken', e);
    return '';
  }
}

async function fetchGuestToken(dashboardId: string): Promise<string> {
  const accessToken = await fetchAccessToken();

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
    await fetchGuestToken(dashboardId);
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

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await runMiddleware(req, res, cors);

  const { query } = req;
  const dashboardId: string = `${query.dashboardId}`;

  const token = await fetchGuestToken(dashboardId);
  res.json({ token });
}
