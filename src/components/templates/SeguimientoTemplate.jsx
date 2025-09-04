import React, { useState, useEffect } from 'react';
import { useSeguimientoStore } from '../../shared/hooks/useSeguimientoStore';
import { SeguimientoHeader } from './SeguimientoHeader';
import { SeguimientoFilters } from './SeguimientoFilters';
import { SeguimientoFormModal } from './SeguimientoFormModal';
import { SeguimientoVisitasModal } from './SeguimientoVisitasModal';
import { SeguimientoInfoModal } from './SeguimientoInfoModal';
import { SeguimientoTable } from './SeguimientoTable';
import { SeguimientoStats } from './SeguimientoStats';

export const SeguimientoTemplate = () => {
  const {
    seguimientos,
    seguimientosFiltrados,
    isLoading,
    error,
    createSeguimiento,
    getSeguimientos,
    updateSeguimiento,
    deleteSeguimiento,
    buscarPorEmpresa,
    buscarPorDedicacion,
    limpiarFiltros,
    obtenerSugerencias,
    sugerenciasDedicaciones,
    sugerenciasTamanos,
    sugerenciasComportamientos,
    agregarVisita,
    actualizarVisita,
    eliminarVisita,
    clearError
  } = useSeguimientoStore();

  const [showForm, setShowForm] = useState(false);
  const [showVisitasModal, setShowVisitasModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [showEditarVisitaModal, setShowEditarVisitaModal] = useState(false);
  const [editingSeguimiento, setEditingSeguimiento] = useState(null);
  const [selectedSeguimiento, setSelectedSeguimiento] = useState(null);
  const [selectedVisita, setSelectedVisita] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDedicacion, setFilterDedicacion] = useState('');
  const [filterPrioridad, setFilterPrioridad] = useState('');
  const [formData, setFormData] = useState({
    nombreEmpresa: '',
    contacto: '',
    telefono: '',
    correo: '',
    dedicacion: '',
    prioridad: 'media',
    sistemas: [],
    tamanoEmpresa: '',
    desafios: [],
    puntosCriticos: [],
    objetivos: [],
    comportamientoCompra: '',
    visitas: []
  });

  const [visitaForm, setVisitaForm] = useState({
    fecha: '',
    lugar: '',
    estadoVisita: 'pendiente',
    notas: ''
  });

  const [editarVisitaForm, setEditarVisitaForm] = useState({
    fecha: '',
    lugar: '',
    estadoVisita: 'pendiente',
    notas: ''
  });

  const [sistemaInput, setSistemaInput] = useState('');
  const [desafioInput, setDesafioInput] = useState('');
  const [puntoCriticoInput, setPuntoCriticoInput] = useState('');
  const [objetivoInput, setObjetivoInput] = useState('');

  useEffect(() => {
    getSeguimientos();
    obtenerSugerencias();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVisitaInputChange = (e) => {
    const { name, value } = e.target;
    setVisitaForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditarVisitaInputChange = (e) => {
    const { name, value } = e.target;
    setEditarVisitaForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleArrayInput = (field, value, setInputFunction) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], value.trim()]
      }));
      setInputFunction('');
    }
  };

  const handleArrayKeyPress = (e, field, value, setInputFunction) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleArrayInput(field, value, setInputFunction);
    }
  };

  const removeArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSeguimiento) {
        await updateSeguimiento(editingSeguimiento._id, formData);
        alert('Seguimiento actualizado exitosamente!');
      } else {
        await createSeguimiento(formData);
        alert('Seguimiento creado exitosamente!');
      }
      resetForm();
      setShowForm(false);
      obtenerSugerencias();
    } catch (error) {
      alert('Error al guardar: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleVisitaSubmit = async (e) => {
    e.preventDefault();
    try {
        // 1. Primero llama al backend y ESPERA la respuesta
        const seguimientoActualizado = await agregarVisita(selectedSeguimiento._id, visitaForm);
        
        // 2. Usa los datos que devuelve el backend en lugar de crear un objeto local
        setSelectedSeguimiento(seguimientoActualizado);
        
        // 3. Actualiza la lista completa de seguimientos
        setSeguimientos(prev => prev.map(seg => 
            seg._id === selectedSeguimiento._id ? seguimientoActualizado : seg
        ));
        
        // 4. Limpia el formulario
        setVisitaForm({
            fecha: '',
            lugar: '',
            estadoVisita: 'pendiente',
            notas: ''
        });
        
        alert('Visita agregada exitosamente!');
        
    } catch (error) {
        alert('Error al agregar visita: ' + (error.response?.data?.message || error.message));
    }
};

  const handleEditarVisitaSubmit = async (e) => {
    e.preventDefault();
    try {
      await actualizarVisita(selectedSeguimiento._id, selectedVisita._id, editarVisitaForm);
      alert('Visita actualizada exitosamente!');
      
      const updatedSeguimiento = { ...selectedSeguimiento };
      updatedSeguimiento.visitas = updatedSeguimiento.visitas.map(visita =>
        visita._id === selectedVisita._id 
          ? { ...visita, ...editarVisitaForm, fecha: new Date(editarVisitaForm.fecha) }
          : visita
      );
      setSelectedSeguimiento(updatedSeguimiento);
      
      setShowEditarVisitaModal(false);
      setSelectedVisita(null);
      
    } catch (error) {
      alert('Error al actualizar visita: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleEdit = (seguimiento) => {
    setEditingSeguimiento(seguimiento);
    setFormData({
      ...seguimiento,
      prioridad: seguimiento.prioridad || 'media',
      sistemas: seguimiento.sistemas || [],
      desafios: seguimiento.desafios || [],
      puntosCriticos: seguimiento.puntosCriticos || [],
      objetivos: seguimiento.objetivos || [],
      visitas: seguimiento.visitas || []
    });
    setShowForm(true);
  };

  const handleShowVisitas = (seguimiento) => {
    setSelectedSeguimiento(seguimiento);
    setShowVisitasModal(true);
    setVisitaForm({
      fecha: '',
      lugar: '',
      estadoVisita: 'pendiente',
      notas: ''
    });
  };

  const handleShowInfo = (seguimiento) => {
    setSelectedSeguimiento(seguimiento);
    setShowInfoModal(true);
  };

  const handleEditVisita = (visita) => {
    setSelectedVisita(visita);
    setEditarVisitaForm({
      fecha: visita.fecha ? new Date(visita.fecha).toISOString().slice(0, 16) : '',
      lugar: visita.lugar || '',
      estadoVisita: visita.estadoVisita || 'pendiente',
      notas: visita.notas || ''
    });
    setShowEditarVisitaModal(true);
  };

  const handleDeleteVisita = async (visitaId) => {
    if (window.confirm('¿Estás seguro de eliminar esta visita?')) {
      try {
        await eliminarVisita(selectedSeguimiento._id, visitaId);
        alert('Visita eliminada exitosamente!');
        
        const updatedSeguimiento = { ...selectedSeguimiento };
        updatedSeguimiento.visitas = updatedSeguimiento.visitas.filter(v => v._id !== visitaId);
        setSelectedSeguimiento(updatedSeguimiento);
        
      } catch (error) {
        alert('Error al eliminar visita: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este seguimiento?')) {
      try {
        await deleteSeguimiento(id);
        alert('Seguimiento eliminado exitosamente!');
        obtenerSugerencias();
      } catch (error) {
        alert('Error al eliminar: ' + (error.response?.data?.message || error.message));
      }
    }
  };

  const resetForm = () => {
    setFormData({
      nombreEmpresa: '',
      contacto: '',
      telefono: '',
      correo: '',
      dedicacion: '',
      prioridad: 'media',
      sistemas: [],
      tamanoEmpresa: '',
      desafios: [],
      puntosCriticos: [],
      objetivos: [],
      comportamientoCompra: '',
      visitas: []
    });
    setEditingSeguimiento(null);
    setSistemaInput('');
    setDesafioInput('');
    setPuntoCriticoInput('');
    setObjetivoInput('');
  };

  const handleSearch = async () => {
    if (searchTerm) {
      // Búsqueda local con coincidencias parciales
      const searchTermLower = searchTerm.toLowerCase();
      const filtrados = seguimientos.filter(seg => 
        seg.nombreEmpresa && seg.nombreEmpresa.toLowerCase().includes(searchTermLower)
      );
      
      // Actualizar resultados filtrados
      if (typeof useSeguimientoStore.getState().setSeguimientosFiltrados === 'function') {
        useSeguimientoStore.getState().setSeguimientosFiltrados(filtrados);
      }
    } else {
      await limpiarFiltros();
    }
  };

  const handleFilterByDedicacion = async (dedicacion) => {
    if (dedicacion) {
      // Filtrado local con coincidencias parciales
      const dedicacionLower = dedicacion.toLowerCase();
      const filtrados = seguimientos.filter(seg => 
        seg.dedicacion && seg.dedicacion.toLowerCase().includes(dedicacionLower)
      );
      
      // Actualizar resultados filtrados
      if (typeof useSeguimientoStore.getState().setSeguimientosFiltrados === 'function') {
        useSeguimientoStore.getState().setSeguimientosFiltrados(filtrados);
      }
    } else {
      await limpiarFiltros();
    }
  };

  const handleFilterByPrioridad = (prioridad) => {
    setFilterPrioridad(prioridad);
  };

  const getEstadoVisitaColor = (estado) => {
    switch (estado) {
      case 'agendada': return 'bg-blue-100 text-blue-800';
      case 'completada': return 'bg-green-100 text-green-800';
      case 'cancelada': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Filtrado combinado con coincidencias parciales
  const displayedSeguimientos = () => {
    let result = seguimientos;
    
    // Aplicar filtros de búsqueda y dedicación (coincidencias parciales)
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      result = result.filter(seg => 
        seg.nombreEmpresa && seg.nombreEmpresa.toLowerCase().includes(searchTermLower)
      );
    }
    
    if (filterDedicacion) {
      const dedicacionLower = filterDedicacion.toLowerCase();
      result = result.filter(seg => 
        seg.dedicacion && seg.dedicacion.toLowerCase().includes(dedicacionLower)
      );
    }
    
    // Aplicar filtro de prioridad (coincidencia exacta)
    if (filterPrioridad) {
      result = result.filter(seg => seg.prioridad === filterPrioridad);
    }
    
    return result;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <SeguimientoHeader />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
            <button 
              onClick={clearError}
              className="absolute top-0 right-0 px-4 py-3"
            >
              ×
            </button>
          </div>
        )}

        <SeguimientoFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterDedicacion={filterDedicacion}
          setFilterDedicacion={setFilterDedicacion}
          filterPrioridad={filterPrioridad}
          setFilterPrioridad={setFilterPrioridad}
          handleSearch={handleSearch}
          handleFilterByDedicacion={handleFilterByDedicacion}
          handleFilterByPrioridad={handleFilterByPrioridad}
          limpiarFiltros={limpiarFiltros}
          sugerenciasDedicaciones={sugerenciasDedicaciones}
          setShowForm={setShowForm}
        />

        <SeguimientoFormModal
          showForm={showForm}
          setShowForm={setShowForm}
          editingSeguimiento={editingSeguimiento}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          resetForm={resetForm}
          isLoading={isLoading}
          sistemaInput={sistemaInput}
          setSistemaInput={setSistemaInput}
          desafioInput={desafioInput}
          setDesafioInput={setDesafioInput}
          puntoCriticoInput={puntoCriticoInput}
          setPuntoCriticoInput={setPuntoCriticoInput}
          objetivoInput={objetivoInput}
          setObjetivoInput={setObjetivoInput}
          handleArrayKeyPress={handleArrayKeyPress}
          removeArrayItem={removeArrayItem}
          sugerenciasDedicaciones={sugerenciasDedicaciones}
          sugerenciasTamanos={sugerenciasTamanos}
          sugerenciasComportamientos={sugerenciasComportamientos}
        />

        <SeguimientoInfoModal
          showInfoModal={showInfoModal}
          setShowInfoModal={setShowInfoModal}
          selectedSeguimiento={selectedSeguimiento}
          getEstadoVisitaColor={getEstadoVisitaColor}
        />

        <SeguimientoVisitasModal
          showVisitasModal={showVisitasModal}
          setShowVisitasModal={setShowVisitasModal}
          selectedSeguimiento={selectedSeguimiento}
          visitaForm={visitaForm}
          handleVisitaInputChange={handleVisitaInputChange}
          handleVisitaSubmit={handleVisitaSubmit}
          handleEditVisita={handleEditVisita}
          handleDeleteVisita={handleDeleteVisita}
          getEstadoVisitaColor={getEstadoVisitaColor}
          showEditarVisitaModal={showEditarVisitaModal}
          setShowEditarVisitaModal={setShowEditarVisitaModal}
          selectedVisita={selectedVisita}
          editarVisitaForm={editarVisitaForm}
          handleEditarVisitaInputChange={handleEditarVisitaInputChange}
          handleEditarVisitaSubmit={handleEditarVisitaSubmit}
        />

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <SeguimientoTable
            isLoading={isLoading}
            displayedSeguimientos={displayedSeguimientos()}
            handleEdit={handleEdit}
            handleShowVisitas={handleShowVisitas}
            handleDelete={handleDelete}
            handleShowInfo={handleShowInfo}
            getEstadoVisitaColor={getEstadoVisitaColor}
          />
        </div>

        <SeguimientoStats seguimientos={seguimientos} />
      </div>
    </div>
  );
};