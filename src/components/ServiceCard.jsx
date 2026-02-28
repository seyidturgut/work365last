export default function ServiceCard({ icon, title, description }) {
  return (
    <div className="bg-secondary rounded-xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-primary">
      <div className="text-primary text-3xl mb-4">{icon}</div>
      <h3 className="font-bold text-xl text-primary mb-3">{title}</h3>
      <p className="text-text-light text-sm leading-relaxed">{description}</p>
    </div>
  );
}
