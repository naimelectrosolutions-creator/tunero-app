function DiaChip({ dia, seleccionado, onClick }) {
  // Parsear la fecha "YYYY-MM-DD"
  const fecha = new Date(dia.fecha + 'T00:00:00');

  const diasSemana = ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'];
  const meses = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];

  const diaSemana = diasSemana[fecha.getDay()];
  const diaNumero = fecha.getDate();
  const mes = meses[fecha.getMonth()];

  return (
    <button
      onClick={onClick}
      disabled={!dia.disponible}
      className={`
        flex-shrink-0 w-16 py-3 rounded-2xl border-2 transition-all
        ${!dia.disponible
          ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed'
          : seleccionado
            ? 'bg-glow-pink-light border-glow-pink text-gray-900'
            : 'bg-white border-gray-200 text-gray-700 hover:border-glow-pink-light'
        }
      `}
    >
      <div className="text-xs font-medium text-gray-500">{diaSemana}</div>
      <div className="text-xl font-bold mt-1">{diaNumero}</div>
      <div className="text-xs text-gray-500">{mes}</div>
    </button>
  );
}

export default DiaChip;
