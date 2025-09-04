import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:2900";
const API_PREFIX = "/AgendaCIA/v1";

export const useSeguimientoStore = create((set, get) => ({
    isLoading: false,
    error: null,
    isSeguimientoCreated: false,
    seguimientoData: null,
    
    seguimientos: [],
    seguimientosFiltrados: [],
    totalSeguimientos: 0,

    sugerenciasDedicaciones: [],
    sugerenciasTamanos: [],
    sugerenciasComportamientos: [],

    obtenerSugerencias: async () => {
        try {
            const [dedicaciones, tamanos, comportamientos] = await Promise.allSettled([
                axios.get(`${API_BASE_URL}${API_PREFIX}/dedicaciones`).catch(() => ({ data: { dedicaciones: [] } })),
                axios.get(`${API_BASE_URL}${API_PREFIX}/tamanos-empresa`).catch(() => ({ data: { tamanos: [] } })),
                axios.get(`${API_BASE_URL}${API_PREFIX}/comportamientos-compra`).catch(() => ({ data: { comportamientos: [] } }))
            ]);

            set({
                sugerenciasDedicaciones: dedicaciones.status === 'fulfilled' ? (dedicaciones.value.data.dedicaciones || []) : [],
                sugerenciasTamanos: tamanos.status === 'fulfilled' ? (tamanos.value.data.tamanos || []) : [],
                sugerenciasComportamientos: comportamientos.status === 'fulfilled' ? (comportamientos.value.data.comportamientos || []) : []
            });
        } catch (error) {
            console.log("Info: Endpoints de sugerencias no disponibles aún");
            set({
                sugerenciasDedicaciones: [],
                sugerenciasTamanos: [],
                sugerenciasComportamientos: []
            });
        }
    },

    createSeguimiento: async (seguimientoInfo) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_BASE_URL}${API_PREFIX}/seguimientos/crear`, seguimientoInfo);
            
            const nuevoSeguimiento = response.data.seguimiento || response.data;
            
            set(state => ({ 
                seguimientoData: nuevoSeguimiento, 
                isSeguimientoCreated: true,
                seguimientos: [nuevoSeguimiento, ...state.seguimientos],
                seguimientosFiltrados: [nuevoSeguimiento, ...state.seguimientosFiltrados],
                totalSeguimientos: state.totalSeguimientos + 1
            }));
            
            get().obtenerSugerencias();
            
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al crear seguimiento';
            set({ error: errorMessage });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
    
    getSeguimientos: async (params = {}) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_BASE_URL}${API_PREFIX}/seguimientos/obtener`, { params });
            
            let seguimientos = [];
            if (response.data && response.data.seguimientos) {
                seguimientos = response.data.seguimientos;
            } else if (Array.isArray(response.data)) {
                seguimientos = response.data;
            } else if (response.data && response.data.data) {
                seguimientos = response.data.data;
            }
            
            set({ 
                seguimientos, 
                seguimientosFiltrados: seguimientos,
                totalSeguimientos: seguimientos.length,
                isLoading: false 
            });
            return seguimientos;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error de conexión con el servidor';
            set({ 
                isLoading: false, 
                error: errorMessage,
                seguimientos: [], 
                seguimientosFiltrados: [] 
            });
            throw error;
        }
    },

    updateSeguimiento: async (seguimientoId, datosActualizados) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.put(
                `${API_BASE_URL}${API_PREFIX}/seguimientos/actualizar/${seguimientoId}`, 
                datosActualizados
            );
            
            const seguimientoActualizado = response.data.seguimiento || response.data;
            
            set(state => ({
                seguimientos: state.seguimientos.map(seg => 
                    seg._id === seguimientoId ? seguimientoActualizado : seg
                ),
                seguimientosFiltrados: state.seguimientosFiltrados.map(seg => 
                    seg._id === seguimientoId ? seguimientoActualizado : seg
                ),
                isLoading: false 
            }));
            
            get().obtenerSugerencias();
            
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al actualizar seguimiento';
            set({ error: errorMessage, isLoading: false });
            throw error;
        }
    },
    
    deleteSeguimiento: async (seguimientoId) => {
        set({ isLoading: true, error: null });
        try {
            await axios.delete(`${API_BASE_URL}${API_PREFIX}/seguimientos/eliminar/${seguimientoId}`, {
                data: { confirm: true }
            });
            
            set(state => ({
                seguimientos: state.seguimientos.filter(seg => seg._id !== seguimientoId),
                seguimientosFiltrados: state.seguimientosFiltrados.filter(seg => seg._id !== seguimientoId),
                totalSeguimientos: state.totalSeguimientos - 1,
                isLoading: false 
            }));
            
            get().obtenerSugerencias();
            
            return { success: true };
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al eliminar seguimiento';
            set({ error: errorMessage, isLoading: false });
            throw error;
        }
    },
    
    buscarPorEmpresa: async (nombreEmpresa) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_BASE_URL}${API_PREFIX}/seguimientos/buscar/empresa`, {
                params: { nombre: nombreEmpresa }
            });
            
            let seguimientosFiltrados = [];
            if (response.data && response.data.seguimientos) {
                seguimientosFiltrados = response.data.seguimientos;
            } else if (Array.isArray(response.data)) {
                seguimientosFiltrados = response.data;
            } else if (response.data && response.data.data) {
                seguimientosFiltrados = response.data.data;
            }
            
            set({ 
                seguimientosFiltrados,
                isLoading: false 
            });
            return seguimientosFiltrados;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error en la búsqueda';
            set({ error: errorMessage, isLoading: false });
            throw error;
        }
    },
    
    buscarPorDedicacion: async (dedicacion) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_BASE_URL}${API_PREFIX}/seguimientos/buscar/dedicacion`, {
                params: { dedicacion }
            });
            
            let seguimientosFiltrados = [];
            if (response.data && response.data.seguimientos) {
                seguimientosFiltrados = response.data.seguimientos;
            } else if (Array.isArray(response.data)) {
                seguimientosFiltrados = response.data;
            } else if (response.data && response.data.data) {
                seguimientosFiltrados = response.data.data;
            }
            
            set({ 
                seguimientosFiltrados,
                isLoading: false 
            });
            return seguimientosFiltrados;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error en la búsqueda';
            set({ error: errorMessage, isLoading: false });
            throw error;
        }
    },
    
    limpiarFiltros: async () => {
        return await get().getSeguimientos();
    },
    
    getSeguimientoById: async (id) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(`${API_BASE_URL}${API_PREFIX}/seguimientos/obtener/${id}`);
            set({ isLoading: false });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al obtener seguimiento';
            set({ error: errorMessage, isLoading: false });
            throw error;
        }
    },

    // FUNCIONES PARA VISITAS
    agregarVisita: async (seguimientoId, visitaData) => {
    set({ isLoading: true, error: null });
    try {
        const response = await axios.post(
            `${API_BASE_URL}${API_PREFIX}/seguimientos/${seguimientoId}/visitas`,
            visitaData
        );
        
        // Asegúrate de que la respuesta tenga el formato correcto
        const seguimientoActualizado = response.data.seguimiento || response.data;
        
        set(state => ({
            seguimientos: state.seguimientos.map(seg => 
                seg._id === seguimientoId ? seguimientoActualizado : seg
            ),
            seguimientosFiltrados: state.seguimientosFiltrados.map(seg => 
                seg._id === seguimientoId ? seguimientoActualizado : seg
            ),
            isLoading: false 
        }));
        
        return seguimientoActualizado; // ← Devuelve el seguimiento actualizado
        
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Error al agregar visita';
        set({ error: errorMessage, isLoading: false });
        throw error;
    }
},

    actualizarVisita: async (seguimientoId, visitaId, visitaData) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.put(
                `${API_BASE_URL}${API_PREFIX}/seguimientos/${seguimientoId}/visitas/${visitaId}`,
                visitaData
            );
            
            const seguimientoActualizado = response.data.seguimiento || response.data;
            
            set(state => ({
                seguimientos: state.seguimientos.map(seg => 
                    seg._id === seguimientoId ? seguimientoActualizado : seg
                ),
                seguimientosFiltrados: state.seguimientosFiltrados.map(seg => 
                    seg._id === seguimientoId ? seguimientoActualizado : seg
                ),
                isLoading: false 
            }));
            
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al actualizar visita';
            set({ error: errorMessage, isLoading: false });
            throw error;
        }
    },

    eliminarVisita: async (seguimientoId, visitaId) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.delete(
                `${API_BASE_URL}${API_PREFIX}/seguimientos/${seguimientoId}/visitas/${visitaId}`
            );
            
            const seguimientoActualizado = response.data.seguimiento || response.data;
            
            set(state => ({
                seguimientos: state.seguimientos.map(seg => 
                    seg._id === seguimientoId ? seguimientoActualizado : seg
                ),
                seguimientosFiltrados: state.seguimientosFiltrados.map(seg => 
                    seg._id === seguimientoId ? seguimientoActualizado : seg
                ),
                isLoading: false 
            }));
            
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al eliminar visita';
            set({ error: errorMessage, isLoading: false });
            throw error;
        }
    },

    obtenerVisitasPorEstado: async (estado) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.get(
                `${API_BASE_URL}${API_PREFIX}/seguimientos/visitas/estado`,
                { params: { estado } }
            );
            
            set({ isLoading: false });
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Error al obtener visitas';
            set({ error: errorMessage, isLoading: false });
            throw error;
        }
    },

    clearError: () => set({ error: null }),
    
    resetCreationState: () => {
        set({ 
            isSeguimientoCreated: false,
            seguimientoData: null,
            error: null
        });
    }
}));