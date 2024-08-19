/* import React from 'react';
import Header from '../components/header';
import Estadisticas from './Estadisticas';
import Footer from '../components/footer'
import '../styles/home.css';

const home = () => {
    return (
        <div className="home-container">
            <Header />
            <main>
                <Estadisticas/>
            </main>
            <Footer/>
        </div>
    );
}

export default home;
 */

import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Estadisticas from './Estadisticas';
import Footer from '../components/footer';
import '../styles/home.css';

const Home = () => {
    const [competiciones, setCompeticiones] = useState([]);
    const [competicionSeleccionada, setCompeticionSeleccionada] = useState(9);

    useEffect(() => {
        const fetchCompeticiones = async () => {
            const ligas = [
                { id: 9, name: 'Copa America' },
                { id: 4, name: 'Euro Championship' }
            ];
            setCompeticiones(ligas);
        };
        fetchCompeticiones();
    }, []);

    const handleCompeticionChange = (competicionId) => {
        setCompeticionSeleccionada(parseInt(competicionId));
    };

    return (
        <div className="home-container">
            <Header competiciones={competiciones} onCompeticionChange={handleCompeticionChange} />
            <main>
                <Estadisticas competicionSeleccionada={competicionSeleccionada} />
            </main>
            <Footer />
        </div>
    );
}

export default Home;

