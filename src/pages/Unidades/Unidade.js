import React, { useEffect, useState } from "react";
import api from "../../api";
import '../../styles/global.css';
import './Unidade.css';
import Modal from "./ModalUnidades/Modal";
import ModalUpdate from "./ModalUnidades/ModalUpdate";

function Unidades() {
  const [unidades, setUnidades] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);

  useEffect(() => {
    api.get('http://localhost:8000/api/unidades')
      .then(response => {
        setUnidades(response.data);
      })
      .catch(error => {
        console.error('Erro ao buscar as Unidades:', error);
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
    api.delete(`http://localhost:8000/api/unidades/${id}`)
      .then(() => {
        setUnidades(unidades.filter(unidade => unidade.id !== id));
        console.log('Serviço deletado com sucesso');
      })
      .catch(error => {
        console.error('Erro ao deletar serviço:', error);
      });
  };

  return (
    <div className="unidade-block">
      <h1>Unidades Existentes</h1>
      <table>
        <thead>
          <tr className="tr">
            <th>Unidades</th>
            <th>Inaugurada em</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {unidades.map((unidade) => (
            <tr key={unidade.id}>
              <td>{unidade.name}</td>
              <td>{unidade.inaugural_date}</td>
              <td>
                <button
                  className='btn-edit'
                  onClick={() => handleOpenUpdateModal(unidade.id)} // Chama a função para abrir o modal de atualização
                >
                  Editar
                </button>
                <button
                  className="btn-danger"
                  onClick={() => handleDelete(unidade.id)}
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

export default Unidades;
