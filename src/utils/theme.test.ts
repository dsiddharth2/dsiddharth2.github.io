import { describe, expect, it } from 'vitest';
import { DEFAULT_THEME, THEME_STORAGE_KEY, nextTheme, parseTheme, resolveTheme, themeIcon } from '@/utils/theme';

describe('theme', () => {
  it('uses the shared storage key', () => {
    expect(THEME_STORAGE_KEY).toBe('sd-ai-theme');
  });

  it('defaults to dark when nothing is stored', () => {
    expect(DEFAULT_THEME).toBe('dark');
    expect(resolveTheme(null)).toBe('dark');
    expect(resolveTheme('blue')).toBe('dark');
    expect(resolveTheme('light')).toBe('light');
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
