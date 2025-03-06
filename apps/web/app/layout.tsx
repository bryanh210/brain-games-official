// import { ReduxProvider } from "@repo/provider";
import { ReduxProvider } from '../../../packages/provider/provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
