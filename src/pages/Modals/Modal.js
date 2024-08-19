import React, { useEffect, useState } from 'react';
import api from '../../api';
import '../../styles/global.css'
import './Modal.css';

function Modal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        unidade: '',
        servico: '',
        colaborador: '',
        date: '',
    });

    const [unidades, setUnidades]= useState([]);
    const [servicos, setServicos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(()=> {
      api.get('http://localhost:8000/api/unidades')
      .then(response => setUnidades(response.data))
      .catch(error => console.error('Erro ao buscar unidades', error))
    }, []);

    useEffect(()=> {
      api.get('http://localhost:8000/api/servicos')
      .then(response => setServicos(response.data))
      .catch(error => console.error('Erro ao buscar servicos', error))
    }, []);

    useEffect(()=> {
      api.get('http://localhost:8000/api/users')
      .then(response => setUsuarios(response.data))
      .catch(error => console.error('Erro ao buscar usuarios', error))
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para enviar os dados do formulário.
        console.log(formData);
        onClose(); // Fechar o modal após o envio
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                <h2 className='create-modal'>Registrar Atendimento</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Unidade:</label>
                        <select
                          name='unidade'
                          value={formData.unidade}
                          onChange={handleChange}
                        >
                          <option value=''>Selecione a unidade</option>
                          {unidades.map((unidade) => (
                                <option key={unidade.id} value={unidade.id}>
                                    {unidade.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Serviço:</label>
                        <select
                            name="servico"
                            value={formData.servico}
                            onChange={handleChange}
                          >
                            <option value=''>Selecione o servico</option>
                            {servicos.map((servico)=> (
                              <option key={servico.id} value={servico.id}>
                                {servico.name}
                              </option>
                            ))}
                          </select>
                    </div>
                    <div>
                        <label>Colaborador:</label>
                        <select
                            name="usuario"
                            value={formData.usuario}
                            onChange={handleChange}
                          >
                            <option value=''>Colaborador</option>
                            {usuarios.map((usuario)=> (
                              <option key={usuario.id} value={usuario.id}>
                                {usuario.name}
                              </option>
                            ))}
                          </select>
                    </div>
                    <div>
                        <label>Data:</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                    <label>Quantidade</label>
                        <input
                          type='number'
                          name='quantidade'
                        />
                    </div>
                    <div>
                    <label>Comentarios</label>
                    <div>
                        <textarea placeholder='escreva um comentario sobre o serviço'>

                        </textarea>
                    </div>
                    </div>
                    
                    <button className='create-btn' type="submit">Salvar</button>
                </form>
            </div>
        </div>
    );
}

export default Modal;
