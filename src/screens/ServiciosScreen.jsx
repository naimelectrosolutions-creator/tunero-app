import { useState } from 'react';
import ServiciosScreen from './ServiciosScreen';
import SeleccionTurnoScreen from './SeleccionTurnoScreen';
import ConfirmarTurnoScreen from './ConfirmarTurnoScreen';

function ReservaScreen({ slug, config }) {
  const [paso, setPaso] = useState(1);
  const [servicioSeleccionado, setServicioSeleccionado] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [horaSeleccionada, setHoraSeleccionada] = useState(null);

  if (paso === 1) {
    return (
      <ServiciosScreen
        slug={slug}
        config={config}
        onServicioSeleccionado={(servicio) => {
          setServicioSeleccionado(servicio);
          setPaso(2);
        }}
      />
    );
  }

  if (paso === 2) {
    return (
      <SeleccionTurnoScreen
        slug={slug}
        config={config}
        servicio={servicioSeleccionado}
        onVolver={() => setPaso(1)}
        onContinuar={(fecha, hora) => {
          setFechaSeleccionada(fecha);
          setHoraSeleccionada(hora);
          setPaso(3);
        }}
      />
    );
  }

  if (paso === 3) {
    return (
      <ConfirmarTurnoScreen
        slug={slug}
        config={config}
        servicio={servicioSeleccionado}
        fecha={fechaSeleccionada}
        hora={horaSeleccionada}
        onVolver={() => setPaso(2)}
      />
    );
  }

  return null;
}

export default ReservaScreen;