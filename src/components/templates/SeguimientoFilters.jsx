export const SeguimientoFilters = ({
  searchTerm,
  setSearchTerm,
  filterDedicacion,
  setFilterDedicacion,
  filterPrioridad,
  setFilterPrioridad,
  handleSearch,
  handleFilterByDedicacion,
  handleFilterByPrioridad,
  limpiarFiltros,
  sugerenciasDedicaciones,
  setShowForm
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col md:flex-row gap-4 flex-1">
          
          {/* Búsqueda por empresa con iconos */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Buscar por empresa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-20"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    limpiarFiltros();
                  }}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                  title="Limpiar búsqueda"
                >
                  ❌
                </button>
              )}
              <button
                onClick={handleSearch}
                className="text-gray-400 hover:text-blue-600 transition-colors"
                title="Buscar"
              >
                🔍
              </button>
            </div>
          </div>

          {/* Filtro por dedicación con iconos */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Filtrar por dedicación..."
              value={filterDedicacion}
              onChange={(e) => setFilterDedicacion(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleFilterByDedicacion(filterDedicacion)}
              list="sugerenciasDedicaciones"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-20"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              {filterDedicacion && (
                <button
                  onClick={() => {
                    setFilterDedicacion('');
                    limpiarFiltros();
                  }}
                  className="text-gray-400 hover:text-red-600 transition-colors"
                  title="Limpiar filtro"
                >
                  ❌
                </button>
              )}
              <button
                onClick={() => handleFilterByDedicacion(filterDedicacion)}
                className="text-gray-400 hover:text-blue-600 transition-colors"
                title="Filtrar por dedicación"
              >
                🔍
              </button>
            </div>
            <datalist id="sugerenciasDedicaciones">
              {sugerenciasDedicaciones.map((dedicacion, index) => (
                <option key={index} value={dedicacion} />
              ))}
            </datalist>
          </div>

          {/* Filtro por prioridad con icono de confirmación */}
          <div className="relative flex-1">
            <select
              value={filterPrioridad}
              onChange={(e) => setFilterPrioridad(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-20 appearance-none"
            >
              <option value="">Todas las prioridades</option>
              <option value="urgente">🔴 Urgente</option>
              <option value="alta">🟠 Alta</option>
              <option value="media">🟡 Media</option>
              <option value="baja">🟢 Baja</option>
            </select>
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1 pointer-events-none">
              {filterPrioridad && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFilterPrioridad('');
                    limpiarFiltros();
                  }}
                  className="text-gray-400 hover:text-red-600 transition-colors pointer-events-auto"
                  title="Limpiar filtro"
                >
                  ❌
                </button>
              )}
              
            </div>
          </div>
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap"
        >
          ➕ Nuevo Seguimiento
        </button>
      </div>

      
    </div>
  );
};