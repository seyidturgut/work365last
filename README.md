# Work365 - Kurumsal Hizmetler Platformu

Work365, girişimciler ve işletmeler için uçtan uca şirket kuruluşu, finansal yönetim ve kurumsal danışmanlık hizmetleri sunan modern bir web platformudur. Kullanıcıların şirket kurma süreçlerini dijitalleştiren, belge yönetimini kolaylaştıran ve operasyonel yüklerini azaltan kapsamlı çözümler sunar.

## 🚀 Proje Hakkında

Bu proje, React 19 ve Vite modern teknolojileri kullanılarak geliştirilmiş, performans ve kullanıcı deneyimi odaklı bir frontend uygulamasıdır. Kullanıcılar şu işlemleri gerçekleştirebilir:

- Şirket türüne (Şahıs, Limited, Anonim) göre online kuruluş başvurusu.
- Kuruluş süreçlerinin adım adım takibi (Noter, Vergi Dairesi, Banka).
- Belge yükleme ve yönetimi.
- Sanal ofis, ön muhasebe ve e-dönüşüm hizmetleri satın alma.
- Blog ve kütüphane içerikleri ile bilgi edinme.

## ✨ Öne Çıkan Özellikler

### 🏢 Şirket Kuruluşu ve Yönetimi
- **Bütünleşik Süreç:** Ön analizden vergi levhası çıkışına kadar tüm adımlar dijital ortamda yönetilir.
- **Gerçek Zamanlı Takip:** Kuruluş sürecinin hangi aşamada olduğunu anlık olarak görüntüleme.

### 💼 KOBİ & Startup Çözümleri
- **Sanal Ofis:** Fiziksel ofis ihtiyacı olmadan yasal adres temini.
- **Online Muhasebe:** Finansal süreçlerin dijitalleşmesi.
- **Marka Tescil:** Marka koruma ve başvuru süreçleri.

### 📄 Belge Yönetim Sistemi
- **Güvenli Yükleme:** İstenen belgelerin (Kimlik, İmza Sirküleri vb.) sisteme güvenli bir şekilde yüklenmesi.
- **Talep Takibi:** Eksik belgelerin bildirilmesi ve takibi.

### 🛒 E-Ticaret ve Ödeme
- **Hizmet Satın Alma:** Danışmanlık ve ek hizmetler için sepet ve ödeme akışı.
- **Güvenli Ödeme:** 3D Secure ve kredi kartı ile ödeme altyapısı.

### 🔐 Üyelik ve Güvenlik
- **Gelişmiş Kimlik Doğrulama:** Kayıt, Giriş, Şifre Sıfırlama ve 2FA (İki Faktörlü Doğrulama).
- **Profil Yönetimi:** Kullanıcı bilgileri ve ayarların yönetimi.

## 🛠️ Teknolojiler

Bu proje aşağıdaki modern web teknolojileri ile geliştirilmiştir:

- **Frontend Framework:** [React 19](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/) & [Lucide React](https://lucide.dev/)
- **Testing:** Jest, React Testing Library, Playwright

## 📂 Proje Yapısı

```
src/
├── components/   # Yeniden kullanılabilir UI bileşenleri
├── pages/        # Uygulama sayfaları (Home, Login, Dashboard vb.)
├── router/       # Sayfa yönlendirme yapılandırması
├── text/         # Sabit metinler ve içerikler
├── hooks/        # Özel React hook'ları
├── context/      # Global state yönetimi (AuthContext vb.)
├── assets/       # Görseller ve statik dosyalar
└── services/     # API istekleri ve servis katmanı
```

## 💻 Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1. **Repoyu klonlayın:**
   ```bash
   git clone <repo-url>
   cd pri-frontend-inverizo
   ```

2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   ```

3. **Geliştirme sunucusunu başlatın:**
   ```bash
   npm run dev
   ```
   Uygulama genellikle `http://localhost:5173` adresinde çalışacaktır.

4. **Production build almak için:**
   ```bash
   npm run build
   ```

## 📝 Lisans

Bu proje özel bir yazılımdır ve tüm hakları saklıdır.

---
*Bu proje [Inverizo](https://inverizo.com) girişimi kapsamında geliştirilmiştir.*
