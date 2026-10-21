function Header({ config }) {
  const nombre = config?.nombre_empresa || 'Mi negocio';
  const profesion = config?.profesion || 'Reservá tu turno online';
  const logo = config?.logo_url;

  return (
    <header className="bg-white border-b border-gray-100 px-6 py-5">
      <div className="flex items-center gap-4">
        {/* Logo o fallback */}
        {logo ? (
          <img
            src={logo}
            alt={nombre}
            className="w-14 h-14 rounded-full object-cover border-2 border-gray-100"
          />
        ) : (
          <div className="w-14 h-14 rounded-full bg-pink-100 flex items-center justify-center text-2xl">
            💅
          </div>
        )}

        {/* Nombre + profesión */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 leading-tight">
            {nombre}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {profesion}
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;