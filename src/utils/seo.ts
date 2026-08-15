import { site, getSiteUrl } from '@/config/site';
import { experienceDescription } from '@/data/experience';

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: site.name,
    url: getSiteUrl('/'),
    image: getSiteUrl('/images/profile.jpg'),
    jobTitle: 'Associate Architect',
    description: site.description,
    email: site.email,
    sameAs: [site.github, site.linkedin, site.medium],
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: getSiteUrl('/'),
    description: site.description,
    author: {
      '@type': 'Person',
      name: site.name,
      url: getSiteUrl('/'),
    },
  };
}

export function aboutPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `About — ${site.name}`,
    url: getSiteUrl('/about'),
    description:
      '12 years of turning ambiguous problems into production systems — ERPs, AI platforms, multi-agent pipelines — across startups and enterprise.',
    mainEntity: personJsonLd(),
  };
}

export function projectJsonLd(product: {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  tags: string[];
  company: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: product.title,
    alternateName: product.subtitle,
    description: product.tagline,
    url: getSiteUrl(`/projects/${product.slug}`),
    keywords: product.tags.join(', '),
    creator: {
      '@type': 'Person',
      name: site.name,
      url: getSiteUrl('/'),
    },
    about: {
      '@type': 'Organization',
      name: product.company,
    },
  };
}

export function openSourceJsonLd(project: {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  tags: string[];
  url: string;
  language: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: project.title,
    alternateName: project.subtitle,
    description: project.tagline,
    url: getSiteUrl(`/opensource/${project.slug}`),
    codeRepository: project.url,
    programmingLanguage: project.language,
    keywords: project.tags.join(', '),
    license: 'https://opensource.org/licenses/MIT',
    creator: {
      '@type': 'Person',
      name: site.name,
      url: getSiteUrl('/'),
    },
  };
}

export function experienceJsonLd(entry: {
  id: string;
  company: string;
  role: string;
  period: string;
  summary: string;
}) {
  const isEarlier = entry.company === 'Earlier';

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: entry.role ? `${entry.role} · ${entry.company}` : entry.company,
    description: experienceDescription(entry),
    url: getSiteUrl(`/experience/${entry.id}`),
    about: {
      '@type': 'Organization',
      name: entry.company,
    },
    mainEntity: {
      '@type': 'Person',
      name: site.name,
      url: getSiteUrl('/'),
      ...(entry.role ? { jobTitle: entry.role } : {}),
      ...(!isEarlier
        ? {
            worksFor: {
              '@type': 'Organization',
              name: entry.company,
            },
          }
        : {}),
    },
  };
}

export function collectionPageJsonLd(options: {
  name: string;
  path: string;
  description: string;
  items: { name: string; path: string }[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: options.name,
    url: getSiteUrl(options.path),
    description: options.description,
    isPartOf: {
      '@type': 'WebSite',
      name: site.name,
      url: getSiteUrl('/'),
    },
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: options.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: getSiteUrl(item.path),
      })),
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getSiteUrl(item.path),
    })),
  };
}
