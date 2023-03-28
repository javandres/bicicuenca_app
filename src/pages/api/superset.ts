import type { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

async function fetchAccessToken(): Promise<string> {
  try {
    const body = {
      username: 'admin',
      password: 'admin',
      provider: 'db',
      refresh: true,
    };

    const response = await fetch('http://localhost:8088/api/v1/security/login', {
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
          id: '7562ccdb-eb2e-4d10-9595-6cb9a7d1a4f2',
        },
      ],
      rls: [],
      user: {
        username: 'guest',
        first_name: 'guest',
        last_name: 'guest',
      },
    };
    const response = await fetch('http://localhost:8088/api/v1/security/guest_token', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const jsonResponse = await response.json();
    console.log(
      '%c [ jsonResponse ]-64',
      'font-size:13px; background:pink; color:#bf2c9f;',
      jsonResponse
    );
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
