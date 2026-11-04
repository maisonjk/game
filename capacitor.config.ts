import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.sociallevels.ios',
  appName: 'Social Levels',
  webDir: 'dist',
  backgroundColor: '#0b0f19',
  ios: {
    contentInset: 'never',
    backgroundColor: '#0b0f19',
    scrollEnabled: true,
  },
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: '#0b0f19',
      showSpinner: false,
    },
  },
};

export default config;
