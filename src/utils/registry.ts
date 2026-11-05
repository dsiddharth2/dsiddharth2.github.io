import type { OpenSourceProject, OpenSourceStat } from '@/data/opensource';

export interface RegistryInfo {
  name: 'npm' | 'Packagist' | 'Docker Hub';
  url: string;
  pkg: string;
  install: string;
  /** A live stat that names the registry, e.g. "277K+ installs". */
  stat?: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export function npmPackageFromUrl(url: string): string | null {
  const index = url.indexOf('/package/');
  if (index < 0) return null;
  const parts = url.slice(index + '/package/'.length).split(/[?#]/)[0].split('/').filter(Boolean);
  if (!parts.length) return null;
  return parts[0].startsWith('@') && parts[1] ? `${parts[0]}/${parts[1]}` : parts[0];
}

/** `create-*` packages are initializers, so they install through `npm create`. */
export function npmInstallCommand(pkg: string): string {
  const match = pkg.match(/^(@[^/]+\/)?create-(.+)$/);
  if (match) return `npm create ${match[1] ?? ''}${match[2]}`;
  return `npm install -g ${pkg}`;
}

export function packagistPackageFromUrl(url: string): string | null {
  const index = url.indexOf('/packages/');
  if (index < 0) return null;
  const parts = url.slice(index + '/packages/'.length).split(/[?#]/)[0].split('/').filter(Boolean);
  return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : null;
}

export function dockerImageFromUrl(url: string): string | null {
  const index = url.indexOf('/r/');
  if (index < 0) return null;
  const parts = url.slice(index + '/r/'.length).split(/[?#]/)[0].split('/').filter(Boolean);
  return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : null;
}

function registryStat(stats: OpenSourceStat[], name: string): string | undefined {
  const needle = name.toLowerCase();
  const hit = stats.find((stat) => stat.label.toLowerCase().includes(needle));
  if (!hit) return undefined;
  const label = hit.label.replace(new RegExp(`\\b${name}\\b\\s*`, 'i'), '').trim();
  return label ? `${hit.metric} ${label}` : hit.metric;
}

/** Derived only from the live npm / Packagist / Docker Hub URLs on the project. */
export function registryFor(project: OpenSourceProject): RegistryInfo | null {
  if (project.npmUrl) {
    const pkg = npmPackageFromUrl(project.npmUrl);
    if (pkg) {
      return {
        name: 'npm',
        url: project.npmUrl,
        pkg,
        install: npmInstallCommand(pkg),
        stat: registryStat(project.stats, 'npm'),
      };
    }
  }
  if (project.packagist) {
    const pkg = packagistPackageFromUrl(project.packagist);
    if (pkg) {
      return {
        name: 'Packagist',
        url: project.packagist,
        pkg,
        install: `composer require ${pkg}`,
        stat: registryStat(project.stats, 'Packagist'),
      };
    }
  }
  if (project.dockerHub) {
    const pkg = dockerImageFromUrl(project.dockerHub);
    if (pkg) {
      return {
        name: 'Docker Hub',
        url: project.dockerHub,
        pkg,
        install: `docker pull ${pkg}`,
        stat: registryStat(project.stats, 'Docker'),
      };
    }
  }
  return null;
}

export function cloneCommand(project: Pick<OpenSourceProject, 'url'>): string {
  return `git clone ${project.url}`;
}

/** Every outbound link the live detail page shows, in the same order. */
export function projectLinks(project: OpenSourceProject): ProjectLink[] {
  return [
    { label: 'GitHub', href: project.url },
    ...(project.packagist ? [{ label: 'Packagist', href: project.packagist }] : []),
    ...(project.npmUrl ? [{ label: 'npm', href: project.npmUrl }] : []),
    ...(project.vaultUrl ? [{ label: 'Vault', href: project.vaultUrl }] : []),
    ...(project.dockerHub ? [{ label: 'Docker Hub', href: project.dockerHub }] : []),
    ...(project.demoUrl ? [{ label: 'Demos', href: project.demoUrl }] : []),
  ];
}
