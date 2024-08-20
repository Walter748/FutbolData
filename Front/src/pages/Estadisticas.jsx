import { useEffect, useState } from "react";
import '../styles/estadisticas.css'; 

const Estadisticas = ({ competicionSeleccionada }) => {
    const [jugadores, setJugadores] = useState([]);
    const [jugadorSeleccionado, setJugadorSeleccionado] = useState(null);
    const [equipoSeleccionado, setEquipoSeleccionado] = useState(null);
    const [equipos, setEquipos] = useState([]);

    // Equipos para cada competición
    const equiposData = {
        9: [
            { id: 26, nombre: 'Argentina' },
            { id: 1977, nombre: 'Chile' },
            { id: 1717, nombre: 'Canada' },
            { id: 30, nombre: 'Peru' },
            { id: 16, nombre: 'Mexico' },
            { id: 2382, nombre: 'Ecuador' },
            { id: 2379, nombre: 'Venezuela' },
            { id: 1785, nombre: 'Jamaica' },
            { id: 1718, nombre: 'Estados Unidos' },
            { id: 7, nombre: 'Uruguay' },
            { id: 2381, nombre: 'Bolivia' },
            { id: 1781, nombre: 'Panama' },
            { id: 6, nombre: 'Brasil' },
            { id: 8, nombre: 'Colombia' },
            { id: 16941, nombre: 'Paraguay' },
            { id: 29, nombre: 'Costa Rica' }
        ],
        4: [
            { id: 25, nombre: 'Alemania' },
            { id: 15, nombre: 'Suiza' },
            { id: 769, nombre: 'Hungria' },
            { id: 1108, nombre: 'Escocia' },
            { id: 9, nombre: 'España' },
            { id: 768, nombre: 'Italia' },
            { id: 3, nombre: 'Croacia' },
            { id: 778, nombre: 'Albania' },
            { id: 10, nombre: 'Inglaterra' },
            { id: 21, nombre: 'Dinamarca' },
            { id: 1091, nombre: 'Eslovenia' },
            { id: 14, nombre: 'Servia' },
            { id: 775, nombre: 'Austria' },
            { id: 2, nombre: 'Francia' },
            { id: 1118, nombre: 'Paises Bajos' },
            { id: 24, nombre: 'Polonia' },
            { id: 774, nombre: 'Rumania' },
            { id: 1, nombre: 'Belgica' },
            { id: 773, nombre: 'Eslovequia' },
            { id: 772, nombre: 'Ucrania' },
            { id: 27, nombre: 'Portugal' },
            { id: 1104, nombre: 'Georgia' },
            { id: 770, nombre: 'Chequia' }
        ],
    };

    useEffect(() => {
        const fetchJugadores = async () => {
            if (equipoSeleccionado) {
                const url = `https://v3.football.api-sports.io/players?season=2024&league=${competicionSeleccionada}&team=${equipoSeleccionado}`;
                try {
                    const response = await fetch(url, {
                        method: 'GET',
                        headers: {
                            'x-apisports-key': "c7c23ac2199a5e7df2282b84da987986",
                            'x-rapidapi-host': "v3.football.api-sports.io"
                        }
                    });
                    const respuesta = await response.json();
                    setJugadores(respuesta.response);
                    setJugadorSeleccionado(null); 
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };
        fetchJugadores();
    }, [equipoSeleccionado, competicionSeleccionada]);

    useEffect(() => {
        setEquipos(equiposData[competicionSeleccionada] || []);
        setEquipoSeleccionado(null); 
    }, [competicionSeleccionada]);

    const mostrarEstadisticasJugador = (jugador) => {
        setJugadorSeleccionado(jugador);
    };

    const renderEstadisticasJugador = (jugador) => {
        if (!jugador || !jugador.statistics.length) return null;

        const stats = jugador.statistics[0];
        return (
            <ul className="estadisticas-lista">
                <li><strong>Goles:</strong> {stats.goals.total}</li>
                <li><strong>Asistencias:</strong> {stats.goals.assists}</li>
                <li><strong>Pases Totales:</strong> {stats.passes.total}</li>
                <li><strong>Recuperaciones:</strong> {stats.tackles.total}</li>
                <li><strong>Minutos Jugados:</strong> {stats.games.minutes}</li>
            </ul>
        );
    };

    return (
        <div className="container">
            <h1>Estadísticas de Jugadores</h1>

            <div className="contenido">
                <div className="selector-equipo">
                    <h2>Selecciona un Equipo</h2>
                    <ul className="lista-equipos">
                        {equipos.map((equipo) => (
                            <li 
                                key={equipo.id} 
                                className={`equipo-item ${equipo.id === equipoSeleccionado ? 'seleccionado' : ''}`}
                                onClick={() => setEquipoSeleccionado(equipo.id)}
                            >
                                {equipo.nombre}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="jugadores-lista">
                    <h2>Jugadores</h2>
                    <ul className="lista-jugadores">
                        {jugadores.map((jugador) => (
                            <li 
                                key={jugador.player.id} 
                                className={`jugador-item ${jugador.player.id === jugadorSeleccionado?.player.id ? 'seleccionado' : ''}`}
                                onClick={() => mostrarEstadisticasJugador(jugador)}
                            >
                                {jugador.player.name}
                            </li>
                        ))}
                    </ul>
                </div>
                
                {jugadorSeleccionado && (
                    <div className="estadisticas-jugador">
                        <h3>Estadísticas de {jugadorSeleccionado.player.name}</h3>
                        {renderEstadisticasJugador(jugadorSeleccionado)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Estadisticas;
