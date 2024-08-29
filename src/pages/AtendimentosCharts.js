// src/pages/AtendimentosChart.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import api from '../api';
import './AtendimentosChart.css';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const AtendimentosChart = () => {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Atendimentos por Unidade',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        api.get('http://localhost:8000/api/atendimentos')
           .then(response => {
               const data = response.data;
               const unidades = [...new Set(data.map(item => item.unidade))];
               const atendimentosPorUnidade = unidades.map(unidade => 
                   data.filter(item => item.unidade === unidade).length
               );

               // Gerar cores distintas
               const backgroundColors = unidades.map((_, index) => 
                   `rgba(${(index * 50) % 255}, ${(index * 100) % 255}, ${(index * 150) % 255}, 0.2)`
               );
               const borderColors = unidades.map((_, index) => 
                   `rgba(${(index * 50) % 255}, ${(index * 100) % 255}, ${(index * 150) % 255}, 1)`
               );

               setChartData({
                   labels: unidades,
                   datasets: [
                       {
                           label: 'Atendimentos por Unidade',
                           data: atendimentosPorUnidade,
                           backgroundColor: backgroundColors,
                           borderColor: borderColors,
                           borderWidth: 1,
                       },
                   ],
               });
           })
           .catch(error => {
               console.error('Erro ao buscar atendimentos:', error);
           });
    }, []);

    return (
        <div className="chart-container">
            <h2>Atendimentos por Unidade</h2>
            <Bar 
                data={chartData} 
                options={{
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: (context) => `${context.dataset.label}: ${context.raw}`,
                            },
                        },
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                        },
                        y: {
                            beginAtZero: true,
                        },
                    },
                }} 
            />
        </div>
    );
};

export default AtendimentosChart;
