// src/pages/Home.js
import React from 'react';
import AtendimentosChart from '../componets/AtendimentosCharts';

const Home = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Atendimentos por Unidade</h1>
            <AtendimentosChart />
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f0f4f8',
        color: '#333',
        textAlign: 'center',
    },
    title: {
        fontSize: '2.5rem',
        margin: '0',
        marginBottom: '20px',
    },
};

export default Home;
