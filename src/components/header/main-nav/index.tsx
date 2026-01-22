import Image from 'next/image';
import Link from 'next/link';
import { Button, DropdownMenu, useTheme } from 'reshaped';
import { useCurrentInstitution } from '@/hooks';
import { getExternalLinkProps } from '@/utils/is-external-link';
import { Icon } from '../..';
import { useHeaderLinks } from '../api';
import styles from '../styles.module.scss';

export const MainNav = ({
  setMobileMenuOpen,
  mobileMenuOpen,
}: {
  setMobileMenuOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
}) => {
  const { institutionId, institutionName, institutionSlug } =
    useCurrentInstitution();
  const { colorMode } = useTheme();
  const { links } = useHeaderLinks(institutionSlug);

  const isDarkMode = colorMode === 'dark';
  const lastLink = links[links.length - 1];

  return (
    <div className={styles.mainNav}>
      <div className={styles.container}>
        <div className={styles.mainNavContent}>
          <Link href="/" className={styles.logo}>
            <Image
              src={`/logos/${institutionId}/${isDarkMode ? 'dark' : 'light'}.svg`}
              alt={`Logo ${institutionName}`}
              className={styles.logoImage}
              width={0}
              height={0}
              priority
              unoptimized
              style={{ width: 'auto' }}
            />
          </Link>

          <div className={styles.rightContainer}>
            <nav className={styles.desktopNav} aria-label="Main navigation">
              {links.slice(0, -1).map((link) => {
                const hasSublinks = link.sublinks && link.sublinks.length > 0;

                if (hasSublinks) {
                  return (
                    <DropdownMenu key={link.id} position="bottom">
                      <DropdownMenu.Trigger>
                        {(attributes) => (
                          <Button
                            size="large"
                            variant="ghost"
                            endIcon={<Icon name="chevron-down" size={16} />}
                            {...attributes}
                          >
                            {link.icon && <Icon name={link.icon} size={20} />}
                            {link.text}
                          </Button>
                        )}
                      </DropdownMenu.Trigger>

                      <DropdownMenu.Content>
                        {link.sublinks?.map((sublink, index) => (
                          <Link
                            href={sublink.href}
                            className={styles.link}
                            key={index}
                            {...getExternalLinkProps(sublink.href)}
                          >
                            <DropdownMenu.Item size="large">
                              {sublink.text}
                            </DropdownMenu.Item>
                          </Link>
                        ))}
                      </DropdownMenu.Content>
                    </DropdownMenu>
                  );
                }

                return (
                  <Link
                    key={link.id}
                    href={link.href || ''}
                    {...getExternalLinkProps(link.href)}
                  >
                    <Button size="large" variant="ghost" color="neutral">
                      {link.icon && <Icon name={link.icon} size={20} />}
                      {link.text}
                    </Button>
                  </Link>
                );
              })}
            </nav>

            {lastLink?.href && (
              <Link
                href={lastLink.href}
                {...getExternalLinkProps(lastLink.href)}
              >
                <Button
                  color="primary"
                  icon={<Icon name={lastLink.icon} size={16} />}
                  size="large"
                >
                  {lastLink.text}
                </Button>
              </Link>
            )}

            {links.length > 0 && (
              <button
                className={styles.mobileMenuButton}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                <Icon name={mobileMenuOpen ? 'x' : 'menu'} size={24} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
