import { useEffect, useState } from 'react';
import { getDiasDisponibles, getDisponibilidad } from '../api/client';
import DiaChip from '../components/DiaChip';
import HoraChip from '../components/HoraChip';
import Header from '../components/Header';
import Footer from '../components/Footer';

function SeleccionTurnoScreen({ slug, config, servicio, onVolver, onContinuar }) {
  const [dias, setDias] = useState([]);
  const [diaSeleccionado, setDiaSeleccionado] = useState(null);
  const [disponibilidad, setDisponibilidad] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (slug) cargarDias();
  }, [slug]);

  useEffect(() => {
    if (diaSeleccionado && slug) {
      cargarHorarios(diaSeleccionado.fecha);
    }
  }, [diaSeleccionado, slug]);

  const cargarDias = async () => {
    setCargando(true);
    setError(null);
    try {
      const hoy = new Date().toLocaleDateString('en-CA');
      const data = await getDiasDisponibles(slug, hoy, 14);
      setDias(data);

      const hoyDisponible = data.find(d => d.fecha === hoy && d.disponible);
      if (hoyDisponible) setDiaSeleccionado(hoyDisponible);
    } catch (e) {
      setError('Error al cargar días: ' + (e.message || 'desconocido'));
    } finally {
      setCargando(false);
    }
  };

  const cargarHorarios = async (fecha) => {
    setCargando(true);
    setHoraSeleccionada(null);
    try {
      const data = await getDisponibilidad(slug, fecha, servicio.id);
      setDisponibilidad(data);
    } catch (e) {
      setError('Error al cargar horarios: ' + (e.message || 'desconocido'));
    } finally {
      setCargando(false);
    }
  };

  const handleContinuar = () => {
    if (diaSeleccionado && horaSeleccionada) {
      onContinuar(diaSeleccionado.fecha, horaSeleccionada);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header config={config} />

      <main className="max-w-2xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Elegí día y horario
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          💅 {servicio.nombre}
        </p>

        <div className="mb-8">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Día</h3>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {dias.map((dia) => (
              <DiaChip
                key={dia.fecha}
                dia={dia}
                seleccionado={diaSeleccionado?.fecha === dia.fecha}
                onClick={() => dia.disponible && setDiaSeleccionado(dia)}
              />
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Horario</h3>

          {!diaSeleccionado && (
            <p className="text-sm text-gray-500 py-4">
              Seleccioná un día para ver los horarios disponibles.
            </p>
          )}

          {diaSeleccionado && cargando && (
            <div className="flex justify-center py-6">
              <div className="w-8 h-8 border-4 border-glow-pink-light border-t-glow-pink rounded-full animate-spin"></div>
            </div>
          )}

          {diaSeleccionado && !cargando && disponibilidad?.horarios_disponibles?.length === 0 && (
            <p className="text-sm text-gray-500 py-4">
              No hay horarios disponibles para este día.
            </p>
          )}

          {diaSeleccionado && !cargando && disponibilidad?.horarios_disponibles?.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {disponibilidad.horarios_disponibles.map((hora) => (
                <HoraChip
                  key={hora}
                  hora={hora}
                  seleccionado={horaSeleccionada === hora}
                  onClick={() => setHoraSeleccionada(hora)}
                />
              ))}
            </div>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={onVolver}
            className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-700 font-medium hover:bg-gray-50"
          >
            Atrás
          </button>
          <button
            onClick={handleContinuar}
            disabled={!diaSeleccionado || !horaSeleccionada}
            className={`
              flex-[2] py-3 rounded-2xl font-medium transition-all
              ${!diaSeleccionado || !horaSeleccionada
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-glow-pink text-white hover:bg-glow-pink-dark'
              }
            `}
          >
            Continuar
          </button>
        </div>
      </main>

      <Footer config={config} />
    </div>
  );
}

export default SeleccionTurnoScreen;