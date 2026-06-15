import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LogoutButton from "@/components/auth/LogoutButton";
import SubscriptionsSection from "@/components/account/SubscriptionsSection";
import { getCurrentUser } from "@/lib/session";
import { listOrders, type OrderWithItems } from "@/lib/order-store";
import { formatKurus } from "@/lib/catalog";
import { Package, ShoppingBag } from "lucide-react";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATUS_LABEL: Record<string, { text: string; cls: string }> = {
  paid: { text: "Ödendi", cls: "bg-[#DCFCE7] text-[#166534]" },
  pending: { text: "Bekliyor", cls: "bg-[#FEF9C3] text-[#854D0E]" },
  failed: { text: "Başarısız", cls: "bg-[#FEE2E2] text-[#991B1B]" },
  canceled: { text: "İptal", cls: "bg-[#F1F5F9] text-[#475569]" },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short" });
}

export default async function HesabimPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/giris?next=/hesabim");
  }

  let orders: OrderWithItems[] = [];
  try {
    orders = await listOrders(user.id);
  } catch {
    orders = [];
  }

  return (
    <main className="min-h-screen bg-[#FAFBFC] pt-[92px]">
      <Header />

      <section className="px-6 py-12">
        <div className="mx-auto max-w-[1000px]">
          {/* Kullanıcı kartı */}
          <div className="mb-8 flex flex-col items-start justify-between gap-4 rounded-[24px] bg-white p-6 shadow-sm ring-1 ring-black/6 sm:flex-row sm:items-center">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#1b98d5]">Hesabım</p>
              <h1 className="mt-1 text-[24px] font-extrabold tracking-[-0.03em] text-[#0F172A]">
                {user.fullName || user.email}
              </h1>
              <p className="mt-0.5 text-[14px] text-[#64748B]">{user.email}</p>
            </div>
            <LogoutButton />
          </div>

          {/* Aboneliklerim (varsa) */}
          <SubscriptionsSection />

          {/* Satın Aldıklarım */}
          <div className="mb-5 flex items-center gap-2.5">
            <ShoppingBag className="h-6 w-6 text-[#0F172A]" />
            <h2 className="text-[20px] font-extrabold tracking-[-0.02em] text-[#0F172A]">Satın Aldıklarım</h2>
          </div>

          {orders.length === 0 ? (
            <div className="rounded-[24px] bg-white p-10 text-center shadow-sm ring-1 ring-black/6">
              <Package className="mx-auto h-12 w-12 text-[#CBD5E1]" />
              <p className="mt-4 text-[15px] text-[#475569]">Henüz bir satın alımınız yok.</p>
              <Link
                href="/sirketini-kur"
                className="mt-5 inline-flex rounded-full bg-[#1b98d5] px-6 py-3 text-[14px] font-bold text-white hover:bg-[#1580b3]"
              >
                Paketleri İncele
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const badge = STATUS_LABEL[order.status] ?? STATUS_LABEL.pending;
                return (
                  <div key={order.id} className="rounded-[20px] bg-white p-6 shadow-sm ring-1 ring-black/6">
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/6 pb-4">
                      <div>
                        <p className="text-[13px] font-semibold text-[#0F172A]">
                          Sipariş #{order.id}
                        </p>
                        <p className="mt-0.5 text-[12px] text-[#94A3B8]">{formatDate(order.createdAt)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`rounded-full px-3 py-1 text-[12px] font-bold ${badge.cls}`}>
                          {badge.text}
                        </span>
                        <span className="text-[16px] font-extrabold text-[#0F172A]">
                          {formatKurus(order.totalKurus)}
                        </span>
                      </div>
                    </div>
                    <ul className="mt-4 space-y-2.5">
                      {order.items.map((it, i) => (
                        <li key={`${order.id}-${i}`} className="flex items-center justify-between gap-3 text-[14px]">
                          <span className="min-w-0 truncate text-[#0F172A]">
                            {it.title}
                            {it.qty > 1 ? <span className="text-[#64748B]"> × {it.qty}</span> : null}
                          </span>
                          <span className="shrink-0 font-semibold text-[#475569]">
                            {formatKurus(it.unitPriceKurus * it.qty)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
