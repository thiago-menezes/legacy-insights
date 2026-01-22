import { Accordion, Link } from 'reshaped';
import { Icon } from '@/components/icon';
import { useCurrentInstitution } from '@/hooks';
import { getExternalLinkProps } from '@/utils/is-external-link';
import { useHeaderLinks } from '../api';
import styles from '../styles.module.scss';

export const MobileNav = ({ mobileMenuOpen }: { mobileMenuOpen: boolean }) => {
  const { institutionSlug } = useCurrentInstitution();
  const { links } = useHeaderLinks(institutionSlug);

  if (links.length <= 1) {
    return null;
  }

  return (
    <div
      className={`${styles.mobileNav} ${
        mobileMenuOpen ? styles.mobileNavOpen : ''
      }`}
    >
      <div className={styles.container}>
        <nav className={styles.mobileNavContent}>
          {links.slice(0, -1).map((link) => {
            if (link.sublinks && link.sublinks.length > 0) {
              return (
                <Accordion key={link.id}>
                  <Accordion.Trigger>
                    <div className={styles.mobileNavLink}>
                      {link.icon && <Icon name={link.icon} size={20} />}
                      {link.text}
                    </div>
                  </Accordion.Trigger>
                  <Accordion.Content>
                    {link.sublinks.map((sublink) => (
                      <Link
                        key={sublink.href}
                        href={sublink.href}
                        className={styles.mobileNavLink}
                        attributes={{ style: { paddingLeft: '32px' } }}
                        {...getExternalLinkProps(sublink.href)}
                      >
                        {sublink.text}
                      </Link>
                    ))}
                  </Accordion.Content>
                </Accordion>
              );
            }

            return (
              <Link
                key={link.id}
                href={link.href}
                className={styles.mobileNavLink}
                {...getExternalLinkProps(link.href)}
              >
                {link.icon && <Icon name={link.icon} size={20} />}
                {link.text}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
};
