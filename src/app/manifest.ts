import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gerenciador e Controle de Produção",
    short_name: "GCP",
    description: "Gerenciador de Produção",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#1a447e",
    icons: [
      {
        src: "../../public/icon0.ico",
        sizes: "32x32",
        type: "image/svg+xml",
      },
    ],
  };
}
