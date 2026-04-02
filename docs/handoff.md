# Work365 Teknik Handoff

## 1. Proje Özeti

Bu repo, Work365 ürününün tek bir Next.js uygulaması içindeki ilk bütünleşik sürümüdür. Şu anda iki ana katmandan oluşur:

- pazarlama sitesi ve fiyatlandırma deneyimi
- demo auth, onboarding, ödeme ve panel deneyimi

Kod tabanı ürün doğrulama ve hızlı iterasyon amacıyla hazırlanmıştır. Bu nedenle bazı parçalar production-ready değildir; aşağıda açıkça işaretlenmiştir.

## 2. Teknoloji ve Çalışma Şekli

### Kullanılan teknoloji

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion

### Çalıştırma

```bash
npm install
npm run dev
```

Build doğrulama:

```bash
npm run build
```

Önerilen sürüm:

- Node.js 20 LTS
- npm 10+

### Ortam değişkenleri

Şu an zorunlu `.env` bağımlılığı yok. Uygulama varsayılan konfigürasyonla açılır.

## 3. Proje Yapısı

### Başlıca route grupları

Public sayfalar:

- `/`
- `/fiyatlandirma`
- `/sirketini-kur`
- `/sirketini-kur/[slug]`
- `/digital-ofis`
- `/gorunur-ol`
- `/gorunur-ol/sosyal-medya`
- `/gorunur-ol/web-sitesi`
- `/buyut`
- `/blog`
- `/iletisim`

Auth:

- `/kayit-ol`
- `/giris`
- `/login`
- `/register`

Panel:

- `/panel`
- `/panel/payment`
- `/panel/dashboard`
- `/panel/cikis`

API:

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `GET /api/panel/session`
- `POST /api/panel/onboarding`
- `POST /api/panel/payment`

### Başlıca klasörler

- `src/app`: route ve page katmanı
- `src/components`: pazarlama ve panel UI bileşenleri
- `src/lib`: pricing helper, panel session, panel store ve tipler
- `src/data`: demo JSON store

## 4. Kritik Ürün Akışları

### Fiyatlandırma → Kayıt

- Kullanıcı fiyat kartından paket seçer.
- Paket bilgisi query param ile `/kayit-ol` ekranına taşınır.
- Query içinde paket slug, fiyat, label, source, term ve bazı açıklama alanları bulunabilir.
- `/kayit-ol` ekranı seçilen paketi gösterir ve auth submit sırasında bu bilgiyi API’ye iletir.

### Kayıt / Giriş → Panel

- `POST /api/auth/signup` yeni kullanıcı oluşturur, session cookie set eder ve `/panel` yönlendirmesi döner.
- `POST /api/auth/login` mevcut kullanıcıyı doğrular veya Google demo kullanıcı akışı başlatır.
- Login sonrası yönlendirme kullanıcı durumuna göre yapılır:
  - onboarding tamamlanmadıysa `/panel`
  - onboarding tamamlandı ama ödeme yapılmadıysa `/panel/payment`
  - ödeme yapıldıysa `/panel/dashboard`

### Panel Onboarding

- Wizard tek soru odaklı ilerler.
- Her adım ayrı API çağrısıyla kaydedilir.
- Kullanıcı çıkarsa kaldığı adımdan devam eder.
- Mevcut step sırası:
  - package
  - fullName
  - phone
  - companyName
  - activityArea

### Panel Ödeme

- Ödeme akışı demo seviyesindedir.
- Kart ve fatura bilgileri step bazlı toplanır.
- Finalize edildiğinde ödeme başarılı kabul edilir.
- Başarı sonrası kullanıcı `/panel/dashboard` ekranına geçer.
- `eTugraStatus` alanı `triggered` olarak işaretlenir.

## 5. Veri Saklama ve Session Modeli

### Session

Cookie tabanlı iki alan kullanılır:

- `work365_panel_session`: kullanıcı ID
- `work365_panel_state`: base64url encode edilmiş session user özeti

Session helper dosyası:

- `src/lib/panel-session.ts`

Bu yapı demo seviyesindedir. Güçlü doğrulama, imzalama, refresh stratejisi veya merkezi session store bulunmaz.

### Kullanıcı verisi

Ana veri saklama katmanı:

- `src/lib/panel-store.ts`

Geliştirme ortamında veri dosyası:

- `src/data/panel-users.json`

Production / Vercel’de:

- `process.env.VERCEL` veya `NODE_ENV=production` olduğunda veri `/tmp/work365/panel-users.json` altına kopyalanır/yazılır

Bu önemli bir kısıttır:

- `/tmp` kalıcı değildir
- instance değişiminde veri kaybolabilir
- yatay ölçekleme ile tutarlılık garanti edilmez

Sonuç: panel veri katmanı production için veritabanına taşınmalıdır.

## 6. Deploy Notları

### Şu anki durum

Repo Vercel uyumlu bir Next.js uygulaması gibi çalışır. Ancak panel veri katmanı gerçek production persistence sağlamaz.

### Vercel özel notu

Daha önce `EROFS` hatası yaşandığı için kod `/tmp` fallback’ine alınmış. Bu, read-only bundle sorununun geçici çözümüdür; kalıcı çözüm değildir.

### Generic Node sunucu

Teorik olarak `npm run build` ve `npm run start` ile standart Node ortamında çalıştırılabilir. Yine de panel verisi dosya tabanlı olduğu için container restart, çoklu instance ve backup stratejisi ayrı tasarlanmalıdır.

## 7. Bilinen Durumlar ve Teknik Riskler

### Demo / placeholder alanlar

- Google giriş gerçek OAuth değildir; demo kullanıcı üretir
- ödeme ve 3D Secure gerçek ödeme sağlayıcı entegrasyonu değildir
- session güvenliği production seviyesi değildir
- kullanıcı şifreleri demo yaklaşımıyla JSON içinde tutulur; production için uygun değildir

### Operasyonel riskler

- dosya tabanlı store production persistence sağlamaz
- JSON store yaklaşımı eşzamanlı yazma yarışlarına açıktır
- veri modeli migration mantığı sınırlıdır
- test coverage ve otomasyon sınırlıdır; repo içinde kapsamlı test paketi bulunmamaktadır

### Route / redirect gözden geçirme ihtiyacı

`next.config.mjs` içinde eski yönlendirme kuralları var. Özellikle aşağıdakiler deploy öncesi yeniden değerlendirilmelidir:

- `/digital-altyapi` → `/dijitale-tasi`
- `/ekosistem` → `/`

Repo içinde bu route’lara ait sayfalar da bulunduğu için redirect önceliği ürün beklentisiyle çelişebilir.

## 8. Production Öncesi İlk Teknik İşler

Yazılım ekibine önerilen ilk hafta sırası:

1. Panel veri katmanını JSON store’dan gerçek veritabanına taşıyın.
2. Session/auth yapısını güvenli hale getirin.
3. Google login’i gerçek OAuth akışıyla değiştirin ya da demo olarak açıkça kaldırın.
4. Ödeme akışını gerçek provider ile yeniden kurun.
5. `next.config.mjs` redirect kurallarını ürün route yapısıyla hizalayın.
6. Temel test paketi ekleyin:
   - auth API smoke test
   - onboarding akışı
   - pricing → signup yönlendirmesi
   - panel ödeme yönlendirmesi

## 9. API Referansı

### `POST /api/auth/signup`

Beklenen temel alanlar:

- `fullName`
- `email`
- `phone`
- `password`
- `selectedPackage`

Davranış:

- kullanıcı oluşturur
- session cookie set eder
- `redirectTo: "/panel"` döner

### `POST /api/auth/login`

İki mod destekler:

- klasik e-posta/şifre login
- `provider: "google"` ile demo kullanıcı akışı

Davranış:

- kullanıcı state’ine göre panel route’u döner

### `GET /api/panel/session`

Mevcut session user’ı döner. Session yoksa `401`.

### `POST /api/panel/onboarding`

Temel alanlar:

- `stepId`
- `values`
- `nextStep`
- `markCompleted`

Davranış:

- ilgili onboarding step’ini kaydeder
- session state’i günceller

### `POST /api/panel/payment`

Kart ve fatura bilgilerini kaydeder. `finalize: true` olduğunda demo ödeme tamamlanır.

## 10. Teslim Notu

Bu repo, ürün ve UX yönü güçlü bir MVP / pilot teslimidir. Yazılım departmanının bunu production sistem olarak devralması için en kritik konu, panel tarafındaki demo veri ve auth/ödeme katmanlarını gerçek altyapıya taşımaktır.

Pazarlama sayfaları ve fiyatlandırma deneyimi ise mevcut haliyle daha yakın production olgunluğundadır; teknik borç daha çok panel ve runtime persistence katmanında toplanmıştır.
