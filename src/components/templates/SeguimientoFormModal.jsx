import React, { useState } from 'react';

// Componente para el selector de prioridad
const PrioritySelector = ({ value, onChange, name = 'prioridad' }) => {
  const priorities = [
    { value: 'baja', label: '🟢 Baja', color: 'text-green-600' },
    { value: 'media', label: '🟡 Media', color: 'text-yellow-600' },
    { value: 'alta', label: '🟠 Alta', color: 'text-orange-600' },
    { value: 'urgente', label: '🔴 Urgente', color: 'text-red-600' }
  ];

  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      required
      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Seleccionar prioridad</option>
      {priorities.map((priority) => (
        <option key={priority.value} value={priority.value} className={priority.color}>
          {priority.label}
        </option>
      ))}
    </select>
  );
};

export const SeguimientoFormModal = ({
  showForm,
  setShowForm,
  editingSeguimiento,
  formData,
  handleInputChange,
  handleSubmit,
  resetForm,
  isLoading,
  sistemaInput,
  setSistemaInput,
  desafioInput,
  setDesafioInput,
  puntoCriticoInput,
  setPuntoCriticoInput,
  objetivoInput,
  setObjetivoInput,
  handleArrayKeyPress,
  removeArrayItem,
  sugerenciasDedicaciones,
  sugerenciasTamanos,
  sugerenciasComportamientos
}) => {
  
  const handleArrayInput = (field, value, setInputFunction) => {
    if (value.trim()) {
      handleInputChange({
        target: {
          name: field,
          value: [...formData[field], value.trim()]
        }
      });
      setInputFunction('');
    }
  };

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">
            {editingSeguimiento ? 'Editar Seguimiento' : 'Nuevo Seguimiento'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de la Empresa *
                </label>
                <input
                  type="text"
                  name="nombreEmpresa"
                  value={formData.nombreEmpresa}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contacto *
                </label>
                <input
                  type="text"
                  name="contacto"
                  value={formData.contacto}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono *
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Dedicación *
                </label>
                <input
                  type="text"
                  name="dedicacion"
                  value={formData.dedicacion}
                  onChange={handleInputChange}
                  required
                  list="sugerenciasDedicacionesForm"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Tecnología, Manufactura, Servicios..."
                />
                <datalist id="sugerenciasDedicacionesForm">
                  {sugerenciasDedicaciones.map((dedicacion, index) => (
                    <option key={index} value={dedicacion} />
                  ))}
                </datalist>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tamaño de Empresa *
                </label>
                <input
                  type="text"
                  name="tamanoEmpresa"
                  value={formData.tamanoEmpresa}
                  onChange={handleInputChange}
                  required
                  list="sugerenciasTamanosForm"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Pequeña, Mediana, Grande..."
                />
                <datalist id="sugerenciasTamanosForm">
                  {sugerenciasTamanos.map((tamano, index) => (
                    <option key={index} value={tamano} />
                  ))}
                </datalist>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Comportamiento de Compra *
                </label>
                <input
                  type="text"
                  name="comportamientoCompra"
                  value={formData.comportamientoCompra}
                  onChange={handleInputChange}
                  required
                  list="sugerenciasComportamientosForm"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Conservador, Innovador, Moderado..."
                />
                <datalist id="sugerenciasComportamientosForm">
                  {sugerenciasComportamientos.map((comportamiento, index) => (
                    <option key={index} value={comportamiento} />
                  ))}
                </datalist>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prioridad *
                </label>
                <PrioritySelector
                  value={formData.prioridad}
                  onChange={handleInputChange}
                  name="prioridad"
                />
              </div>
            </div>

            {/* Campos de arrays */}
            {[
              { field: 'sistemas', input: sistemaInput, setInput: setSistemaInput, label: 'Sistemas' },
              { field: 'desafios', input: desafioInput, setInput: setDesafioInput, label: 'Desafíos' },
              { field: 'puntosCriticos', input: puntoCriticoInput, setInput: setPuntoCriticoInput, label: 'Puntos Críticos' },
              { field: 'objetivos', input: objetivoInput, setInput: setObjetivoInput, label: 'Objetivos' }
            ].map(({ field, input, setInput, label }) => (
              <div key={field}>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {label}
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => handleArrayKeyPress(e, field, input, setInput)}
                    placeholder={`Agregar ${label.toLowerCase()}...`}
                    className="flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleArrayInput(field, input, setInput)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData[field].map((item, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {item}
                      <button
                        type="button"
                        onClick={() => removeArrayItem(field, index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Guardando...' : (editingSeguimiento ? 'Actualizar' : 'Crear')}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  resetForm();
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
  );
};