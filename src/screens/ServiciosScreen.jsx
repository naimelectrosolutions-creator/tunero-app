import { useState, useEffect } from 'react';
import { getServicios } from '../api/client'; // Asegúrate de que esta función exista en tu client.js
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServicioCard from '../components/ServicioCard';

function ServiciosScreen({ slug, config, onServicioSeleccionado }) {
  const [servicios, setServicios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const data = await getServicios(slug);
        setServicios(data);
      } catch (e) {
        setError('Error al cargar los servicios');
      } finally {
        setCargando(false);
      }
    };
    if (slug) cargarServicios();
  }, [slug]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header config={config} />
      
      <main className="max-w-2xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Elegí un servicio
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Seleccioná el servicio que querés reservar.
        </p>

        {cargando && (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-4 border-glow-pink-light border-t-glow-pink rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        {!cargando && !error && (
          <div className="space-y-4">
            {servicios.map((servicio) => (
              <ServicioCard
                key={servicio.id}
                servicio={servicio}
                onClick={() => onServicioSeleccionado(servicio)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer config={config} />
    </div>
  );
}

export default ServiciosScreen;