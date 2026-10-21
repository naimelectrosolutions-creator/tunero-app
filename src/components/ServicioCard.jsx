function ServicioCard({ servicio, onClick }) {
  const formatoPrecio = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });

  return (
    <button
      onClick={onClick}
      className="w-full text-left bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md hover:border-glow-pink-light transition-all flex gap-4 items-start"
    >
      {/* Imagen */}
      <div className="flex-shrink-0 w-24 h-24 rounded-xl bg-gray-100 overflow-hidden flex items-center justify-center">
        {servicio.imagen_url ? (
          <img
            src={servicio.imagen_url}
            alt={servicio.nombre}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-3xl text-gray-300">💅</span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-gray-800">
          {servicio.nombre}
        </h3>
        <p className="text-glow-pink font-semibold text-base mt-1">
          {formatoPrecio.format(servicio.precio)}
        </p>
        <p className="text-gray-500 text-sm mt-1">
          {servicio.duracion_minutos} min
        </p>
        {servicio.descripcion && (
          <p className="text-gray-600 text-sm mt-3 leading-relaxed line-clamp-2">
            {servicio.descripcion}
          </p>
        )}
      </div>
    </button>
  );
}

export default ServicioCard;