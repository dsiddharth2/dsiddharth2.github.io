import { site, getSiteUrl } from '@/config/site';

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
  fullDescription: string;
  tags: string[];
  company: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: product.title,
    alternateName: product.subtitle,
    description: product.fullDescription,
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
