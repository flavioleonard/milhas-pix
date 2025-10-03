import { DM_Sans } from 'next/font/google';
import { Layout } from '../components/layout/Layout';
import './globals.css';

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={dmSans.variable}>
      <body className={dmSans.className}>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}