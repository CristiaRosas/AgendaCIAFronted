import React, { useState } from 'react';

export const SeguimientoVisitasModal = ({
  showVisitasModal,
  setShowVisitasModal,
  selectedSeguimiento,
  visitaForm,
  handleVisitaInputChange,
  handleVisitaSubmit,
  handleEditVisita,
  handleDeleteVisita,
  getEstadoVisitaColor,
  showEditarVisitaModal,
  setShowEditarVisitaModal,
  selectedVisita,
  editarVisitaForm,
  handleEditarVisitaInputChange,
  handleEditarVisitaSubmit
}) => {

  if (!showVisitasModal || !selectedSeguimiento) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">
              Visitas de {selectedSeguimiento.nombreEmpresa}
            </h2>
            
            {/* Formulario para agregar visita */}
            <form onSubmit={handleVisitaSubmit} className="space-y-4 mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Agregar Nueva Visita</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha *
                  </label>
                  <input
                    type="datetime-local"
                    name="fecha"
                    value={visitaForm.fecha}
                    onChange={handleVisitaInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lugar *
                  </label>
                  <input
                    type="text"
                    name="lugar"
                    value={visitaForm.lugar}
                    onChange={handleVisitaInputChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Ej: Oficina Central"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Estado
                  </label>
                  <select
                    name="estadoVisita"
                    value={visitaForm.estadoVisita}
                    onChange={handleVisitaInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="pendiente">Pendiente</option>
                    <option value="agendada">Agendada</option>
                    <option value="completada">Completada</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notas
                  </label>
                  <input
                    type="text"
                    name="notas"
                    value={visitaForm.notas}
                    onChange={handleVisitaInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Notas adicionales..."
                  />
                </div>
              </div>
              
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                ➕ Agregar Visita
              </button>
            </form>

            {/* Lista de visitas existentes */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Visitas Programadas</h3>
              {selectedSeguimiento.visitas && selectedSeguimiento.visitas.length > 0 ? (
                <div className="space-y-3">
                  {selectedSeguimiento.visitas.map((visita) => (
                    <div key={visita._id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">
                            {new Date(visita.fecha).toLocaleDateString()} - {new Date(visita.fecha).toLocaleTimeString()}
                          </p>
                          <p className="text-gray-600">{visita.lugar}</p>
                          {visita.notas && <p className="text-sm text-gray-500">{visita.notas}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${getEstadoVisitaColor(visita.estadoVisita)}`}>
                            {visita.estadoVisita}
                          </span>
                          <button
                            onClick={() => handleEditVisita(visita)}
                            className="text-blue-500 hover:text-blue-700 text-sm"
                            title="Editar visita"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleDeleteVisita(visita._id)}
                            className="text-red-500 hover:text-red-700 text-sm"
                            title="Eliminar visita"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No hay visitas programadas</p>
              )}
            </div>

            <div className="flex gap-4 pt-6">
              <button
                onClick={() => setShowVisitasModal(false)}
                className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para editar visita */}
      {showEditarVisitaModal && selectedVisita && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Editar Visita</h2>
              
              <form onSubmit={handleEditarVisitaSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha *
                    </label>
                    <input
                      type="datetime-local"
                      name="fecha"
                      value={editarVisitaForm.fecha}
                      onChange={handleEditarVisitaInputChange}
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Lugar *
                    </label>
                    <input
                      type="text"
                      name="lugar"
                      value={editarVisitaForm.lugar}
                      onChange={handleEditarVisitaInputChange}
                      required
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Estado
                    </label>
                    <select
                      name="estadoVisita"
                      value={editarVisitaForm.estadoVisita}
                      onChange={handleEditarVisitaInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pendiente">Pendiente</option>
                      <option value="agendada">Agendada</option>
                      <option value="completada">Completada</option>
                      <option value="cancelada">Cancelada</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notas
                    </label>
                    <input
                      type="text"
                      name="notas"
                      value={editarVisitaForm.notas}
                      onChange={handleEditarVisitaInputChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      placeholder="Notas adicionales..."
                    />
                  </div>
                </div>
                
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Actualizar Visita
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowEditarVisitaModal(false);
                      // setSelectedVisita(null); // Esto debería manejarse en el componente principal
                    }}
                    className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};