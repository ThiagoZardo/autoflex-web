import Sidebar from "../components/layout/Sidebar";
import "./globals.css";
import { ReduxProvider } from "@/src/store/provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ReduxProvider>
          <div style={{ display: "flex" }}>
            <Sidebar />
            <main style={{ padding: "30px", flex: 1 }}>{children}</main>
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
