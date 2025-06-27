export function DemoScenarioCard({ 
  title, 
  description,
  onClick 
}: { 
  title: string; 
  description: string;
  onClick?: () => void;
}) {
  return (
    <div 
      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors"
      onClick={onClick}
    >
      <h4 className="font-medium mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}