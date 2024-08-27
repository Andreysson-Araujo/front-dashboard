import React, { useEffect, useState } from 'react';
import api from '../api'; 
import './Atendimento.css';
import '../styles/global.css';
import Modal from './Modals/Modal';

function Atendimentos() {
    const [atendimentos, setAtendimentos] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        api.get('http://localhost:8000/api/atendimentos')
           .then(response => {
               setAtendimentos(response.data);
           })
           .catch(error => {
               console.error('Erro ao buscar atendimentos:', error);
           });
    }, []);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleDelete = (id) => {
        api.delete(`http://localhost:8000/api/atendimentos/${id}`)
        .then(() => {
            setAtendimentos(atendimentos.filter(atendimento => atendimento.id !== id));
            console.log("Atendimento Deletado com sucesso");
        })
        .catch(error => {
            console.error('Erro ao deletar Atendimento', error)
        });
    };

    return (
        <div className='atendimento-block'>
            <h1>Registros</h1>
            <table>
                <thead>
                    <tr className='tr'>
                        <th>Feito em</th>
                        <th>Unidade</th>
                        <th>Quantidade</th>
                        <th>Serviço</th>
                        <th>Colaborador</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {atendimentos.map((atendimento) => (
                        <tr key={atendimento.id}>
                            <td>{atendimento.date}</td>
                            <td>{atendimento.unidade}</td>
                            <td>{atendimento.qtd}</td>
                            <td>{atendimento.servico}</td>
                            <td>{atendimento.usuario}</td>
                            <td>
                                <button className='btn-edit'>Editar</button>
                                <button className="btn-danger" onClick={() => handleDelete(atendimento.id)}>Apagar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className='create-btn' onClick={handleOpenModal}>Registrar Atendimento</button>

            {/* Modal para registrar atendimento */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
}

export default Atendimentos;
