import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { customerApi } from "../lib/api";
import { getToken } from "../lib/auth";
import MesafeliSatisSozlesmesiContent from "../components/MesafeliSatisSozlesmesiContent";

export default function MesafeliSatisSozlesmesi() {
  const { user } = useAuth();
  return (
    <div className="bg-white">
      <section className="relative pt-28 pb-16 bg-work-navy-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(96,165,250,0.45),transparent_55%)]" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold"
          >
            Mesafeli Satış Sözleşmesi
          </motion.h1>
          <p className="text-blue-100 mt-3 max-w-3xl">
            Piri Dijital A.Ş. ile mesafeli satış ve ön bilgilendirme koşulları.
          </p>
          {!user && (
            <p className="text-amber-200 mt-2 text-sm">
              Giriş yaparak müşteri bilgileriniz sözleşmede otomatik görünür.{" "}
              <Link to="/login" className="underline font-medium">Giriş yap</Link>
            </p>
          )}
        </div>
      </section>

      <section className="py-12 pb-20">
        <div className="container mx-auto px-6 max-w-4xl">
          <MesafeliSatisSozlesmesiContent />
        </div>
      </section>
    </div>
  );
}
