import React, { useState, useEffect } from 'react';
import api from '../../../api';
import '../../../styles/global.css';
import './Modal.css';

function ModalUpdate({ isOpen, onClose, unidadeId }) {
  const [formData, setFormData] = useState({
    name: '',
    inaugural_date: '',
  });

  useEffect(() => {
    if (isOpen && unidadeId) {
      // Carregar os dados do serviço a ser editado
      api.get(`http://localhost:8000/api/unidades/${unidadeId}`)
        .then(response => {
          console.log('Dados recebidos:', response.data);
          setFormData({
            name: response.data.name,
            inaugural_date: response.data.inaugural_date
          });
        })
        .catch(error => {
          if (error.response) {
            console.error('Erro ao carregar os dados do serviço:', error.response.data);
          } else if (error.request) {
            console.error('Erro ao enviar a requisição:', error.request);
          } else {
            console.error('Erro', error.message);
          }
        });
    }
  }, [isOpen, unidadeId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('FormData enviado:', formData);

    // Fazendo a requisição PUT para atualizar o serviço
    api.put(`http://localhost:8000/api/unidades/${unidadeId}`, formData)
      .then(response => {
        console.log('Serviço atualizado com sucesso:', response.data);
        onClose(); // Fechar o modal após a atualização
        window.location.reload();
      })
      .catch(error => {
        if (error.response) {
          console.error('Erro ao atualizar o serviço:', error.response.data);
        } else if (error.request) {
          console.error('Erro ao enviar a requisição:', error.request);
        } else {
          console.error('Erro', error.message);
        }
      });
  };

  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <button className='modal-close' onClick={onClose}>X</button>
        <h2 className='create-modal'>Atualizar Unidade</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Unidade:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Inaugurada em:</label>
            <input
              type="date"
              name="inaugural_date"
              value={formData.inaugural_date}
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
