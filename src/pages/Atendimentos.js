import React, { useEffect, useState } from 'react';
import api from '../api'; 
import './Atendimento.css';
import '../styles/global.css';
import Modal from './Modals/Modal';
import UpdateModal from './Modals/UpdateModal';  
import { FaEye } from 'react-icons/fa';

function Atendimentos() {
    const [atendimentos, setAtendimentos] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);  
    const [selectedAtendimento, setSelectedAtendimento] = useState(null);  

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

    const handleOpenUpdateModal = (atendimento) => {
        setSelectedAtendimento(atendimento);
        setUpdateModalOpen(true);
    };

    const handleCloseUpdateModal = () => {
        setUpdateModalOpen(false);
        setSelectedAtendimento(null);
    };

    const handleDelete = (id) => {
        api.delete(`http://localhost:8000/api/atendimentos/${id}`)
        .then(() => {
            setAtendimentos(atendimentos.filter(atendimento => atendimento.id !== id));
            console.log("Atendimento Deletado com sucesso");
        })
        .catch(error => {
            console.error('Erro ao deletar Atendimento', error);
        });
    };

    return (
        
        <div className='atendimento-container'>
            <h1>Registros</h1>
            <table className="atendimento-table">
                <thead>
                    <tr>
                        <th>Feito em</th>
                        <th>Unidade</th>
                        <th>Quantidade</th>
                        <th>Serviço</th>
                        <th>Colaborador</th>
                        <th>Comentário</th>
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
                            <td className="atendimento-actions">
                                <div className="tooltip">
                                    <FaEye className="icon-eye" />
                                    <div className="tooltiptext">{atendimento.comentarios}</div>
                                </div>
                            </td>
                            <td className="action-buttons">
                                <button className='btn-edit' onClick={() => handleOpenUpdateModal(atendimento)}>Editar</button>
                                <button className="btn-danger" onClick={() => handleDelete(atendimento.id)}>Apagar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className='btn-create' onClick={handleOpenModal}>Registrar Atendimento</button>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} />

            {selectedAtendimento && (
                <UpdateModal 
                    isOpen={isUpdateModalOpen} 
                    onClose={handleCloseUpdateModal} 
                    atendimentoData={selectedAtendimento} 
                />
            )}
        </div>
    );
}

export default Atendimentos;
