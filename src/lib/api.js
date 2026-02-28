
import { v4 as uuidv4 } from 'uuid';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://piri-api.inverizo.com";

export const LOCATION_API_BASE_URL = API_BASE_URL;
export const API_PREFIX = "/api";

function buildUrl(path) {
  const base = API_BASE_URL.replace(/\/$/, "");
  const hasApiPrefix = path.startsWith("/api/") || path === "/api";
  const p = path.startsWith("/") ? path : `/${path}`;
  const fullPath = hasApiPrefix ? p : `${API_PREFIX}${p}`;
  return `${base}${fullPath}`;
}

function buildLocationUrl(path) {
  const base = LOCATION_API_BASE_URL.replace(/\/$/, "");
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

export async function apiFetch(path, { method = "GET", headers = {}, body, token } = {}) {
  const isJsonBody = body && !(body instanceof FormData);
  const finalHeaders = { Accept: "application/json", ...headers };
  if (isJsonBody) {
    finalHeaders["Content-Type"] = "application/json";
  }
  if (token) {
    finalHeaders["Authorization"] = `Bearer ${token}`;
  }

  const bypassToken = localStorage.getItem('maintenance_bypass_token');
  if (bypassToken) {
    finalHeaders['X-Maintenance-Bypass'] = bypassToken;
  }

  const mutatingMethods = ["POST", "PUT", "PATCH", "DELETE"];
  if (mutatingMethods.includes(method.toUpperCase()) && !finalHeaders["Idempotency-Key"]) {
    finalHeaders["Idempotency-Key"] = uuidv4();
  }

  const isAbsolute = typeof path === 'string' && /^(https?:)?\/\//i.test(path);
  const url = isAbsolute ? path : buildUrl(path);

  // MOCK MODE: Bypass real API calls for local development
  const MOCK_MODE = true;
  if (MOCK_MODE) {
    console.warn(`[MOCK_MODE] Bypassing real API call to: ${url}`);

    // Return safe defaults based on common patterns
    if (path.includes('list') || path.includes('index') || path.includes('badges')) {
      return { data: [], meta: { current_page: 1, last_page: 1 } };
    }
    if (path.includes('me') || path.includes('details')) {
      return { success: true, user: { name: 'Local Developer', email: 'dev@local' } };
    }
    return { success: true, message: "Mock response" };
  }

  try {
    const response = await fetch(url, {
      method,
      headers: finalHeaders,
      body: isJsonBody ? JSON.stringify(body) : body,
      credentials: "omit",
      mode: "cors",
    });

    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const data = isJson ? await response.json().catch(() => null) : await response.text();

    if (!response.ok) {
      if (response.status === 503) {
        if (url.includes('/maintenance')) {
          throw new Error('Service Unavailable');
        }

        if (typeof window !== 'undefined' && window.location.pathname === '/maintenance') {
          return new Promise(() => { });
        }

        window.location.href = '/maintenance';
        return new Promise(() => { });
      }

      const message = (data && (data.message || data.error)) || `HTTP ${response.status}`;
      const error = new Error(message);
      error.status = response.status;
      error.data = data;
      error.response = { data: data, status: response.status };
      throw error;
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError && (
      error.message.includes('fetch') ||
      error.message.includes('Failed to fetch') ||
      error.message.includes('NetworkError') ||
      error.message.includes('network') ||
      error.message.includes('Load failed')
    )) {
      const networkError = new Error('İnternet bağlantınızı kontrol edin veya API sunucusunun çalıştığından emin olun.');
      networkError.status = 0;
      networkError.isNetworkError = true;
      networkError.originalError = error;
      throw networkError;
    }
    throw error;
  }
}

export const customerApi = {
  register: (payload) => apiFetch("/customer/register", { method: "POST", body: payload }),
  login: (payload) => apiFetch("/customer/login", { method: "POST", body: payload }),
  me: (token) => apiFetch("/customer/me", { method: "GET", token }),
  logout: (token) => apiFetch("/customer/logout", { method: "POST", token }),
  googleRedirect: () => apiFetch("/customer/google/redirect", { method: "GET" }),
  linkedinRedirect: () => apiFetch("/customer/linkedin/redirect", { method: "GET" }),
  adminLogin: (token) => apiFetch("/admin-login", { method: "POST", body: { token } }),
  forgotPassword: (payload) => apiFetch("/customer/forgot-password", { method: "POST", body: payload }),
  resetPassword: (payload) => apiFetch("/customer/reset-password", { method: "POST", body: payload }),
  details: (token) => apiFetch("/customer/details", { method: "GET", token }),
  updateDetails: (token, payload) => apiFetch("/customer/details", { method: "PUT", token, body: payload }),
  activities: (token) => apiFetch("/customer/activities", { method: "GET", token }),
  updatePassword: (token, payload) => apiFetch("/customer/password", { method: "PUT", token, body: payload }),
  // invoices
  invoices: (token, page = 1, perPage = 10) => {
    const params = new URLSearchParams({ page: page.toString(), per_page: perPage.toString() });
    return apiFetch(`/customer/invoices?${params.toString()}`, { method: "GET", token });
  },
  invoice: (token, id) => apiFetch(`/customer/invoices/${id}`, { method: "GET", token }),
  invoiceDownload: (token, id) => {
    const url = buildUrl(`/customer/invoices/${id}/download`);
    return url;
  },
  invoiceSendEmail: (token, id) => apiFetch(`/customer/invoices/${id}/send-email`, { method: "POST", token }),
  // addresses
  addresses: (token) => apiFetch("/customer/addresses", { method: "GET", token }),
  createAddress: (token, payload) => apiFetch("/customer/addresses", { method: "POST", token, body: payload }),
  updateAddress: (token, id, payload) => apiFetch(`/customer/addresses/${id}`, { method: "PUT", token, body: payload }),
  deleteAddress: (token, id) => apiFetch(`/customer/addresses/${id}`, { method: "DELETE", token }),
  setDefaultAddress: (token, id) => apiFetch(`/customer/addresses/${id}/set-default`, { method: "POST", token }),
  setBillingAddress: (token, id) => apiFetch(`/customer/addresses/${id}/set-billing`, { method: "POST", token }),
  // badges
  publicBadges: () => apiFetch("/badges", { method: "GET" }),
  myBadges: (token) => apiFetch("/customer/badges", { method: "GET", token }),
  // avatar
  uploadAvatar: (token, file) => {
    const form = new FormData();
    form.append('avatar', file);
    return apiFetch("/customer/avatar", { method: "POST", token, body: form });
  },
  externalLogin: (token) => apiFetch("/customer/external-login", { method: "POST", token }),
  getExternalLoginStatus: (token) => apiFetch("/customer/external-login/status", { method: "GET", token }),
  // onboarding
  getOnboardingStatus: (token) => apiFetch("/customer/onboarding-status", { method: "GET", token }),
  completeOnboarding: (token, payload) => apiFetch("/customer/complete-onboarding", { method: "POST", token, body: payload }),
  resetOnboarding: (token) => apiFetch("/customer/reset-onboarding", { method: "POST", token }),
  acceptConfidentialityAgreement: (token, payload = {}) =>
    apiFetch("/customer/confidentiality-agreements", { method: "POST", token, body: { source: "checkout", ...payload } }),
  acceptDistanceSalesAgreement: (token, payload = {}) =>
    apiFetch("/customer/distance-sales-agreements", { method: "POST", token, body: { source: "checkout", ...payload } }),
};

export const newsletterApi = {
  subscribe: (payload) => apiFetch("/newsletter/subscribe", { method: "POST", body: payload }),
  unsubscribe: (payload) => apiFetch("/newsletter/unsubscribe", { method: "POST", body: payload }),
  status: (email) => apiFetch(`/newsletter/status?email=${encodeURIComponent(email)}`, { method: "GET" }),
};

export const applicationTrackingApi = {
  sendToken: (email) => apiFetch("/application-tracking/send-token", { method: "POST", body: { email } }),
  verify: (email, token) => apiFetch("/application-tracking/verify", { method: "POST", body: { email, token } }),
  getDetail: (email, token, type, id) => apiFetch("/application-tracking/detail", { method: "POST", body: { email, token, type, id } }),
};

export const productsApi = {
  list: () => apiFetch("/products", { method: "GET" }),
  get: (key) => apiFetch(`/products/${key}`, { method: "GET" }),
};

export const cartApi = {
  list: (token) => apiFetch("/customer/cart", { method: "GET", token }),
  add: (token, payload) => apiFetch("/customer/cart", { method: "POST", token, body: payload }),
  update: (token, cartItemId, payload) => apiFetch(`/customer/cart/${cartItemId}`, { method: "PUT", token, body: payload }),
  remove: (token, cartItemId) => apiFetch(`/customer/cart/${cartItemId}`, { method: "DELETE", token }),
  clear: (token) => apiFetch("/customer/cart", { method: "DELETE", token }),
  applyDiscount: (token, code) => apiFetch("/customer/cart/apply-discount", { method: "POST", token, body: { code } }),
  removeDiscount: (token) => apiFetch("/customer/cart/discount", { method: "DELETE", token }),
};

export const companyRegistrationApi = {
  list: (token) => apiFetch("/customer/company-registrations", { method: "GET", token }),
  create: (token, payload) => apiFetch("/customer/company-registrations", { method: "POST", token, body: payload }),
  get: (token, id) => apiFetch(`/customer/company-registrations/${id}`, { method: "GET", token }),
  update: (token, id, payload) => apiFetch(`/customer/company-registrations/${id}`, { method: "PUT", token, body: payload }),
  uploadDocuments: (token, id, formData) => apiFetch(`/customer/company-registrations/${id}/documents`, { method: "POST", token, body: formData }),
  submit: (token, id) => apiFetch(`/customer/company-registrations/${id}/submit`, { method: "POST", token }),
  pendingWithoutOrders: (token) => apiFetch("/customer/company-registrations/pending-without-orders", { method: "GET", token }),
  addToCart: (token, id) => apiFetch(`/customer/company-registrations/${id}/add-to-cart`, { method: "POST", token }),
  delete: (token, id) => apiFetch(`/customer/company-registrations/${id}`, { method: "DELETE", token }),
  checkAccess: (token, { companyType, tier, period }) => {
    const params = new URLSearchParams({ companyType, tier, period });
    return apiFetch(`/customer/company-registrations/check-access?${params.toString()}`, { method: "GET", token });
  },
};

export const servicesApi = {
  list: () => apiFetch("/services", { method: "GET" }),
};

export const serviceRequestApi = {
  list: (token) => apiFetch("/customer/service-requests", { method: "GET", token }),
  create: (token, payload) => apiFetch("/customer/service-requests", { method: "POST", token, body: payload }),
  get: (token, id) => apiFetch(`/customer/service-requests/${id}`, { method: "GET", token }),
  update: (token, id, payload) => apiFetch(`/customer/service-requests/${id}`, { method: "PUT", token, body: payload }),
  uploadDocuments: (token, id, formData) => apiFetch(`/customer/service-requests/${id}/documents`, { method: "POST", token, body: formData }),
  submit: (token, id) => apiFetch(`/customer/service-requests/${id}/submit`, { method: "POST", token }),
  getDocuments: (token, id) => apiFetch(`/customer/service-requests/${id}/documents`, { method: "GET", token }),
  updateDocument: (token, serviceRequestId, documentId, formData) => apiFetch(`/customer/service-requests/${serviceRequestId}/documents/${documentId}`, { method: "POST", token, body: formData }),
  deleteDocument: (token, serviceRequestId, documentId) => apiFetch(`/customer/service-requests/${serviceRequestId}/documents/${documentId}`, { method: "DELETE", token }),
  pendingWithoutOrders: (token) => apiFetch("/customer/service-requests/pending-without-orders", { method: "GET", token }),
  addToCart: (token, id) => apiFetch(`/customer/service-requests/${id}/add-to-cart`, { method: "POST", token }),
  delete: (token, id) => apiFetch(`/customer/service-requests/${id}`, { method: "DELETE", token }),
  prefill: (token, serviceKey) =>
    apiFetch(`/customer/service-requests/prefill?service_key=${encodeURIComponent(serviceKey)}`, {
      method: "GET",
      token,
    }),
};

// Two-factor authentication (TOTP)
export const twoFactorApi = {
  setup: (token) => apiFetch("/customer/2fa/setup", { method: "POST", token }),
  enable: (token, code) => apiFetch("/customer/2fa/enable", { method: "POST", token, body: { code } }),
  disable: (token, code) => apiFetch("/customer/2fa/disable", { method: "POST", token, body: { code } }),
  verify: (token, code) => apiFetch("/customer/2fa/verify", { method: "POST", token, body: { code } }),
};

export const locationApi = {
  cities: async () => apiFetch(buildLocationUrl("/api/locations/cities"), { method: "GET" }),
  districts: async (cityId) => apiFetch(buildLocationUrl(`/api/locations/cities/${cityId}/districts`), { method: "GET" }),
};

export const ordersApi = {
  list: (token, page = 1, perPage = 5) => {
    const params = new URLSearchParams({ page: page.toString(), per_page: perPage.toString() });
    return apiFetch(`/customer/orders?${params.toString()}`, { method: "GET", token });
  },
  get: (token, orderId) => apiFetch(`/customer/orders/${orderId}`, { method: "GET", token }),
};

export const additionalDocumentsApi = {
  list: (token, companyRegistrationId) => apiFetch(`/customer/company-registrations/${companyRegistrationId}/additional-documents`, { method: "GET", token }),
  upload: (token, companyRegistrationId, formData) => apiFetch(`/customer/company-registrations/${companyRegistrationId}/additional-documents`, { method: "POST", token, body: formData }),
  delete: (token, companyRegistrationId, documentId) => apiFetch(`/customer/company-registrations/${companyRegistrationId}/additional-documents/${documentId}`, { method: "DELETE", token }),
};

export const paymentsApi = {
  binCheck: (token, binNumber, price) => apiFetch("/customer/payments/bin-check", { method: "POST", token, body: { bin_number: binNumber, price: price.toString() } }),
  initialize3DS: (token, payload) =>
    apiFetch("/customer/payments/3ds-initialize", {
      method: "POST",
      token,
      body: payload,
    }),
};

export const cookieConsentApi = {
  check: (token, sessionId) => {
    const headers = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    if (sessionId) {
      headers["X-Session-ID"] = sessionId;
    }
    return apiFetch("/cookie-consent/check", { method: "GET", headers });
  },
  save: (token, sessionId, consentData, accepted) => {
    const headers = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    if (sessionId) {
      headers["X-Session-ID"] = sessionId;
    }
    return apiFetch("/cookie-consent", {
      method: "POST",
      headers,
      body: { consent_data: consentData, accepted },
    });
  },
  revoke: (token, sessionId) => {
    const headers = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    if (sessionId) {
      headers["X-Session-ID"] = sessionId;
    }
    return apiFetch("/cookie-consent/revoke", { method: "POST", headers });
  },
};

export const captchaApi = {
  generate: () => apiFetch("/captcha/generate", { method: "GET" }),
  verify: (payload) => apiFetch("/captcha/verify", { method: "POST", body: payload }),
};

export const contactApi = {
  send: (payload) => apiFetch("/contact", { method: "POST", body: payload }),
};

export const notificationApi = {
  list: (token, page = 1, perPage = 8) => {
    const params = new URLSearchParams({ page: page.toString(), per_page: perPage.toString() });
    return apiFetch(`/customer/notifications?${params.toString()}`, { method: "GET", token });
  },
  count: (token) => apiFetch("/customer/notifications/count", { method: "GET", token }),
  read: (token, payload) =>
    apiFetch("/customer/notifications/read", { method: "POST", token, body: payload }),
};

export const documentRequestApi = {
  list: (token, page = 1, perPage = 8) => {
    const params = new URLSearchParams({ page: page.toString(), per_page: perPage.toString() });
    return apiFetch(`/customer/document-requests?${params.toString()}`, { method: "GET", token });
  },
  get: (token, id) => apiFetch(`/customer/document-requests/${id}`, { method: "GET", token }),
  upload: (token, id, formData) => apiFetch(`/customer/document-requests/${id}/upload`, { method: "POST", token, body: formData }),
  deleteFile: (token, id, fileId) => apiFetch(`/customer/document-requests/${id}/files/${fileId}`, { method: "DELETE", token }),
};

export const blogApi = {
  list: (page = 1, perPage = 10, search = "", authorId = null) => {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString()
    });
    if (search) params.append("search", search);
    if (authorId) params.append("author_id", authorId.toString());
    return apiFetch(`/blog?${params.toString()}`, { method: "GET" });
  },
  get: (slug) => apiFetch(`/blog/${slug}`, { method: "GET" }),
};

export const faqApi = {
  list: () => apiFetch("/faq", { method: "GET" }),
};

export const maintenanceApi = {
  status: () => apiFetch("/maintenance", { method: "GET" }),
};

export const libraryApi = {
  list: (params = {}) => {
    const searchParams = new URLSearchParams();
    if (params.category) searchParams.set("category", params.category);
    if (params.search) searchParams.set("search", params.search);
    if (params.page) searchParams.set("page", params.page);
    if (params.per_page) searchParams.set("per_page", params.per_page);
    const query = searchParams.toString();
    const path = query ? `/api/library?${query}` : "/api/library";
    return apiFetch(path, { method: "GET" });
  },
  view: (resourceId) => apiFetch(`/library/${resourceId}/view`, { method: "GET" }),
  download: async (resourceId) => {
    const url = buildUrl(`/library/${resourceId}/download`);
    const response = await fetch(url, {
      method: "GET",
      credentials: "omit",
      mode: "cors",
    });
    if (!response.ok) {
      const message = response.status === 404 ? "Dosya bulunamadı." : "Dosya indirilemedi.";
      const error = new Error(message);
      error.status = response.status;
      throw error;
    }
    const blob = await response.blob();
    const disposition = response.headers.get("content-disposition") || "";
    const match = disposition.match(/filename="?([^"]+)"?/);
    const filename = match ? decodeURIComponent(match[1]) : `kaynak-${resourceId}`;
    return { blob, filename };
  },
};

export const calculatorsApi = {
  vat: (payload) => apiFetch("/calculators/vat", { method: "POST", body: payload }),
  incomeTax: (payload) => apiFetch("/calculators/income-tax", { method: "POST", body: payload }),
  rentWithholding: (payload) => apiFetch("/calculators/rent-withholding", { method: "POST", body: payload }),
  corporateTax: (payload) => apiFetch("/calculators/corporate-tax", { method: "POST", body: payload }),
  temporaryTax: (payload) => apiFetch("/calculators/temporary-tax", { method: "POST", body: payload }),
  stampTax: (payload) => apiFetch("/calculators/stamp-tax", { method: "POST", body: payload }),
  customsTax: (payload) => apiFetch("/calculators/customs-tax", { method: "POST", body: payload }),
  lateTax: (payload) => apiFetch("/calculators/late-tax", { method: "POST", body: payload }),
};

/**
 * Campaign API endpoints
 * Supports both authenticated users (with token) and guest users (with session ID)
 */
export const campaignApi = {
  /**
   * Get active campaigns
   * @param {string|null} token - Optional auth token
   * @param {string} sessionId - Session ID for guest tracking
   */
  active: (token, sessionId) => {
    const headers = {
      'X-Session-ID': sessionId,
    };
    return apiFetch("/campaigns/active", { method: "GET", token, headers });
  },

  /**
   * Log campaign view
   * @param {number} campaignId - Campaign ID
   * @param {string|null} token - Optional auth token
   * @param {string} sessionId - Session ID for guest tracking
   */
  logView: (campaignId, token, sessionId) => {
    const headers = {
      'X-Session-ID': sessionId,
    };
    return apiFetch(`/campaigns/${campaignId}/view`, { method: "POST", token, headers });
  },

  /**
   * Dismiss campaign permanently
   * @param {number} campaignId - Campaign ID
   * @param {string|null} token - Optional auth token
   * @param {string} sessionId - Session ID for guest tracking
   */
  dismiss: (campaignId, token, sessionId) => {
    const headers = {
      'X-Session-ID': sessionId,
    };
    return apiFetch(`/campaigns/${campaignId}/dismiss`, { method: "POST", token, headers });
  },
};



export const botApi = {
  sendMessage: (token, payload) => apiFetch(`${API_PREFIX}/bot/message`, { method: "POST", body: payload, token }),
};

export const calculatorApi = {
  calculateVat: (payload) => apiFetch(`${API_PREFIX}/vat`, { method: "POST", body: payload }),
  calculateIncomeTax: (payload) => apiFetch(`${API_PREFIX}/income-tax`, { method: "POST", body: payload }),
  calculateRentWithholding: (payload) => apiFetch(`${API_PREFIX}/rent-withholding`, { method: "POST", body: payload }),
  calculateCorporateTax: (payload) => apiFetch(`${API_PREFIX}/corporate-tax`, { method: "POST", body: payload }),
  calculateRentWithholding: (payload) => apiFetch(`${API_PREFIX}/rent-withholding`, { method: "POST", body: payload }),
  calculateCorporateTax: (payload) => apiFetch(`${API_PREFIX}/corporate-tax`, { method: "POST", body: payload }),
  calculateLateTax: (payload) => apiFetch(`${API_PREFIX}/late-tax`, { method: "POST", body: payload }),
};

export const accountantTasksApi = {
  list: (token, page = 1) => apiFetch(`/customer/accountant-tasks?page=${page}`, { method: "GET", token }),
  get: (token, id) => apiFetch(`/customer/accountant-tasks/${id}`, { method: "GET", token }),
  reply: (token, id, formData) => apiFetch(`/customer/accountant-tasks/${id}/reply`, { method: "POST", token, body: formData }),
};

export const declarationsApi = {
  list: (token, page = 1) => apiFetch(`/customer/declarations?page=${page}`, { method: "GET", token }),
  markAsRead: (token, id) => apiFetch(`/customer/declarations/${id}/read`, { method: "POST", token }),
};



