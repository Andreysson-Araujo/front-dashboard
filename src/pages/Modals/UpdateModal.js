import React, { useEffect, useState } from 'react';
import api from '../../api';
import '../../styles/global.css';
import './Modal.css';

function UpdateModal({ isOpen, onClose, atendimento }) {
    const [formData, setFormData] = useState({
        unidade_id: '',
        servico_id: '',
        usuario_id: '',
        date: '',
        qtd: '',
        comentarios: ''
    });

    const [unidades, setUnidades] = useState([]);
    const [servicos, setServicos] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        // Carregar as listas de unidades, serviços e usuários
        api.get('http://localhost:8000/api/unidades')
            .then(response => setUnidades(response.data))
            .catch(error => console.error('Erro ao buscar unidades', error));

        api.get('http://localhost:8000/api/servicos')
            .then(response => setServicos(response.data))
            .catch(error => console.error('Erro ao buscar serviços', error));

        api.get('http://localhost:8000/api/users')
            .then(response => setUsuarios(response.data))
            .catch(error => console.error('Erro ao buscar usuários', error));
    }, []);

    useEffect(() => {
        if (atendimento) {
            // Preencher o formulário com os dados do atendimento selecionado
            setFormData({
                unidade_id: atendimento.unidade_id,
                servico_id: atendimento.servico_id,
                usuario_id: atendimento.usuario_id,
                date: atendimento.date,
                qtd: atendimento.qtd,
                comentarios: atendimento.comentarios
            });
        }
    }, [atendimento]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        api.put(`http://localhost:8000/api/atendimentos/${atendimento.id}`, formData)
            .then(response => {
                console.log('Atendimento atualizado com sucesso', response.data);
                onClose(); // Fechar o modal após o sucesso
                window.location.reload();
            })
            .catch(error => {
                console.error('Erro ao atualizar atendimento', error.response.data);
            });
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>X</button>
                <h2 className='create-modal'>Atualizar Atendimento</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Unidade:</label>
                        <select
                            name='unidade_id'
                            value={formData.unidade_id}
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
                            name="servico_id"
                            value={formData.servico_id}
                            onChange={handleChange}
                        >
                            <option value=''>Selecione o serviço</option>
                            {servicos.map((servico) => (
                                <option key={servico.id} value={servico.id}>
                                    {servico.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label>Colaborador:</label>
                        <select
                            name="usuario_id"
                            value={formData.usuario_id}
                            onChange={handleChange}
                        >
                            <option value=''>Selecione o colaborador</option>
                            {usuarios.map((usuario) => (
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
                        <label>Quantidade:</label>
                        <input
                            type='number'
                            name='qtd'
                            value={formData.qtd}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Comentários:</label>
                        <textarea
                            name='comentarios'
                            placeholder='Escreva um comentário sobre o serviço'
                            value={formData.comentarios}
                            onChange={handleChange}
                        />
                    </div>
                    <button className='create-btn' type="submit">Salvar</button>
                </form>
            </div>
        </div>
    );
}

export default UpdateModal;
