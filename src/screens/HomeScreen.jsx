export default function HomeScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">Turnero</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        Gestioná tu agenda, servicios y clientes de forma fácil y rápida.
      </p>
      
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 max-w-md w-full">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">¿Ya tenés una cuenta?</h2>
        <p className="text-sm text-gray-500 mb-6">
          Ingresá a tu link personal para gestionar tu negocio o reservar un turno.
        </p>
        <a 
          href="/naim-villafae" 
          className="inline-block w-full bg-glow-pink text-white px-6 py-3 rounded-xl font-medium hover:bg-glow-pink-dark transition"
        >
          Entrar a un panel de prueba
        </a>
      </div>
    </div>
  );
}