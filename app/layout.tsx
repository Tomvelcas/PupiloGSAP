import type { Metadata } from "next";
import "./globals.css";

const siteName = "Pupilo";
const siteDescription =
  "Pupilo potencia el aprendizaje personalizado con misiones gamificadas, IA y acompañamiento profesional para familias y terapeutas.";
const siteUrl = "https://pupilo-landing.vercel.app";
const previewImage = "/images/pupilo-open-graph.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} | Juega, aprende y crece acompañado`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Pupilo",
    "aprendizaje personalizado",
    "gamificación terapéutica",
    "IA educativa",
    "plataforma para familias",
    "misiones interactivas",
  ],
  authors: [{ name: "Equipo Pupilo" }],
  creator: "Pupilo",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    title: `${siteName} | Juega, aprende y crece acompañado`,
    description: siteDescription,
    siteName,
    images: [
      {
        url: previewImage,
        width: 1200,
        height: 630,
        alt: "Pupilo - Plataforma gamificada para aprendizaje personalizado",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@pupilo",
    creator: "@pupilo",
    title: `${siteName} | Juega, aprende y crece acompañado`,
    description: siteDescription,
    images: [previewImage],
  },
  icons: {
    icon: "/images/pupilo-icono.png",
    apple: "/images/pupilo-icono.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
