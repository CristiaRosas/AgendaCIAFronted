export const SeguimientoStats = ({ seguimientos }) => {
  const stats = {
    total: seguimientos.length,
    prioridadBaja: seguimientos.filter(s => s.prioridad === 'baja').length,
    prioridadMedia: seguimientos.filter(s => s.prioridad === 'media').length,
    prioridadAlta: seguimientos.filter(s => s.prioridad === 'alta').length,
    prioridadUrgente: seguimientos.filter(s => s.prioridad === 'urgente').length,
    totalVisitas: seguimientos.reduce((total, seg) => total + (seg.visitas ? seg.visitas.length : 0), 0),
    empresasGrandes: seguimientos.filter(s => s.tamanoEmpresa?.includes('Grande')).length
  };

  return (
    <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
        <div className="text-sm text-gray-600">Total</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <div className="text-2xl font-bold text-red-600">{stats.prioridadUrgente}</div>
        <div className="text-sm text-gray-600">🔴 Urgentes</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <div className="text-2xl font-bold text-orange-600">{stats.prioridadAlta}</div>
        <div className="text-sm text-gray-600">🟠 Altas</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <div className="text-2xl font-bold text-yellow-600">{stats.prioridadMedia}</div>
        <div className="text-sm text-gray-600">🟡 Medias</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <div className="text-2xl font-bold text-green-600">{stats.prioridadBaja}</div>
        <div className="text-sm text-gray-600">🟢 Bajas</div>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-md text-center">
        <div className="text-2xl font-bold text-purple-600">{stats.totalVisitas}</div>
        <div className="text-sm text-gray-600">Visitas</div>
      </div>
    </div>
  );
};

// Asegúrate de que solo haya UNA exportación por defecto o named export
export default SeguimientoStats;