import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importar Routes e Route
import Header from "./componets/header"
import Atendimentos from './pages/Atendimentos'; // Corrigir o caminho se necessário
import Servicos from './pages/Servicos/Servico';
import Unidades from './pages/Unidades/Unidade';
import Home from './pages/Home';


function App() {
    return (
        <div className="app">
            <Header />
            <div className="content">
                <Routes>
                <Route path="/" element={<Home />} /> {/* Página inicial */}
                    <Route path="/pages/Atendimento" element={<Atendimentos />} />
                    <Route path="/pages/Unidades" element={<Unidades />} />
                    <Route path="/pages/Servicos"  element={<Servicos />}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
