import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importar Routes e Route
import Header from "./componets/header"
import Atendimentos from './pages/Atendimentos'; // Corrigir o caminho se necessário


function App() {
    return (
        <div className="app">
            <Header />
            <div className="content">
                <Routes>
                    <Route path="/" /> {/* Adicione o componente Home ou principal */}
                    <Route path="/pages/Atendimento" element={<Atendimentos />} />
                    <Route path="/outros"  />
                </Routes>
            </div>
        </div>
    );
}

export default App;
