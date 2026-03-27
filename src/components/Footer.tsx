"use client";

import Link from "next/link";
import { ArrowRight, Twitter, Linkedin, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10 px-6">
      <div className="max-w-[1230px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
        <div className="lg:col-span-2">
          <Link href="/" className="mb-6 block">
            <img src="/LOGO-END.svg" alt="Work365 Logo" className="h-8 w-auto" />
          </Link>
          <p className="text-Work365-text mb-8 max-w-sm">
            Daha az laf, daha çok iş. İşletmenizin yasal süreçlerini, muhasebesini ve vergilerini kolayca yönetin.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
              <Twitter className="w-5 h-5 text-Work365-text" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
              <Linkedin className="w-5 h-5 text-Work365-text" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
              <Instagram className="w-5 h-5 text-Work365-text" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center hover:bg-gray-100 transition-colors">
              <Youtube className="w-5 h-5 text-Work365-text" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-6">Şirketini Kur</h4>
          <ul className="space-y-4 text-Work365-text text-sm">
            <li><Link href="/sirketini-kur/sahis-sirketi" className="hover:text-black transition-colors">Şahıs Şirketi</Link></li>
            <li><Link href="/sirketini-kur/limited-sirketi" className="hover:text-black transition-colors">Limited Şirketi</Link></li>
            <li><Link href="/sirketini-kur/anonim-sirketi" className="hover:text-black transition-colors">Anonim Şirketi</Link></li>
            <li><Link href="/sirketini-kur/bilanco-sirketi" className="hover:text-black transition-colors">Bilanço Şirketi</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-6">Hizmetler</h4>
          <ul className="space-y-4 text-Work365-text text-sm">
            <li><Link href="/fiyatlandirma" className="hover:text-black transition-colors">Fiyatlandırma</Link></li>
            <li><Link href="/dijitale-tasi" className="hover:text-black transition-colors">Dijital Ofis</Link></li>
            <li><Link href="/gorunur-ol" className="hover:text-black transition-colors">Görünür Ol</Link></li>
            <li><Link href="/buyut" className="hover:text-black transition-colors">İşini Büyüt</Link></li>
            <li><Link href="/iletisim" className="hover:text-black transition-colors">İletişim</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-6">Haber Bülteni</h4>
          <p className="text-Work365-text text-sm mb-4">
            Kurucular için haftalık ipuçları ve güncellemeler alın.
          </p>
          <div className="flex bg-gray-50 rounded-lg p-2 rounded-full border border-gray-200 focus-within:border-black transition-colors">
            <input 
              type="email" 
              placeholder="E-posta adresiniz" 
              className="bg-transparent border-none outline-none px-4 w-full text-sm"
            />
            <button className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition-colors">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1230px] mx-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center text-sm text-Work365-text">
        <p>© {new Date().getFullYear()} Piri Dijital A.Ş. Tüm hakları saklıdır.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="#" className="hover:text-black transition-colors">Gizlilik Politikası</Link>
          <Link href="#" className="hover:text-black transition-colors">Kullanım Şartları</Link>
        </div>
      </div>
    </footer>
  );
}
