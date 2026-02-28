import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function ThreeDSVerify() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [htmlContent, setHtmlContent] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const encodedHtml = searchParams.get("html");
    
    if (!encodedHtml) {
      setError("3DS doğrulama içeriği bulunamadı.");
      setLoading(false);
      return;
    }

    try {
      let decoded = "";
      try {
        const urlDecoded = decodeURIComponent(encodedHtml);
        
        if (urlDecoded.trim().startsWith("<")) {
          decoded = urlDecoded;
        } else {
          try {
            decoded = atob(urlDecoded);
          } catch (base64Error) {
            decoded = urlDecoded;
          }
        }
      } catch (decodeError) {
        console.error("Decode hatası:", decodeError);
        decoded = decodeURIComponent(encodedHtml);
      }

      // HTML içeriğini set et
      setHtmlContent(decoded);
      setLoading(false);
      
      setTimeout(() => {
        const container = document.getElementById("three-ds-container");
        const form = container?.querySelector('form') || 
                     document.getElementById("iyzico-3ds-form") || 
                     document.querySelector('form[action*="iyzipay"]') ||
                     document.querySelector('form');
        
        if (form && form instanceof HTMLFormElement) {
          console.log("3DS form bulundu, submit ediliyor...", {
            form,
            action: form.action,
            method: form.method,
            inputs: form.querySelectorAll('input').length
          });
          
          const actionUrl = form.action;
          
          if (actionUrl && actionUrl.includes('iyzipay')) {
            const formData = new FormData(form);
            
            const tempForm = document.createElement('form');
            tempForm.method = form.method || 'POST';
            tempForm.action = actionUrl;
            tempForm.style.display = 'none';
            
            form.querySelectorAll('input').forEach(input => {
              const newInput = document.createElement('input');
              newInput.type = input.type;
              newInput.name = input.name;
              newInput.value = input.value;
              tempForm.appendChild(newInput);
            });
            
            document.body.appendChild(tempForm);
            tempForm.submit();
          } else {
            form.submit();
          }
        } else {
          console.warn("3DS form bulunamadı, HTML içeriği kontrol ediliyor...", {
            container: !!container,
            decodedLength: decoded.length,
            hasFormTag: decoded.includes('<form')
          });
          
          const formMatch = decoded.match(/<form[^>]*action=["']([^"']+)["'][^>]*>/i);
          if (formMatch && formMatch[1]) {
            const actionUrl = formMatch[1];
            console.log("Form action URL bulundu, yönlendiriliyor:", actionUrl);
            
            const inputMatches = decoded.matchAll(/<input[^>]*name=["']([^"']+)["'][^>]*value=["']([^"']*)["'][^>]*>/gi);
            const tempForm = document.createElement('form');
            tempForm.method = 'POST';
            tempForm.action = actionUrl;
            tempForm.style.display = 'none';
            
            for (const match of inputMatches) {
              if (match[1] && match[2]) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = match[1];
                input.value = match[2];
                tempForm.appendChild(input);
              }
            }
            
            document.body.appendChild(tempForm);
            tempForm.submit();
          }
        }
      }, 300);
    } catch (err) {
      console.error("3DS içerik decode hatası:", err);
      setError("3DS doğrulama içeriği yüklenemedi.");
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center">
          <svg
            className="w-12 h-12 animate-spin text-primary mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-gray-600">3D Secure doğrulama yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 flex items-center justify-center"
          >
            <svg
              className="w-10 h-10 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Hata</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/odeme")}
            className="px-6 py-3 rounded-xl bg-primary text-white hover:bg-primary-dark font-semibold transition-all"
          >
            Ödeme Sayfasına Dön
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">3D Secure Doğrulama</h1>
              <p className="text-blue-100 text-sm mt-1">
                Lütfen bankanızın gönderdiği OTP kodunu girin
              </p>
            </div>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "3D Secure doğrulamasını iptal etmek istediğinize emin misiniz?"
                  )
                ) {
                  navigate("/odeme");
                }
              }}
              className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 3DS Content */}
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="bg-white border rounded-xl shadow-lg overflow-hidden">
          <div 
            id="three-ds-container"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
            className="w-full min-h-[600px]"
          />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Bu sayfa bankanız tarafından sağlanmaktadır. Güvenli ödeme için
            bankanızın talimatlarını takip edin.
          </p>
        </div>
      </div>
    </div>
  );
}

