import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

async function fetchAccessToken(): Promise<string> {
  try {
    const body = {
      username: `${process.env.NEXT_DASHBOARD_USER}`,
      password: `${process.env.NEXT_DASHBOARD_PASSWORD}`,
      provider: 'db',
      refresh: true,
    };

    console.log('%c [ body ]-7', 'font-size:13px; background:pink; color:#bf2c9f;', body);
    const response = await fetch(`${process.env.NEXT_PUBLIC_DASHBOARD_URL}/api/v1/security/login`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const jsonResponse = await response.json();

    return jsonResponse?.access_token;
  } catch (e) {
    console.error(e);
    return '';
  }
}

async function fetchGuestToken(): Promise<string> {
  const accessToken = await fetchAccessToken();

  try {
    const body = {
      resources: [
        {
          type: 'dashboard',
          id: `${process.env.NEXT_PUBLIC_DASHBOARD1_ID}`,
        },
      ],
      rls: [],
      user: {
        username: 'guest',
        first_name: 'guest',
        last_name: 'guest',
      },
    };
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DASHBOARD_URL}/api/v1/security/guest_token`,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const jsonResponse = await response.json();
    console.log('jsonResponse', jsonResponse);
    return jsonResponse?.token;
  } catch (error) {
    console.error(error);
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

  const token = await fetchGuestToken();
  res.json({ token });
}
