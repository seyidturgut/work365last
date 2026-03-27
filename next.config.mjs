/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/sirket-kur", destination: "/sirketini-kur", permanent: true },
      { source: "/sirket-kur/sahis-sirketi", destination: "/sirketini-kur/sahis-sirketi", permanent: true },
      { source: "/sirket-kur/limited-sirketi", destination: "/sirketini-kur/limited-sirketi", permanent: true },
      { source: "/sirket-kur/anonim-sirketi", destination: "/sirketini-kur/anonim-sirketi", permanent: true },
      { source: "/sirket-kur/bilanco-sirketi", destination: "/sirketini-kur/bilanco-sirketi", permanent: true },
      { source: "/sirketini-kur/sahis", destination: "/sirketini-kur/sahis-sirketi", permanent: true },
      { source: "/sirketini-kur/limited", destination: "/sirketini-kur/limited-sirketi", permanent: true },
      { source: "/sirketini-kur/anonim", destination: "/sirketini-kur/anonim-sirketi", permanent: true },
      { source: "/sirketini-kur/bilanco", destination: "/sirketini-kur/bilanco-sirketi", permanent: true },
      { source: "/digital-altyapi", destination: "/dijitale-tasi", permanent: true },
      { source: "/ekosistem", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
