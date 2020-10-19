import React, { useState } from 'react';

import ModalAddClub from '../../components/ModalAddClub';
import ClubsTable from '../../components/ClubsTable';

import {
  Container,
  DashboardPanel,
  StatusContainer,
  OptionsContainer,
} from './styles';

const Dashboard: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  function toggleModal(): void {
    setModalOpen(!modalOpen);
  }

  return (
    <Container>
      <ModalAddClub isOpen={modalOpen} setIsOpen={toggleModal} />

      <DashboardPanel>
        <StatusContainer>
          <p>oi</p>
        </StatusContainer>
        <OptionsContainer>
          <button type="button" onClick={toggleModal}>
            Adicionar time
          </button>
        </OptionsContainer>
      </DashboardPanel>
      <ClubsTable />
    </Container>
  );
};

export default Dashboard;
