/*
import type { Metadata } from "next";
import "./globals.css"; // <-- Eliminamos temporalmente la importación del CSS roto
*/

export const metadata = {
  title: "Prueba de Despliegue",
  description: "Probando el despliegue mínimo en Vercel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Eliminamos las clases de fuentes personalizadas temporalmente */}
      <body>{children}</body>
    </html>
  );
}
