import { DefaultDataProvider } from 'superset-dashboard-sdk';

export const supersetDataProvider = new DefaultDataProvider('http://localhost:8088', {
  username: 'guest',
  password: 'guest',
});
