export function DataStatus({ 
  fuel, 
  gps, 
  job 
}: { 
  fuel: boolean; 
  gps: boolean; 
  job: boolean 
}) {
  const block = (label: string, loaded: boolean, required: boolean = false) => (
    <div className="flex-1 text-center p-4 rounded border bg-white shadow-sm">
      <h4 className="text-md font-medium mb-2 flex items-center justify-center gap-2">
        {label}
        {required && <span className="text-red-500 text-xs">*Required</span>}
      </h4>
      <div className={`font-semibold ${loaded ? "text-green-600" : "text-gray-400"}`}>
        {loaded ? "✅ Loaded" : "⏳ Not loaded"}
      </div>
      {loaded && (
        <div className="text-xs text-gray-500 mt-1">Ready for analysis</div>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      {block("Fuel Records", fuel, true)}
      {block("GPS Records", gps)}
      {block("Job Records", job)}
    </div>
  );
}