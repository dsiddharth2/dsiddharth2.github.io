import { describe, expect, it } from 'vitest';
import { getOpenSourceBySlug, openSourceProjects, type OpenSourceProject } from '@/data/opensource';
import {
  cloneCommand,
  dockerImageFromUrl,
  npmInstallCommand,
  npmPackageFromUrl,
  packagistPackageFromUrl,
  projectLinks,
  registryFor,
} from '@/utils/registry';

const project = (slug: string): OpenSourceProject => {
  const found = getOpenSourceBySlug(slug);
  if (!found) throw new Error(`missing ${slug}`);
  return found;
};

describe('URL parsing', () => {
  it('reads scoped and unscoped npm packages', () => {
    expect(npmPackageFromUrl('https://www.npmjs.com/package/@apralabs/create-agent-kit')).toBe(
      '@apralabs/create-agent-kit',
    );
    expect(npmPackageFromUrl('https://www.npmjs.com/package/plugvault')).toBe('plugvault');
    expect(npmPackageFromUrl('https://www.npmjs.com/package/plugvault?activeTab=readme')).toBe('plugvault');
    expect(npmPackageFromUrl('https://example.com/plugvault')).toBeNull();
  });

  it('reads Packagist and Docker Hub names', () => {
    expect(packagistPackageFromUrl('https://packagist.org/packages/dsiddharth2/php-zxing')).toBe(
      'dsiddharth2/php-zxing',
    );
    expect(packagistPackageFromUrl('https://packagist.org/packages/only-vendor')).toBeNull();
    expect(dockerImageFromUrl('https://hub.docker.com/r/dsiddharth2/codehawk')).toBe('dsiddharth2/codehawk');
    expect(dockerImageFromUrl('https://hub.docker.com/dsiddharth2')).toBeNull();
  });

  it('uses npm create for initializer packages', () => {
    expect(npmInstallCommand('@apralabs/create-agent-kit')).toBe('npm create @apralabs/agent-kit');
    expect(npmInstallCommand('create-thing')).toBe('npm create thing');
    expect(npmInstallCommand('plugvault')).toBe('npm install -g plugvault');
  });
});

describe('registryFor (live opensource.ts)', () => {
  it('matches the install command the Apra Agent Kit write-up already uses', () => {
    const kit = project('apra-agent-kit');
    const registry = registryFor(kit);
    expect(registry?.install).toBe('npm create @apralabs/agent-kit');
    expect(kit.overview.solution.join(' ')).toContain(registry?.install);
  });

  it('derives Plug from npm', () => {
    expect(registryFor(project('plug'))).toMatchObject({ name: 'npm', pkg: 'plugvault' });
  });

  it('derives CodeHawk from Docker Hub', () => {
    expect(registryFor(project('codehawk'))).toMatchObject({
      name: 'Docker Hub',
      install: 'docker pull dsiddharth2/codehawk',
    });
  });

  it('uses the live 277K+ Packagist stat for PHP ZXing', () => {
    const registry = registryFor(project('php-zxing'));
    expect(registry).toMatchObject({ name: 'Packagist', install: 'composer require dsiddharth2/php-zxing' });
    expect(registry?.stat).toBe('277K+ installs');
  });

  it('returns null when there is no registry URL', () => {
    expect(registryFor(project('moo-pin'))).toBeNull();
  });
});

describe('projectLinks', () => {
  it('keeps every live outbound link', () => {
    for (const item of openSourceProjects) {
      const hrefs = projectLinks(item).map((link) => link.href);
      expect(hrefs[0]).toBe(item.url);
      for (const url of [item.npmUrl, item.packagist, item.vaultUrl, item.dockerHub, item.demoUrl]) {
        if (url) expect(hrefs).toContain(url);
      }
    }
  });

  it('builds a clone command from the GitHub URL', () => {
    expect(cloneCommand(project('plug'))).toBe('git clone https://github.com/dsiddharth2/plug');
  });
});
