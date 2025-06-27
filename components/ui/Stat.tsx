export function Stat({ 
  label, 
  value 
}: { 
  label: string; 
  value: string 
}) {
  return (
    <div className="text-center p-4 bg-gray-50 rounded border">
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}