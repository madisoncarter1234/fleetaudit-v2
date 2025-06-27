export function UploadCard({ 
  title, 
  icon, 
  onDrop,
  description,
  required = false
}: {
  title: string;
  icon: string;
  onDrop: (file: File) => void;
  description?: string;
  required?: boolean;
}) {
  return (
    <div className="flex-1 min-w-[280px] bg-blue-50 border border-blue-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-medium mb-2 flex items-center justify-center gap-2">
        {title}
        {required && <span className="text-red-500 text-sm">*Required</span>}
      </h3>
      {description && (
        <p className="text-sm text-gray-600 mb-4">{description}</p>
      )}
      <input 
        type="file" 
        accept=".csv,.xlsx" 
        onChange={(e) => {
          if (e.target.files?.[0]) onDrop(e.target.files[0]);
        }} 
        className="block mx-auto file:cursor-pointer file:bg-blue-600 file:text-white file:px-4 file:py-2 file:rounded file:border-0 hover:file:bg-blue-700 file:transition-colors"
      />
    </div>
  );
}