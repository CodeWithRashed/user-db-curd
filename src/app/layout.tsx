import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Toaster } from "react-hot-toast";
import { DataContextProvider } from "../Context/GlobalDataContext";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <DataContextProvider>
          <AntdRegistry>{children}</AntdRegistry>
        </DataContextProvider>
      </body>
    </html>
  );
}
