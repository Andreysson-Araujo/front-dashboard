import React, { useState } from 'react';
import api from '../../../api';
import '../../../styles/global.css';
import './Modal.css';

function Modal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        inaugural_date: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Extraindo o valor da data manualmente
        const [year, month, day] = formData.inaugural_date.split('-');
    
        // Garantir que a data seja enviada no formato correto, sem fuso horário
        const adjustedData = {
            ...formData,
            inaugural_date: `${year}-${month}-${day}` // Formato correto de data
        };
    
        api.post('http://localhost:8000/api/unidades', adjustedData)
            .then(response => {
                console.log('Unidade registrada com sucesso:', response.data);
                onClose(); // Fechar o modal após o envio
                window.location.reload();
            })
            .catch(error => {
                console.error('Erro ao registrar a unidade:', error);
            });
    };
    
    if (!isOpen) return null;

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <button className='modal-close' onClick={onClose}>X</button>
                <h2 className='create-modal'>Registrar Unidade</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Unidade:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder='Digite o nome da unidade'
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Data inaugural:</label>
                        <input
                            type="date"
                            name="inaugural_date"
                            value={formData.inaugural_date}
                            onChange={handleChange}
                        />
                    </div>
                    <button className='create-btn' type="submit">Registrar</button>
                </form>
            </div>
        </div>
    );
}

export default Modal;
