import "./StripeInspiredHeroMotion.css";

export default function StripeInspiredHeroMotion() {
  return (
    <div
      className="mesh-hero-background pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 
        Katman 1: Mesh Gradient Orblar (Aydınlık Tema) 
        Açık mavi ve mor renginde devasa bulutsu renk kümeleri yavaşça hareket eder.
      */}
      <div className="mesh-orbs-container">
        <div className="mesh-orb mesh-orb--primary" />
        <div className="mesh-orb mesh-orb--secondary" />
        <div className="mesh-orb mesh-orb--accent" />
      </div>

      {/* 
        Katman 2: Soft Glass (Buzlu Cam) ve Gürültü (Noise) Filtresi
        Alt kısımdaki renkleri yumuşatıp üzerine doku ekleyerek çok premium bir his verir.
      */}
      <div className="mesh-glass-overlay"></div>

      {/* Hero metinlerinin okunabilirliğini artırmak için alt kısma usulca eriyen beyaz gradient */}
      <div className="mesh-bottom-fade"></div>
    </div>
  );
}
