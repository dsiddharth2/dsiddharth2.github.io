import { describe, expect, it } from 'vitest';
import { heroBadge, heroRoles, heroTitleText, introTiles } from '@/data/hero';

describe('hero', () => {
  it('keeps the live H1', () => {
    expect(heroTitleText).toBe('Production AI systems for complex, real-world problems.');
  });

  it('starts the role rotator with the live About role', () => {
    expect(heroRoles[0]).toBe('Architect · Applied AI · Engineering Leader');
    expect(heroRoles.join(' ')).not.toMatch(/Associate/);
  });

  it('reuses the live 12+ badge', () => {
    expect(heroBadge).toEqual({ value: '12+', label: 'years shipping' });
  });

  it('has three intro tiles with the live ownership line last', () => {
    expect(introTiles).toHaveLength(3);
    expect(introTiles[2].body).toContain('I own the outcome end to end.');
  });
});
