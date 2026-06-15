import { redirect } from "next/navigation";

type GirisPageProps = {
  searchParams?: Promise<{
    company?: string;
    price?: string;
    label?: string;
    source?: string;
    term?: string;
    description?: string;
    features?: string;
    next?: string;
  }>;
};

export default async function GirisPage({ searchParams }: GirisPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const query = new URLSearchParams({ mode: "login" });

  if (params?.company) {
    query.set("company", params.company);
  }

  if (params?.price) {
    query.set("price", params.price);
  }

  if (params?.label) {
    query.set("label", params.label);
  }

  if (params?.source) {
    query.set("source", params.source);
  }

  if (params?.term) {
    query.set("term", params.term);
  }

  if (params?.description) {
    query.set("description", params.description);
  }

  if (params?.features) {
    query.set("features", params.features);
  }

  if (params?.next) {
    query.set("next", params.next);
  }

  redirect(`/kayit-ol?${query.toString()}`);
}
