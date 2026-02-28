import React from 'react';
import './aura.css';

export default function AuraLanding(){
  return (
    <div className="aura-page-root">
      <nav className="navbar">
        <div className="logo">AURA <span>HİZMETLER</span></div>
        <ul className="nav-links">
            <li><a href="#" className="active">Ana Sayfa</a></li>
            <li><a href="#">Hizmetlerimiz</a></li>
            <li><a href="#">Kurumsal</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">İletişim</a></li>
        </ul>
        <a href="#rezervasyon" className="btn header-cta">Hemen Başla</a>
      </nav>

      <header className="hero-slider">
        <div className="slider-arrow arrow-left"><i className="fas fa-chevron-left"/></div>
        <div className="slider-arrow arrow-right"><i className="fas fa-chevron-right"/></div>

        <div className="hero-content container">
            <span className="hero-badge">Premium Yaşam Desteği</span>
            <h1>Eviniz İçin<br/>Profesyonel Dokunuşlar.</h1>
            <p>Temizlikten bakıma, özel asistanlıktan organizasyona kadar ihtiyacınız olan tüm premium hizmetler tek bir platformda. Konforunuz bizim önceliğimiz.</p>
            <a href="#rezervasyon" className="btn">Hizmetleri Keşfet</a>
        </div>
      </header>

      <section className="booking-section" id="rezervasyon">
        <div className="booking-container">
            <div className="booking-text">
                <h2>Hizmet Bölgenizi <span>Seçin</span></h2>
                <p>Size en yakın profesyonel ekibimizi yönlendirebilmemiz için lütfen hizmet almak istediğiniz konumu ve zamanı belirtin.</p>
                <ul className="feature-list">
                    <li><i className="fas fa-check-circle"/> 7/24 Güvenilir Hizmet</li>
                    <li><i className="fas fa-check-circle"/> Sertifikalı Profesyoneller</li>
                    <li><i className="fas fa-check-circle"/> %100 Müşteri Memnuniyeti</li>
                </ul>
            </div>

            <div className="booking-form-container">
                <div className="map-bg-overlay"/>
                <h3 className="form-title">Rezervasyon Oluştur</h3>
                <form>
                    <div className="input-group">
                        <i className="fas fa-map-marker-alt"/>
                        <input type="text" className="form-input" placeholder="Adresinizi veya bölgenizi girin..." />
                    </div>

                    <div className="form-row">
                        <div className="input-group">
                            <i className="fas fa-calendar-alt"/>
                            <input type="text" className="form-input" placeholder="Tarih Seçin" onFocus={(e)=>e.target.type='date'} />
                        </div>
                        <div className="input-group">
                            <i className="fas fa-clock"/>
                            <input type="text" className="form-input" placeholder="Saat Seçin" onFocus={(e)=>e.target.type='time'} />
                        </div>
                    </div>

                    <div className="input-group">
                        <i className="fas fa-concierge-bell"/>
                        <select defaultValue="" className="form-input">
                            <option value="" disabled>Hizmet Türü Seçin</option>
                            <option value="1">Premium Ev Temizliği</option>
                            <option value="2">Özel Şef &amp; Catering</option>
                            <option value="3">Teknik Bakım &amp; Onarım</option>
                        </select>
                    </div>

                    <button type="submit" className="btn" style={{width: '100%'}}>Müsaitlik Kontrol Et</button>
                </form>
            </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer-content">
            <div className="footer-col footer-about">
                <h3>AURA HİZMETLER</h3>
                <p>Modern yaşamın temposunda, evinize ve size hak ettiğiniz özeni gösteren premium hizmet sağlayıcınız.</p>
            </div>

            <div className="footer-col">
                <h3>Hızlı Erişim</h3>
                <ul className="footer-links">
                    <li><a href="#">Hakkımızda</a></li>
                    <li><a href="#">Nasıl Çalışır?</a></li>
                    <li><a href="#">Sıkça Sorulan Sorular</a></li>
                    <li><a href="#">Kariyer</a></li>
                </ul>
            </div>

            <div className="footer-col">
                <h3>Hizmetlerimiz</h3>
                <ul className="footer-links">
                    <li><a href="#">Ev Temizliği</a></li>
                    <li><a href="#">Kişisel Asistan</a></li>
                    <li><a href="#">Bahçe Bakımı</a></li>
                    <li><a href="#">Teknik Destek</a></li>
                </ul>
            </div>

            <div className="footer-col">
                <h3>İletişim</h3>
                <ul className="contact-info">
                    <li><i className="fas fa-map-pin"/> Maslak Mah. Büyükdere Cad. No:123, İstanbul</li>
                    <li><i className="fas fa-phone-alt"/> +90 (212) 345 67 89</li>
                    <li><i className="fas fa-envelope"/> info@aurahizmetler.com</li>
                </ul>
            </div>
        </div>

        <div className="footer-bottom">
            <div className="container footer-bottom-container">
                <p>&copy; 2023 Aura Hizmetler. Tüm hakları saklıdır.</p>
                <div className="social-icons">
                    <a href="#"><i className="fab fa-facebook-f"/></a>
                    <a href="#"><i className="fab fa-twitter"/></a>
                    <a href="#"><i className="fab fa-instagram"/></a>
                    <a href="#"><i className="fab fa-linkedin-in"/></a>
                </div>
            </div>
        </div>
      </footer>
    </div>
  )
}
