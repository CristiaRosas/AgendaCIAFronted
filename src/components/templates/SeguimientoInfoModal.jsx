import React from 'react';

// Componente para el badge de prioridad
const PriorityBadge = ({ prioridad = 'media', size = 'md' }) => {
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

export const SeguimientoInfoModal = ({
  showInfoModal,
  setShowInfoModal,
  selectedSeguimiento,
  getEstadoVisitaColor
}) => {
  if (!showInfoModal || !selectedSeguimiento) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">
              Información Completa - {selectedSeguimiento.nombreEmpresa}
            </h2>
            {selectedSeguimiento.prioridad && (
              <PriorityBadge prioridad={selectedSeguimiento.prioridad} />
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Información Básica */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Información Básica</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Empresa</label>
                <p className="text-gray-900 font-medium">{selectedSeguimiento.nombreEmpresa}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contacto</label>
                <p className="text-gray-900">{selectedSeguimiento.contacto}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                <p className="text-gray-900">{selectedSeguimiento.telefono}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <p className="text-gray-900">{selectedSeguimiento.correo}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dedicación</label>
                <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {selectedSeguimiento.dedicacion}
                </span>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tamaño de Empresa</label>
                <p className="text-gray-900">{selectedSeguimiento.tamanoEmpresa}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comportamiento de Compra</label>
                <p className="text-gray-900">{selectedSeguimiento.comportamientoCompra}</p>
              </div>

              {selectedSeguimiento.prioridad && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prioridad</label>
                  <PriorityBadge prioridad={selectedSeguimiento.prioridad} />
                </div>
              )}
            </div>

            {/* Información Detallada */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold border-b pb-2">Información Detallada</h3>
              
              {selectedSeguimiento.sistemas && selectedSeguimiento.sistemas.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sistemas</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeguimiento.sistemas.map((sistema, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {sistema}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedSeguimiento.desafios && selectedSeguimiento.desafios.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Desafíos</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeguimiento.desafios.map((desafio, index) => (
                      <span key={index} className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                        {desafio}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedSeguimiento.puntosCriticos && selectedSeguimiento.puntosCriticos.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Puntos Críticos</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeguimiento.puntosCriticos.map((punto, index) => (
                      <span key={index} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                        {punto}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedSeguimiento.objetivos && selectedSeguimiento.objetivos.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Objetivos</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeguimiento.objetivos.map((objetivo, index) => (
                      <span key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                        {objetivo}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Visitas */}
          {selectedSeguimiento.visitas && selectedSeguimiento.visitas.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold border-b pb-2 mb-4">Historial de Visitas</h3>
              <div className="space-y-3">
                {selectedSeguimiento.visitas.map((visita, index) => (
                  <div key={visita._id || index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold">
                          {new Date(visita.fecha).toLocaleDateString()} - {new Date(visita.fecha).toLocaleTimeString()}
                        </p>
                        <p className="text-gray-600">{visita.lugar}</p>
                        {visita.notas && <p className="text-sm text-gray-500 mt-1">{visita.notas}</p>}
                      </div>
                      <span className={`px-2 py-1 text-xs rounded-full ${getEstadoVisitaColor(visita.estadoVisita)}`}>
                        {visita.estadoVisita}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end pt-6">
            <button
              onClick={() => setShowInfoModal(false)}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};