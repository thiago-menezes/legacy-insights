export const isExternalLink = (href: string | undefined | null): boolean => {
  if (!href) return false;

  if (href.startsWith('#') || href.startsWith('/')) {
    return false;
  }

  try {
    const url = new URL(href);

    if (url.protocol === 'mailto:' || url.protocol === 'tel:') {
      return false;
    }

    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

export const getExternalLinkProps = (
  href: string | undefined | null,
): { target?: '_blank'; rel?: 'noopener noreferrer' } => {
  if (isExternalLink(href)) {
    return {
      target: '_blank',
      rel: 'noopener noreferrer',
    };
  }
  return {};
};
