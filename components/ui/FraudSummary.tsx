export function FraudSummary({ 
  results 
}: {
  results: {
    total_violations: number;
    estimated_loss_usd: number;
    high_risk_vehicles: string[];
    high_risk_drivers: string[];
    violations: { 
      vehicle: string; 
      driver: string; 
      type: string; 
      time: string; 
      details: string 
    }[];
  };
}) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{results.total_violations}</div>
          <div className="text-sm text-red-700">Violations Detected</div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{formatCurrency(results.estimated_loss_usd)}</div>
          <div className="text-sm text-orange-700">Estimated Loss</div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{results.high_risk_vehicles.length}</div>
          <div className="text-sm text-purple-700">High-Risk Vehicles</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{results.high_risk_drivers.length}</div>
          <div className="text-sm text-blue-700">High-Risk Drivers</div>
        </div>
      </div>

      {/* High Risk Items */}
      {(results.high_risk_vehicles.length > 0 || results.high_risk_drivers.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">🚛 High-Risk Vehicles</h4>
            <div className="text-sm">
              {results.high_risk_vehicles.length > 0 
                ? results.high_risk_vehicles.join(', ')
                : 'None identified'}
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">🧍 High-Risk Drivers</h4>
            <div className="text-sm">
              {results.high_risk_drivers.length > 0 
                ? results.high_risk_drivers.join(', ')
                : 'None identified'}
            </div>
          </div>
        </div>
      )}

      {/* Violation Details */}
      <div>
        <h4 className="font-semibold mb-4 text-lg">🚨 Violation Details</h4>
        <div className="space-y-3">
          {results.violations.map((violation, i) => (
            <div key={i} className="border-l-4 border-red-500 pl-4 bg-red-50 p-4 rounded-r-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-red-800">{violation.type}</p>
                  <p className="text-sm text-gray-700 mt-1">
                    Vehicle: <span className="font-medium">{violation.vehicle}</span> • 
                    Driver: <span className="font-medium">{violation.driver}</span> • 
                    Time: <span className="font-medium">{violation.time}</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-2">{violation.details}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}