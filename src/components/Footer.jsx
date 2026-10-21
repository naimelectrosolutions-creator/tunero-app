function Footer({ config }) {
  if (!config) return null;

  const tieneDatos = config.telefono || config.email || config.instagram || config.direccion;
  if (!tieneDatos) return null;

  return (
    <footer className="border-t border-gray-100 px-6 py-6 mt-12">
      <div className="max-w-2xl mx-auto flex flex-wrap gap-4 justify-center text-sm text-gray-500">
        {config.telefono && (
          <a
            href={`https://wa.me/${config.telefono.replace(/\D/g, '')}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-pink-500 transition-colors"
          >
            📞 {config.telefono}
          </a>
        )}
        {config.email && (
          <a
            href={`mailto:${config.email}`}
            className="hover:text-pink-500 transition-colors"
          >
            ✉️ {config.email}
          </a>
        )}
        {config.instagram && (
          <a
            href={`https://instagram.com/${config.instagram.replace('@', '')}`}
            target="_blank"
            rel="noreferrer"
            className="hover:text-pink-500 transition-colors"
          >
            📷 {config.instagram}
          </a>
        )}
        {config.direccion && (
          <span>📍 {config.direccion}</span>
        )}
      </div>
    </footer>
  );
}

export default Footer;