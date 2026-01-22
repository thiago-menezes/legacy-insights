'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Text } from 'reshaped';
import { useCurrentInstitution } from '@/hooks';
import { getExternalLinkProps } from '@/utils/is-external-link';
import { Icon, type IconProps } from '..';
import { useFooterLinks, useSocialMediaLinks } from './api';
import { EmecBadge } from './emec-badge';
import { useEMec } from './emec-badge/api/query';
import styles from './styles.module.scss';

export const Footer = () => {
  const { institutionId, institutionSlug } = useCurrentInstitution();
  const { data: emecResponse } = useEMec(institutionId);
  const { links } = useFooterLinks(institutionSlug);
  const { socialLinks } = useSocialMediaLinks(institutionSlug);

  const emecData = emecResponse?.data?.[0];

  return (
    <footer className={styles.wrapper} role="contentinfo">
      <div className={styles.card}>
        <div className={styles.contentGrid}>
          <div className={styles.brandBlock}>
            <Image
              src={`/logos/${institutionId}/dark.svg`}
              alt="Logo"
              className={styles.logo}
              width={190}
              height={40}
            />

            <ul className={styles.socialList} aria-label="Redes sociais">
              {socialLinks.map((social) => {
                const href = social.url;
                const label = social.name;
                const iconName = social.icon;
                const key = social.id;

                return (
                  <li key={key}>
                    <Link
                      href={href}
                      aria-label={label}
                      className={styles.socialLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Icon name={iconName as IconProps['name']} size={20} />
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className={styles.privacyInfo}>
              <Link
                href="https://www.sereducacional.com/cookieconsent/politica_privacidade.html"
                className={styles.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Política de Privacidade <Icon name="external-link" size={16} />
              </Link>
              <Link href="mailto:dpo@inovalgpd.com.br" className={styles.link}>
                <Icon name="mail" size={16} />
                Email DPO: dpo@inovalgpd.com.br
              </Link>
            </div>
          </div>

          <ul className={styles.sections}>
            {links.map((link) => {
              const hasSublinks = link.sublinks && link.sublinks.length > 0;

              return (
                <li key={link.id} className={styles.section}>
                  {hasSublinks ? (
                    <>
                      <Text
                        as="h3"
                        variant="featured-2"
                        weight="bold"
                        className={styles.sectionTitle}
                      >
                        {link.text}
                      </Text>
                      <ul className={styles.links}>
                        {link.sublinks?.map((sublink, index) => (
                          <li key={index}>
                            <Link
                              href={sublink.href}
                              className={styles.link}
                              {...getExternalLinkProps(sublink.href)}
                            >
                              {sublink.text}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className={styles.link}
                      {...getExternalLinkProps(link.href)}
                    >
                      {link.icon && <Icon name={link.icon} size={20} />}
                      {link.text}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          {emecData?.link && emecData.qrCode && (
            <div className={styles.badge}>
              <Text
                as="p"
                variant="body-3"
                align="center"
                className={styles.badgeTitle}
              >
                Consulte aqui o e-MEC da instituição
              </Text>

              <EmecBadge
                title="e-MEC"
                qrcodeUrl={emecData.qrCode}
                qrcodeAlt="QR Code e-MEC"
              />
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};
