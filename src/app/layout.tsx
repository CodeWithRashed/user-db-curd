import './globals.css'
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { Toaster } from 'react-hot-toast';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster/>
        <AntdRegistry>
        {children}
        </AntdRegistry>
        </body>
    </html>
  );
}
