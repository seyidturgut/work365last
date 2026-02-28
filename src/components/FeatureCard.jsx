export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:border-primary text-center transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
      <div className="text-primary mb-4 text-3xl flex justify-center">{icon}</div>
      <h3 className="font-bold text-lg text-primary mb-2">{title}</h3>
      <p className="text-text-light text-sm leading-relaxed">{description}</p>
    </div>
  );
}
