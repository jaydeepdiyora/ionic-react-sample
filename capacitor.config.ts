import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'user-fetch-demo',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
