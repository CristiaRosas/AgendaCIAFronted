export const PriorityBadge = ({ prioridad = 'media', size = 'md' }) => {
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

// Componente para el selector de prioridad
export const PrioritySelector = ({ value, onChange, name = 'prioridad' }) => {
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