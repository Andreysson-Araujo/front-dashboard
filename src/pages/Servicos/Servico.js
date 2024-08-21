import React, { useEffect, useState } from "react";
import api from "../../api";
import '../../styles/global.css'
import './Servico.css'
import Modal from "./ModalServices/Modal";

function Servicos() {
  const [servicos, setServicos] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

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

  const handleDelete = (id) => {
    // Fazendo a requisição DELETE para remover o serviço
    api.delete(`http://localhost:8000/api/servicos/${id}`)
      .then(() => {
        // Removendo o serviço do estado local após a exclusão
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
                <button className='btn-edit'>Editar</button>
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
      <button className='create-btn' onClick={handleOpenModal}>Registrar Atendimento</button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
}

export default Servicos;
