import React from 'react';

// Componente para el badge de prioridad
const PriorityBadge = ({ prioridad = 'media', size = 'sm' }) => {
  const getPriorityConfig = (priority) => {
    const config = {
      baja: {
        color: 'bg-green-100 text-green-800 border-green-200',
        icon: '🟢',
        label: 'Baja'
      },
      media: {
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        icon: '🟡',
        label: 'Media'
      },
      alta: {
        color: 'bg-orange-100 text-orange-800 border-orange-200',
        icon: '🟠',
        label: 'Alta'
      },
      urgente: {
        color: 'bg-red-100 text-red-800 border-red-200',
        icon: '🔴',
        label: 'Urgente'
      }
    };
    return config[priority] || config.media;
  };

  const { color, icon, label } = getPriorityConfig(prioridad);
  const sizeClass = size === 'sm' ? 'px-2 py-1 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center gap-1 ${sizeClass} ${color} border rounded-full font-medium`}>
      <span>{icon}</span>
      <span>{label}</span>
    </span>
  );
};

export const SeguimientoTable = ({
  isLoading,
  displayedSeguimientos,
  handleEdit,
  handleShowVisitas,
  handleDelete,
  handleShowInfo,
  getEstadoVisitaColor
}) => {
  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Cargando seguimientos...</p>
      </div>
    );
  }

  if (displayedSeguimientos.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-6xl mb-4">📋</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No hay seguimientos</h3>
        <p className="text-gray-600">Comienza agregando tu primer seguimiento empresarial</p>
      </div>
    );
  }

  // Función para obtener el estado de la última visita
  const getUltimoEstadoVisita = (seguimiento) => {
    if (!seguimiento.visitas || seguimiento.visitas.length === 0) {
      return 'Sin visitas';
    }
    
    // Ordenar visitas por fecha (más reciente primero)
    const visitasOrdenadas = [...seguimiento.visitas].sort((a, b) => 
      new Date(b.fecha) - new Date(a.fecha)
    );
    
    return visitasOrdenadas[0].estadoVisita;
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Prioridad
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Empresa
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Contacto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Dedicación
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tamaño
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Visitas
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {displayedSeguimientos.map((seguimiento) => {
            const ultimoEstado = getUltimoEstadoVisita(seguimiento);
            
            return (
              <tr key={seguimiento._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <PriorityBadge prioridad={seguimiento.prioridad} size="sm" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{seguimiento.nombreEmpresa}</div>
                  <div className="text-sm text-gray-500">{seguimiento.correo}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900">{seguimiento.contacto}</div>
                  <div className="text-sm text-gray-500">{seguimiento.telefono}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {seguimiento.dedicacion}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {seguimiento.tamanoEmpresa}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                    {seguimiento.visitas ? seguimiento.visitas.length : 0} visitas
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    ultimoEstado === 'Sin visitas' 
                      ? 'bg-gray-100 text-gray-800' 
                      : getEstadoVisitaColor(ultimoEstado)
                  }`}>
                    {ultimoEstado}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleShowInfo(seguimiento)}
                      className="text-indigo-600 hover:text-indigo-900"
                      title="Ver información"
                    >
                      👁️
                    </button>
                    <button
                      onClick={() => handleEdit(seguimiento)}
                      className="text-blue-600 hover:text-blue-900"
                      title="Editar"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleShowVisitas(seguimiento)}
                      className="text-green-600 hover:text-green-900"
                      title="Gestionar visitas"
                    >
                      📅
                    </button>
                    <button
                      onClick={() => handleDelete(seguimiento._id)}
                      className="text-red-600 hover:text-red-900"
                      title="Eliminar"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};