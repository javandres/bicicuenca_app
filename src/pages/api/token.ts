let accessToken: string = '';

export function isTokenExpired(token: string) {
  try {
    console.log('Validating token exp', token);
    const payloadBase64 = token.split('.')[1];
    const decodedJson = Buffer.from(payloadBase64, 'base64').toString();
    const decoded = JSON.parse(decodedJson);
    const { exp } = decoded;
    const expired = Date.now() >= Number(exp) * 1000;
    console.log('token expired', expired);
    return expired;
  } catch (e) {
    console.error('token no valid');
    return true;
  }
}

export async function fetchAccessToken(): Promise<string> {
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

    accessToken = jsonResponse?.access_token;

    return jsonResponse?.access_token;
  } catch (e) {
    console.error('Error in fetchAccessToken', e);
    return '';
  }
}

export async function getAccessToken() {
  if (isTokenExpired(accessToken)) {
    console.log('Expired token, fetching...');
    accessToken = await fetchAccessToken();
  }
  return accessToken;
}
