import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import RequireAuth from "../components/RequireAuth";
import RequireGuest from "../components/RequireGuest";
import { ErrorPage } from "../components/ErrorBoundary";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Home from "../pages/Home/index";
import CartDetail from "../pages/CartDetail";
import Fiyatlar from "../pages/Fiyatlar";
import KullanimSartlari from "../pages/KullanimSartlari";
import GizlilikPolitikasi from "../pages/GizlilikPolitikasi";
import GizlilikSozlesmesi from "../pages/GizlilikSozlesmesi";
import MesafeliSatisSozlesmesi from "../pages/MesafeliSatisSozlesmesi";
import CerezPolitikasi from "../pages/CerezPolitikasi";
import VeriSahibiBasvuruFormu from "../pages/VeriSahibiBasvuruFormu";
import IadePolitikasi from "../pages/IadePolitikasi";
import KisiselVerilerinIslenmesineIliskinAydinlatma from "../pages/KisiselVerilerinIslenmesineIliskinAydinlatma";
import Checkout from "../pages/Checkout";
import Profil from "../pages/Profil";
import ProfilDetay from "../pages/ProfilDetay";
import TwoFactor from "../pages/TwoFactor";
import KurumsalDanismanlik from "../pages/KurumsalDanismanlik";
import KobiStartup from "../pages/KobiStartup";
import Hakkimizda from "../pages/Hakkimizda";
import Blog from "../pages/Blog";
import BlogDetail from "../pages/BlogDetail";
import Kutuphane from "../pages/Kutuphane/index";
import Araclar from "../pages/Araclar";
import Iletisim from "../pages/Iletisim";
import SirketKurulusu from "../pages/SirketKurulusu";
import AuthCallback from "../pages/AuthCallback";
import BelgeYukleme from "../pages/BelgeYukleme";
import BasvuruTakibi from "../pages/BasvuruTakibi/index";
import HizmetBasvuru from "../pages/HizmetBasvuru";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import TwoFactorVerify from "../pages/TwoFactorVerify";
import OrderDocuments from "../pages/OrderDocuments";
import PaymentResult from "../pages/PaymentResult";
import ThreeDSVerify from "../pages/ThreeDSVerify";
import DocumentRequests from "../pages/DocumentRequests";
import DocumentRequestDetail from "../pages/DocumentRequestDetail";
import Notifications from "../pages/Notifications";
import NotFound from "../pages/NotFound";
import AdminLogin from "../pages/AdminLogin";
import Maintenance from "../pages/Maintenance";
import OnboardingPage from "../pages/Onboarding";

const router = createBrowserRouter([
  // Dashboard Layout - No navbar/footer
  {
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/profil/detay",
        element: (
          <RequireAuth>
            <ProfilDetay />
          </RequireAuth>
        ),
      },
      {
        path: "/siparis/:orderId/belgeler",
        element: (
          <RequireAuth>
            <OrderDocuments />
          </RequireAuth>
        ),
      },
      {
        path: "/belgelerim",
        element: (
          <RequireAuth>
            <DocumentRequests />
          </RequireAuth>
        ),
      },
      {
        path: "/belgelerim/:id",
        element: (
          <RequireAuth>
            <DocumentRequestDetail />
          </RequireAuth>
        ),
      },
      {
        path: "/bildirimler",
        element: (
          <RequireAuth>
            <Notifications />
          </RequireAuth>
        ),
      },
    ],
  },
  // Main Layout - With navbar/footer
  {
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/fiyatlar", element: <Fiyatlar /> },
      {
        path: "/odeme", element: (
          <RequireAuth>
            <Checkout />
          </RequireAuth>
        )
      },
      {
        path: "/profil", element: (
          <RequireAuth>
            <Profil />
          </RequireAuth>
        )
      },
      {
        path: "/guvenlik/iki-asamali-dogrulama", element: (
          <RequireAuth>
            <TwoFactor />
          </RequireAuth>
        )
      },
      { path: "/kullanim-sartlari", element: <KullanimSartlari /> },
      { path: "/gizlilik-politikasi", element: <GizlilikPolitikasi /> },
      { path: "/gizlilik-sozlesmesi", element: <GizlilikSozlesmesi /> },
      { path: "/mesafeli-satis-sozlesmesi", element: <MesafeliSatisSozlesmesi /> },
      { path: "/cerez-politikasi", element: <CerezPolitikasi /> },
      { path: "/veri-sahibi-basvuru-formu", element: <VeriSahibiBasvuruFormu /> },
      { path: "/iade-politikasi", element: <IadePolitikasi /> },
      { path: "/kisisel-verilerin-islenmesine-iliskin-aydinlatma-ve-riza-metni", element: <KisiselVerilerinIslenmesineIliskinAydinlatma /> },
      {
        path: "/sepet", element: (
          <RequireAuth>
            <CartDetail />
          </RequireAuth>
        )
      },
      { path: "/kurumsal-danismanlik", element: <KurumsalDanismanlik /> },
      { path: "/kobi-startup", element: <KobiStartup /> },
      { path: "/hakkimizda", element: <Hakkimizda /> },
      { path: "/blog", element: <Blog /> },
      { path: "/blog/:slug", element: <BlogDetail /> },
      { path: "/kutuphane", element: <Kutuphane /> },
      { path: "/araclar", element: <Araclar /> },
      { path: "/iletisim", element: <Iletisim /> },
      {
        path: "/sirket-kurulusu",
        element: (
          <RequireAuth>
            <SirketKurulusu />
          </RequireAuth>
        ),
      },
      {
        path: "/onboarding",
        element: (
          <RequireAuth>
            <OnboardingPage />
          </RequireAuth>
        ),
      },
      { path: "/belge-yukleme", element: <BelgeYukleme /> },
      { path: "/basvuru-takibi", element: <BasvuruTakibi /> },
      { path: "/hizmet-basvuru", element: <HizmetBasvuru /> },
      { path: "/payment-result", element: <PaymentResult /> },
      { path: "/3ds-verify", element: <ThreeDSVerify /> },
      { path: "/auth/callback", element: <AuthCallback /> },
    ],
  },
  {
    path: "/login", element: (
      <RequireGuest>
        <Login />
      </RequireGuest>
    )
  },
  {
    path: "/register", element: (
      <RequireGuest>
        <Register />
      </RequireGuest>
    )
  },
  {
    path: "/sifre-sifirla", element: (
      <RequireGuest>
        <ResetPassword />
      </RequireGuest>
    )
  },
  {
    path: "/giris/iki-asamali-dogrulama", element: (
      <RequireGuest>
        <TwoFactorVerify />
      </RequireGuest>
    )
  },
  { path: "/forgot-password", element: <ForgotPassword /> },
  { path: "/auth/admin-login", element: <AdminLogin /> },
  { path: "/maintenance", element: <Maintenance /> },
  { path: "*", element: <NotFound /> },
]);
export default router;
