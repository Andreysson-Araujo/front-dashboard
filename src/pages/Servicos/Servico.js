import React, { useEffect, useState } from "react";
import api from "../../api";
import '../../styles/global.css';
import './Servico.css';
import Modal from "./ModalServices/Modal";
import ModalUpdate from "./ModalServices/ModalUpdate";

function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  useEffect(() => {
    api.get('http://localhost:8000/api/servicos')
      .then(response => {
        setServicos(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar serviços:', error);
      });
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenUpdateModal = (id) => {
    setSelectedServiceId(id);
    setUpdateModalOpen(true);
  };

  const handleCloseUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedServiceId(null);
  };

  const handleDelete = (id) => {
    api.delete(`http://localhost:8000/api/servicos/${id}`)
      .then(() => {
        setServicos(servicos.filter(servico => servico.id !== id));
        console.log('Serviço deletado com sucesso');
      })
      .catch(error => {
        console.error('Erro ao deletar serviço:', error);
      });
  };

  return (
    <div className="servico-block">
      <h1>Serviços Existentes</h1>
      <table>
        <thead>
          <tr className="tr">
            <th>Serviços</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {servicos.map((servico) => (
            <tr key={servico.id}>
              <td>{servico.name}</td>
              <td>
                <button
                  className='btn-edit'
                  onClick={() => handleOpenUpdateModal(servico.id)} // Chama a função para abrir o modal de atualização
                >
                  Editar
                </button>
                <button
                  className="btn-danger"
                  onClick={() => handleDelete(servico.id)}
                >
                  Apagar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className='create-btn' onClick={handleOpenModal}>Registrar Servico</button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
      <ModalUpdate isOpen={isUpdateModalOpen} onClose={handleCloseUpdateModal} serviceId={selectedServiceId} />
    </div>
  );
}

export default Servicos;
