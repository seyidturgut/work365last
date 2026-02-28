import React from "react";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";

export default function StepCard({
  error,
  addresses,
  loadingAddresses,
  openAddressModal,
  handleCardNumberChange,
  cardState,
  setCardState,
  installments,
  selectedInstallment,
  setSelectedInstallment,
  loadingBinCheck,
  processingPayment,
  handlePayment,
  canContinue,
  setStep,
  privacyAgreementAccepted,
  setPrivacyAgreementAccepted,
}) {
  return (
    <motion.div key="step2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border rounded-2xl shadow-md p-6">
      <h3 className="text-lg font-bold mb-6 text-gray-900">Kart Bilgileri</h3>
      
      {addresses.length === 0 && !loadingAddresses ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 p-8 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl text-center"
        >
          <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-2">Adres Bilgisi Gerekli</h4>
          <p className="text-gray-700 mb-6 max-w-md mx-auto">
            Ödeme işlemini tamamlamak için önce bir adres oluşturmanız gerekiyor. Adres oluşturduktan sonra kart bilgilerinizi girebileceksiniz.
          </p>
          <button
            onClick={() => openAddressModal()}
            className="px-8 py-4 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Adres Oluştur
          </button>
        </motion.div>
      ) : (
        <>
      <div className="mb-8 relative">
        {(() => {
          const getCardType = () => {
            if (!cardState.number) return 'default';
            if (cardState.number.startsWith('4')) return 'visa';
            if (cardState.number.startsWith('5')) return 'mastercard';
            if (cardState.number.startsWith('3')) return 'amex';
            return 'default';
          };
          
          const cardType = getCardType();
          
          const cardStyles = {
            visa: {
              gradient: 'linear-gradient(135deg, #1a1f71 0%, #1434a4 50%, #1e3a8a 100%)',
              overlay: 'from-blue-900/90 via-blue-800/90 to-indigo-900/90',
              pattern: 'from-blue-400/10 via-indigo-400/10 to-blue-500/10',
            },
            mastercard: {
              gradient: 'linear-gradient(135deg, #eb001b 0%, #f79e1b 50%, #ff5f00 100%)',
              overlay: 'from-red-600/90 via-orange-600/90 to-red-700/90',
              pattern: 'from-red-400/10 via-orange-400/10 to-red-500/10',
            },
            amex: {
              gradient: 'linear-gradient(135deg, #006fcf 0%, #009cde 50%, #00a8e8 100%)',
              overlay: 'from-blue-600/90 via-cyan-600/90 to-blue-700/90',
              pattern: 'from-blue-400/10 via-cyan-400/10 to-blue-500/10',
            },
            default: {
              gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              overlay: 'from-blue-600/90 via-purple-600/90 to-indigo-700/90',
              pattern: 'from-blue-400/10 via-purple-400/10 to-indigo-400/10',
            },
          };
          
          const style = cardStyles[cardType];
          
          return (
            <motion.div
              key={cardType}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="relative h-48 rounded-2xl overflow-hidden shadow-xl"
              style={{
                background: style.gradient,
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${style.overlay}`}></div>
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
              ></div>
          
          <div className="relative h-full p-6 flex flex-col justify-between text-white">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium opacity-90">Kart Numarası</div>
              <div className="flex items-center gap-2">
                {cardState.number.length >= 1 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-10 h-6 bg-white/20 rounded flex items-center justify-center backdrop-blur-sm"
                  >
                    {cardState.number.startsWith('4') ? (
                      <span className="text-xs font-bold">VISA</span>
                    ) : cardState.number.startsWith('5') ? (
                      <span className="text-xs font-bold">MC</span>
                    ) : cardState.number.startsWith('3') ? (
                      <span className="text-xs font-bold">AMEX</span>
                    ) : null}
                  </motion.div>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="text-2xl font-mono tracking-wider font-semibold mb-1">
                  {cardState.number ? (
                    cardState.number.replace(/(\d{4})(?=\d)/g, '$1 ').trim().padEnd(19, '•')
                  ) : (
                    '•••• •••• •••• ••••'
                  )}
                </div>
              </div>
              
              <div className="flex items-end justify-between">
                <div className="flex-1">
                  <div className="text-xs opacity-75 mb-1">Kart Sahibi</div>
                  <div className="text-sm font-semibold uppercase">
                    {cardState.name || 'AD SOYAD'}
                  </div>
                </div>
                <div className="flex items-end gap-4">
                  <div>
                    <div className="text-xs opacity-75 mb-1">Son Kullanma</div>
                    <div className="text-sm font-semibold">
                      {cardState.month && cardState.year 
                        ? `${cardState.month.padStart(2, '0')}/${cardState.year}`
                        : 'AA/YY'
                      }
                    </div>
                  </div>
                  {cardType !== 'default' && (
                    <div className="mb-0">
                      {cardType === 'visa' && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="w-14 h-9 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30"
                        >
                          <svg className="w-10 h-6" viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M42.3 10.2h-6.1l-3.8 11.6h6.1l3.8-11.6z" fill="white"/>
                            <path d="M55.1 10.2l-4.7 11.6h-5.6l4.7-11.6h5.6zm-9.2 7.4c.1-2.7 2.3-4.2 4-5.1-1.8-1.5-2.9-2.5-2.9-3.9 0-2.1 2-3.1 3.8-3.1.2 0 .4 0 .5.1l.9-5.2c-.1 0-.3-.1-.9-.1-2.5 0-4.2 1.3-5.3 3.2l-3.7 11.1h5.7l.8-2.1h.1zm20.1-7.4l-3.5 9.1-.4 1.1h-5.1l6.1-11.6h5.1l-1.2 1.4zm12.1 0l-4.1 11.6h-5.1l4.1-11.6h5.1zm15.1 0c-1.1 0-1.9.6-2.4 1.4l-8.4 10.2h5.7l1.1-3.1h7l.6 3.1h5l-4.5-11.6h-4.2zm-3.1 7.1l2.9-7.9.8 7.9h-3.7z" fill="white"/>
                            <path d="M30.1 10.2c-1.1 0-1.9.6-2.4 1.4l-8.4 10.2h5.7l1.1-3.1h7l.6 3.1h5l-4.5-11.6h-4.1zm-3.1 7.1l2.9-7.9.8 7.9h-3.7z" fill="white"/>
                          </svg>
                        </motion.div>
                      )}
                      {cardType === 'mastercard' && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="w-14 h-9 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30"
                        >
                          <svg className="w-10 h-6" viewBox="0 0 100 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="20" cy="16" r="10" fill="#EB001B"/>
                            <circle cx="30" cy="16" r="10" fill="#F79E1B"/>
                            <path d="M25 11.5c-2.5 2.5-2.5 6.5 0 9 2.5-2.5 2.5-6.5 0-9z" fill="#FF5F00"/>
                          </svg>
                        </motion.div>
                      )}
                      {cardType === 'amex' && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          className="w-14 h-9 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30"
                        >
                          <span className="text-white text-xs font-bold">AMEX</span>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
          );
        })()}
      </div>

      <div className="space-y-5">
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Kart Numarası <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm text-lg font-mono tracking-wider"
              placeholder="1234 5678 9012 3456"
              type="tel"
              inputMode="numeric"
              maxLength={19}
              value={cardState.number.replace(/(\d{4})(?=\d)/g, '$1 ').trim()}
              onChange={e=>{
                const raw = e.target.value;
                let val = raw.replace(/\D/g, '');
                val = val.slice(0, 16);
                handleCardNumberChange(val);
              }}
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {cardState.number.length >= 1 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1"
                >
                  {cardState.number.startsWith('4') && (
                    <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs font-bold flex items-center justify-center">V</div>
                  )}
                  {cardState.number.startsWith('5') && (
                    <div className="w-8 h-5 bg-red-500 rounded text-white text-xs font-bold flex items-center justify-center">MC</div>
                  )}
                  {cardState.number.startsWith('3') && (
                    <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs font-bold flex items-center justify-center">AX</div>
                  )}
                </motion.div>
              )}
            </div>
          </div>
        </div>

        <div className="relative">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Kart Üzerindeki İsim <span className="text-red-500">*</span>
          </label>
          <input
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm uppercase"
            placeholder="AD SOYAD"
            type="text"
            value={cardState.name}
            onChange={e=>setCardState(prev => ({ ...prev, name: e.target.value.toUpperCase() }))}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Son Kullanma Tarihi <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative">
                <input
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm text-center font-semibold"
                  placeholder="AA"
                  type="tel"
                  inputMode="numeric"
                  maxLength={2}
                  value={cardState.month}
                  onChange={e=>{
                    let val = e.target.value.replace(/\D/g, '');
                    val = val.slice(0, 2);
                    if (val.length === 2 && parseInt(val) > 12) val = '12';
                    setCardState(prev => ({ ...prev, month: val }));
                  }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">Ay</span>
              </div>
              <div className="relative">
                <input
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm text-center font-semibold"
                  placeholder="YY"
                  type="tel"
                  inputMode="numeric"
                  maxLength={2}
                  value={cardState.year}
                  onChange={e=>{
                    let val = e.target.value.replace(/\D/g, '');
                    val = val.slice(0, 2);
                    setCardState(prev => ({ ...prev, year: val }));
                  }}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">Yıl</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              CVV <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3.5 bg-white focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all shadow-sm text-center font-semibold font-mono"
                placeholder="123"
                type="tel"
                inputMode="numeric"
                maxLength={3}
                value={cardState.cvv}
                onChange={e=>{
                  let val = e.target.value.replace(/\D/g, '');
                  val = val.slice(0, 3);
                  setCardState(prev => ({ ...prev, cvv: val }));
                }}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {loadingBinCheck && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700 flex items-center gap-3">
            <svg className="w-5 h-5 animate-spin flex-shrink-0" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Taksit seçenekleri yükleniyor...</span>
          </div>
        )}
        {!loadingBinCheck && installments.length > 0 && (
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Taksit Seçenekleri</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {installments.map((inst) => {
                const isSelected = selectedInstallment === inst.installment_number;
                const monthly = Number(inst.installment_price || inst.total_price || 0);
                const totalPrice = Number(inst.total_price || monthly || 0);
                const isSingle = inst.installment_number === 1;
                return (
                  <button
                    key={inst.installment_number}
                    type="button"
                    onClick={() => setSelectedInstallment(inst.installment_number)}
                    className={`group relative w-full text-left rounded-2xl border-2 p-4 transition-all duration-200 ${
                      isSelected
                        ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10'
                        : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-semibold text-gray-800">
                        {isSingle ? 'Peşin' : `${inst.installment_number} Taksit`}
                      </div>
                      <span
                        className={`text-[11px] font-bold px-2 py-1 rounded-full ${
                          isSelected
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {isSingle ? 'Tek Çekim' : 'Taksit'}
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-700">
                      {isSingle ? (
                        <div className="text-lg font-bold text-primary">
                          {totalPrice.toLocaleString('tr-TR')} ₺
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-between">
                            <span>Aylık</span>
                            <span className="font-semibold">
                              {monthly.toLocaleString('tr-TR')} ₺
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>Toplam</span>
                            <span className="font-semibold text-gray-700">
                              {totalPrice.toLocaleString('tr-TR')} ₺
                            </span>
                          </div>
                        </>
                      )}
                    </div>
                    {isSelected && (
                      <div className="absolute -top-3 -right-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                        Seçildi
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-xl flex items-start gap-3">
          <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <div className="text-sm text-gray-600">
            <p className="font-semibold text-gray-900 mb-1">Güvenli Ödeme</p>
            <p>Kart bilgileriniz 256-bit SSL şifreleme ile korunmaktadır. Bilgileriniz saklanmaz.</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={!!privacyAgreementAccepted}
              onChange={(e) => setPrivacyAgreementAccepted?.(e.target.checked)}
              className="mt-1 w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <span className="text-sm text-gray-700">
              <a href="/gizlilik-sozlesmesi" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold underline hover:no-underline">
                Gizlilik Sözleşmesi
              </a>
              ’ni okudum, kabul ediyorum.
            </span>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
        <button 
          onClick={() => setStep(2)} 
          className="px-6 py-3 rounded-xl font-semibold bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all"
        >
          <FaArrowLeft /> Geri
        </button>
        <button 
          onClick={handlePayment} 
          disabled={processingPayment || !cardState.number || !cardState.name || !cardState.month || !cardState.year || !cardState.cvv || !canContinue || !privacyAgreementAccepted}
          className={`px-8 py-3 rounded-xl font-semibold shadow-lg transition-all flex items-center gap-2 ${
            processingPayment || !cardState.number || !cardState.name || !cardState.month || !cardState.year || !cardState.cvv || !canContinue || !privacyAgreementAccepted
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-primary to-blue-600 text-white hover:from-primary-dark hover:to-blue-700 hover:shadow-xl transform hover:-translate-y-0.5'
          }`}
        >
          {processingPayment ? (
            <>
              <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              İşleniyor...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Ödemeyi Tamamla
            </>
          )}
        </button>
      </div>
        </>
      )}
    </motion.div>
  );
}

