export default function Section({ 
  title, 
  icon, 
  children 
}: { 
  title: string; 
  icon?: string; 
  children: React.ReactNode 
}) {
  return (
    <div className="my-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        {icon && <span className="text-xl">{icon}</span>} {title}
      </h2>
      <div>{children}</div>
    </div>
  );
}