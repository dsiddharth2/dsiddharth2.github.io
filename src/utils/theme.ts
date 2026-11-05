export type Theme = 'light' | 'dark';

export const THEME_STORAGE_KEY = 'sd-ai-theme';
export const DEFAULT_THEME: Theme = 'dark';

export const THEME_COLORS: Record<Theme, string> = {
  light: '#F7F5F0',
  dark: '#0E0E0D',
};

export function parseTheme(value: string | null | undefined): Theme | null {
  return value === 'dark' || value === 'light' ? value : null;
}

export function resolveTheme(value: string | null | undefined): Theme {
  return parseTheme(value) ?? DEFAULT_THEME;
}

export function nextTheme(current: Theme): Theme {
  return current === 'dark' ? 'light' : 'dark';
}

/** The icon shows the theme a click switches to. */
export function themeIcon(current: Theme): string {
  return current === 'dark' ? '☀' : '☾';
}
