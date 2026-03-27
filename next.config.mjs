/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/sirket-kur", destination: "/sirketini-kur", permanent: true },
      { source: "/sirket-kur/sahis-sirketi", destination: "/sirketini-kur/sahis", permanent: true },
      { source: "/sirket-kur/limited-sirketi", destination: "/sirketini-kur/limited", permanent: true },
      { source: "/sirket-kur/anonim-sirketi", destination: "/sirketini-kur/anonim", permanent: true },
      { source: "/sirket-kur/bilanco-sirketi", destination: "/sirketini-kur/bilanco", permanent: true },
      { source: "/digital-altyapi", destination: "/dijitale-tasi", permanent: true },
      { source: "/ekosistem", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
