import { Layout } from '../components/layout/Layout';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}