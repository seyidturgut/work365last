/** Prod domaini .env üzerinden override edilebilir (SITE_URL). Varsayılan: work365.co */
export const SITE_URL = (process.env.SITE_URL || "https://www.work365.co").replace(/\/$/, "");

export const SITE_NAME = "Work365";

export const SITE_DESCRIPTION =
  "Kurucular için hepsi bir arada iş platformu. Şirketini kur, dijital ofisini aç, muhasebeni ve vergilerini tek yerden yönet.";

export const SITE_LOCALE = "tr_TR";

/** Organization JSON-LD ve Open Graph görselleri için mutlak logo URL'i */
export const SITE_LOGO_PATH = "/LOGO-END.svg";
