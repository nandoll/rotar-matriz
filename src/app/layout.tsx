import type { Metadata } from "next";
import "./globals.css"; // <-- Ahora importamos el CSS que acabamos de arreglar

export const metadata: Metadata = {
  title: "Prueba de Despliegue de CSS",
  description: "Probando el despliegue con CSS corregido",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
