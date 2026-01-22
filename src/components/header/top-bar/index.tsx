'use client';

import Link from 'next/link';
import { Button } from 'reshaped';
import { useColorMode, useCurrentInstitution } from '@/hooks';
import { getExternalLinkProps } from '@/utils/is-external-link';
import { Icon } from '../..';
import { useTopBarLinks } from '../api';
import styles from '../styles.module.scss';

export const TopBar = () => {
  const { invertColorMode, colorMode } = useColorMode();
  const { institutionSlug } = useCurrentInstitution();
  const { links } = useTopBarLinks(institutionSlug);

  return (
    <div className={styles.topBar}>
      <div className={styles.container}>
        <div className={styles.topBarContent}>
          <nav className={styles.utilityNav}>
            <Button
              size="small"
              icon={
                <Icon name={colorMode === 'dark' ? 'sun' : 'moon'} size={16} />
              }
              variant="ghost"
              onClick={invertColorMode}
              className={styles.utilityLink}
            />

            {links.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className={styles.utilityLink}
                {...getExternalLinkProps(link.href)}
              >
                {link.icon && <Icon name={link.icon} size={16} />}
                {link.text}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};
