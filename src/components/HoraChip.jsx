function HoraChip({ hora, seleccionado, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-shrink-0 px-6 py-3 rounded-2xl border-2 transition-all font-medium
        ${seleccionado
          ? 'bg-glow-pink-light border-glow-pink text-gray-900'
          : 'bg-white border-gray-200 text-gray-700 hover:border-glow-pink-light'
        }
      `}
    >
      {hora}
    </button>
  );
}

export default HoraChip;