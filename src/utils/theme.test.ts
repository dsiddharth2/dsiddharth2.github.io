import { describe, expect, it } from 'vitest';
import { THEME_STORAGE_KEY, nextTheme, parseTheme, themeIcon } from '@/utils/theme';

describe('theme', () => {
  it('uses the shared storage key', () => {
    expect(THEME_STORAGE_KEY).toBe('sd-ai-theme');
  });

  it('parses only light and dark', () => {
    expect(parseTheme('dark')).toBe('dark');
    expect(parseTheme('light')).toBe('light');
    expect(parseTheme('blue')).toBeNull();
    expect(parseTheme(null)).toBeNull();
  });

  it('flips and shows the target icon', () => {
    expect(nextTheme('light')).toBe('dark');
    expect(nextTheme('dark')).toBe('light');
    expect(themeIcon('light')).toBe('☾');
    expect(themeIcon('dark')).toBe('☀');
  });
});
