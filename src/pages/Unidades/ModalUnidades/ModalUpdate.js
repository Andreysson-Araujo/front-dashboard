import React, { useState, useEffect } from 'react';
import api from '../../../api';
import '../../../styles/global.css';
import './Modal.css';

function ModalUpdate({ isOpen, onClose, serviceId }) {
  const [formData, setFormData] = useState({
    name: ''
  });

  useEffect(() => {
    if (isOpen && serviceId) {
      // Carregar os dados do serviço a ser editado
      api.get(`http://localhost:8000/api/servicos/${serviceId}`)
        .then(response => {
          setFormData({
            name: response.data.name
          });
        })
        .catch(error => {
          console.error('Erro ao carregar os dados do serviço:', error);
        });
    }
  }, [isOpen, serviceId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fazendo a requisição PUT para atualizar o serviço
    api.put(`http://localhost:8000/api/servicos/${serviceId}`, formData)
      .then(response => {
        console.log('Serviço atualizado com sucesso:', response.data);
        onClose(); // Fechar o modal após a atualização
	      window.location.reload();
      })
      .catch(error => {
        console.error('Erro ao atualizar o serviço:', error);
      });
  };

  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <button className='modal-close' onClick={onClose}>X</button>
        <h2 className='create-modal'>Atualizar Serviço</h2>
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
          <button className='create-btn' type="submit">Atualizar</button>
        </form>
      </div>
    </div>
  );
}

export default ModalUpdate;

