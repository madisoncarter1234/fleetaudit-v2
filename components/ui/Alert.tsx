export function Alert({ 
  type = 'info', 
  children,
  className = ""
}: { 
  type?: 'info' | 'warning' | 'success' | 'error'; 
  children: React.ReactNode;
  className?: string;
}) {
  const colors = {
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-300',
    success: 'bg-green-50 text-green-800 border-green-200',
    error: 'bg-red-50 text-red-800 border-red-300',
  }[type];

  const icons = {
    info: 'ℹ️',
    warning: '⚠️',
    success: '✅',
    error: '❌',
  }[type];

  return (
    <div className={`border-l-4 px-4 py-3 rounded ${colors} mb-4 flex items-start gap-2 ${className}`}>
      <span className="text-lg">{icons}</span>
      <div>{children}</div>
    </div>
  );
}