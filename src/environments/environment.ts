import { environment as localEnv } from './environment.local';

export const environment = {
  production: localEnv.production,
  environmentName: localEnv.environmentName,
  baseUrl: localEnv.baseUrl,
};
