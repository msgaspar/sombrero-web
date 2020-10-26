import React, { useState, useEffect } from 'react';

import ModalAddClub from '../../components/ModalAddClub';
import ClubsTable from '../../components/ClubsTable';

import api from '../../services/api';

import {
  Container,
  DashboardPanel,
  StatusContainer,
  OptionsContainer,
} from './styles';

interface Status {
  key: string;
  value: number;
  updated_at: string;
  created_at: Date;
}

const Dashboard: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState<Status>({} as Status);

  useEffect(() => {
    api.get('/status').then(response => {
      setStatus(response.data);
    });
  }, []);

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  return (
    <Container>
      <ModalAddClub isOpen={modalOpen} setIsOpen={toggleModal} />

      <DashboardPanel>
        <StatusContainer>
          <div>
            <h1>Resultados da rodada: </h1>
            <p>{status.value - 1}</p>
          </div>
        </StatusContainer>
        <OptionsContainer>
          <button type="button" onClick={toggleModal}>
            Adicionar time
          </button>
        </OptionsContainer>
      </DashboardPanel>
      {!modalOpen && <ClubsTable />}
    </Container>
  );
};

export default Dashboard;
