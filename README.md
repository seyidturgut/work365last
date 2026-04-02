# Work365

Work365, şirket kuruluşu, dijital ofis, görünürlük paketleri ve onboarding panel akışlarını aynı Next.js uygulaması içinde toplayan bir ürün sitesidir.

Bu repo şu anda hem pazarlama sitesi hem de demo seviyesinde auth/panel akışını içerir. Yazılım departmanına teknik teslim için detaylı döküman: [docs/handoff.md](/Users/seyidturgut/Works/My%20Work/work365/Weblast-v2/docs/handoff.md)

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion
- `node:fs/promises` tabanlı demo JSON store

## Hızlı Başlangıç

Önerilen ortam:

- Node.js 20 LTS
- npm 10+

Kurulum:

```bash
npm install
npm run dev
```

Uygulama varsayılan olarak [http://localhost:3000](http://localhost:3000) adresinde çalışır.

Production build kontrolü:

```bash
npm run build
npm run start
```

## NPM Scriptleri

- `npm run dev`: geliştirme sunucusu
- `npm run build`: production build
- `npm run start`: production server
- `npm run lint`: ESLint

## Mevcut Özellikler

- Pazarlama sayfaları: ana sayfa, fiyatlandırma, şirketini kur, dijital ofis, görünür ol, blog
- Paket seçiminden `/kayit-ol` ekranına query tabanlı paket taşıma
- Demo auth akışı:
  - e-posta/şifre ile kayıt
  - e-posta/şifre ile giriş
  - Google demo giriş placeholder akışı
- Demo panel:
  - onboarding wizard
  - ödeme wizard
  - dashboard

## Veri Saklama

Panel tarafı şu anda veritabanı yerine JSON dosyası kullanır.

- Geliştirme ortamında veri dosyası: `src/data/panel-users.json`
- Production/Vercel ortamında veri dosyası: `/tmp/work365/panel-users.json`

Bu yaklaşım demo amaçlıdır. Kalıcı production veri katmanı olarak değerlendirilmemelidir.

## Environment Variables

Bu repo şu anda çalışmak için zorunlu bir `.env` değişkeni gerektirmez.

Buna rağmen production ortamına geçmeden önce aşağıdakiler tasarlanmalıdır:

- gerçek auth secret ve session stratejisi
- veritabanı bağlantı bilgileri
- gerçek ödeme sağlayıcı ayarları
- gerçek OAuth sağlayıcı ayarları

## Önemli Notlar

- Panel auth ve ödeme akışı demo seviyesindedir.
- Vercel üzerinde dosya sistemi kalıcı değildir; `/tmp` yalnızca geçici runtime storage sağlar.
- Route/redirect katmanında geçmiş yönlendirmeler bulunduğu için deploy öncesi gözden geçirme gerekir.

## Teknik Teslim

Yazılım departmanına devir için aşağıdaki belge esas alınmalıdır:

- [docs/handoff.md](/Users/seyidturgut/Works/My%20Work/work365/Weblast-v2/docs/handoff.md)
