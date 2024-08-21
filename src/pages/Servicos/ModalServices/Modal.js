import React, { useState } from 'react';
import api from '../../../api';
import '../../../styles/global.css';
import './Modal.css';

function Modal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        name: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Fazendo a requisição POST para criar o novo serviço
        api.post('http://localhost:8000/api/servicos', formData)
            .then(response => {
                console.log('Serviço registrado com sucesso:', response.data);
                onClose(); // Fechar o modal após o envio
                window.location.reload();
            })
            .catch(error => {
                console.error('Erro ao registrar o serviço:', error);
            });
    };

    if (!isOpen) return null;

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <button className='modal-close' onClick={onClose}>X</button>
                <h2 className='create-modal'>Registrar Serviço</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Serviço:</label>
                        <input
                            type="text"
                            name="name"
                            placeholder='Digite o nome do serviço'
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <button className='create-btn' type="submit" >Registrar</button>
                </form>
            </div>
        </div>
    );
}

export default Modal;
