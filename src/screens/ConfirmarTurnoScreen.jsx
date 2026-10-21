import { useState } from 'react';
import { crearClienta, crearTurno } from '../api/client';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ConfirmarTurnoScreen({ slug, config, servicio, fecha, hora, onVolver, onReservado }) {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [nota, setNota] = useState('');
  const [codigoDescuento, setCodigoDescuento] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [exito, setExito] = useState(false);

  const formatoPrecio = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  });

  const handleReservar = async () => {
    setCargando(true);
    setError(null);
    try {
      // 1. Creamos o buscamos a la clienta por teléfono
      const clienta = await crearClienta(slug, {
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        telefono: '+54' + telefono.trim(),
        email: email.trim() || null,
      });

      const fechaHoraIso = `${fecha}T${hora}:00`;

      // 2. Creamos el turno, enviando el nombre especial para la agenda
      await crearTurno(slug, {
        clienta_id: clienta.id,
        profesional_id: 1,
        fecha_hora_inicio: fechaHoraIso,
        servicio_ids: [servicio.id],
        notas: nota.trim() || null,
        nombre_en_turno: `${nombre.trim()} ${apellido.trim()}`, // ✅ ENVIAMOS EL NOMBRE DEL TURNO
      });

      setExito(true);
    } catch (e) {
      setError(e.message || 'Error desconocido');
    } finally {
      setCargando(false);
    }
  };

  const puedeReservar =
    !cargando && nombre.trim() && apellido.trim() && telefono.trim();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header config={config} />

      <main className="max-w-2xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Confirmar turno
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Completá tus datos para confirmar la reserva.
        </p>

        <div className="bg-gray-100 rounded-2xl p-5 mb-8">
          <p className="text-xs font-bold text-gray-500 uppercase mb-2">Tu reserva</p>
          <p className="text-base font-medium text-gray-800">💅 {servicio.nombre}</p>
          <p className="text-sm text-gray-600 mt-2">📅 {fecha}</p>
          <p className="text-sm text-gray-600">🕐 {hora} hs</p>
          <p className="text-lg font-bold text-glow-pink mt-3">
            {formatoPrecio.format(servicio.precio)}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-glow-pink focus:outline-none transition-colors" placeholder="Tu nombre" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
            <input type="text" value={apellido} onChange={(e) => setApellido(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-glow-pink focus:outline-none transition-colors" placeholder="Tu apellido" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono / WhatsApp</label>
            <div className="flex">
              <span className="px-4 py-3 bg-gray-100 border-2 border-r-0 border-gray-200 rounded-l-xl text-gray-700 font-medium">+54</span>
              <input type="tel" value={telefono} onChange={(e) => setTelefono(e.target.value)} className="flex-1 px-4 py-3 rounded-r-xl border-2 border-gray-200 focus:border-glow-pink focus:outline-none transition-colors" placeholder="3571313747" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-glow-pink focus:outline-none transition-colors" placeholder="tu@email.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nota (opcional)</label>
            <textarea value={nota} onChange={(e) => setNota(e.target.value)} rows={3} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-glow-pink focus:outline-none transition-colors resize-none" placeholder="Alguna indicación para la manicurista" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">¿Tenés un código de descuento?</label>
            <input type="text" value={codigoDescuento} onChange={(e) => setCodigoDescuento(e.target.value)} className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-glow-pink focus:outline-none transition-colors" placeholder="Opcional" />
          </div>
        </div>

        {exito && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mt-6">
            <p className="text-green-700 text-sm font-medium">✅ ¡Turno reservado con éxito!</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-6">
            <p className="text-red-700 text-sm">❌ {error}</p>
          </div>
        )}

        <div className="flex gap-3 mt-8">
          <button onClick={onVolver} className="flex-1 py-3 rounded-2xl border-2 border-gray-200 text-gray-700 font-medium hover:bg-gray-50">Atrás</button>
          <button 
            onClick={handleReservar} 
            disabled={!puedeReservar || exito}
            className={`flex-[2] py-3 rounded-2xl font-medium transition-all ${
              !puedeReservar || exito
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-glow-pink text-white hover:bg-glow-pink-dark'
            }`}
          >
            {exito ? '¡Reservado!' : (cargando ? 'Reservando...' : 'Reservar ahora')}
          </button>
        </div>
      </main>
      <Footer config={config} />
    </div>
  );
}

export default ConfirmarTurnoScreen;