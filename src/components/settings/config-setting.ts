// components
import { SettingsValueProps } from './types';

const geoportalUrl = process.env.NEXT_PUBLIC_GEOPORTAL_URL;

// PLEASE REMOVE `LOCAL STORAGE` WHEN YOU CHANGE SETTINGS.
// ----------------------------------------------------------------------

export const defaultSettings: SettingsValueProps = {
  themeMode: 'dark',
  themeDirection: 'ltr',
  themeContrast: 'default',
  themeLayout: 'vertical',
  themeColorPresets: 'cyan',
  themeStretch: true,
};
