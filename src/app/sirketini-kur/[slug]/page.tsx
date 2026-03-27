import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CompanyTypeStoryPage from "@/components/SahisSirketiPage";
import { companyTypeConfigMap, companyTypeConfigs } from "@/app/sirket-kur/company-types";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return companyTypeConfigs.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const config = companyTypeConfigMap[slug];

  if (!config) {
    return {
      title: "Şirketini Kur | Work365",
    };
  }

  return {
    title: `${config.name} | Work365`,
    description: `${config.name} için kuruluş, dijital altyapı, süreç adımları ve başlangıç kapsamını Work365 ile inceleyin.`,
  };
}

export default async function CompanyTypePage({ params }: PageProps) {
  const { slug } = await params;
  const config = companyTypeConfigMap[slug];

  if (!config) {
    notFound();
  }

  return <CompanyTypeStoryPage config={config} />;
}
