import Sidebar from "../components/layout/Sidebar";
import "./globals.css";
import { ReduxProvider } from "@/src/store/provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ReduxProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 p-8 bg-gray-50 overflow-auto">{children}</main>{" "}
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
