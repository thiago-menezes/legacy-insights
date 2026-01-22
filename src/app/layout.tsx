import { GoogleTagManager } from '@next/third-parties/google';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import 'reshaped/bundle.css';
import './icon/tabler-300.css';
import '@/styles/global.scss';
import { CookieConsent, Footer, Header, ScrollToTop } from '@/components';
import { generateMetadata } from '@/features/seo';
import { GTMHandler } from '@/libs/gtm';
import { GTM_ID } from '@/libs/gtm/constants';
import Providers from './providers';

const inter = Inter({
  subsets: ['latin'],
});

const tablerIcons = localFont({
  src: [
    {
      path: './icon/fonts/tabler-icons-300-outline.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-tabler-icons',
  display: 'swap',
  preload: true,
});

export const generateStaticParams = async () => {
  const institutions = [
    'unama',
    'ung',
    'uni7',
    'unifael',
    'uninassau',
    'uninorte',
  ];

  return institutions.map((institution) => ({
    institution,
  }));
};

export { generateMetadata };

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      lang="pt-BR"
      className={tablerIcons.variable}
      suppressHydrationWarning
    >
      <GoogleTagManager gtmId={GTM_ID} />
      <body className={inter.className}>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedColorMode = localStorage.getItem('rs-color-mode');
                  if (storedColorMode === 'dark' || storedColorMode === 'light') {
                    document.documentElement.setAttribute('data-rs-color-mode', storedColorMode);
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <Providers>
          <GTMHandler />
          <ScrollToTop />
          <Header />
          {children}
          <Footer />
          <CookieConsent />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
