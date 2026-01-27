import { NavSection } from './types';

export const buildNavigationSections = (
  workspaceSlug?: string,
  projectSlug?: string,
): NavSection[] => [
  {
    title: 'Menu',
    items: [
      { label: 'Dashboard', href: '/', icon: 'chart-pie' },
      {
        label: 'Campanhas',
        href: '/campanhas',
        icon: 'chart-line',
        expandable: true,
        subItems: [
          { label: 'Meta', href: '/campanhas/meta' },
          { label: 'Google', href: '/campanhas/google' },
        ],
      },
    ],
  },
  {
    title: 'Gestão',
    items: [
      {
        label: 'Workspaces',
        href: '/workspaces',
        icon: 'file-text',
        expandable: false,
      },
      {
        label: 'Projetos',
        href: `/workspaces/${workspaceSlug}`,
        icon: 'folders',
      },
      {
        label: 'Integrações',
        href: `/workspaces/${workspaceSlug}/${projectSlug}`,
        icon: 'arrows-exchange',
      },
    ],
  },
];
