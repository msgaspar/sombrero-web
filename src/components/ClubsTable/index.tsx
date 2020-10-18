import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';

import { FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import { Container } from './styles';

interface Club {
  id: number;
  nome: string;
  cartoleiro: string;
  pontuacao_atual: number;
  pontuacao_total: number;
  url_escudo_svg: string;
}

const ClubsTable: React.FC = () => {
  const [clubs, setClubs] = useState<Club[]>([]);

  useEffect(() => {
    api.get('/clubs').then(response => {
      setClubs(response.data);
    });
  }, []);

  async function handleDeleteClub(club_id: number): Promise<void> {
    console.log('oi');
    try {
      await api.delete(`/clubs/${club_id}`);

      setClubs(clubs.filter(club => club.id !== club_id));
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <MaterialTable
        columns={[
          {
            title: '',
            field: 'url_escudo_svg',
            width: 30,
            render: rowData => (
              <img
                src={rowData.url_escudo_svg}
                style={{ width: 20, borderRadius: '50%' }}
                alt="escudo"
              />
            ),
          },
          { title: 'Nome', field: 'nome', width: 130 },
          { title: 'Cartoleiro', field: 'cartoleiro', width: 150 },
          {
            title: 'Pontuação na rodada',
            field: 'pontuacao_atual',
            type: 'numeric',
            width: 200,
          },
          {
            title: 'Pontuação total',
            field: 'pontuacao_total',
            type: 'numeric',
            width: 140,
          },

          {
            title: '',
            field: 'delete_club',
            width: 50,

            render: rowData => (
              <button
                type="button"
                className="icon"
                onClick={() => handleDeleteClub(rowData.id)}
              >
                <FiTrash2 />
              </button>
            ),
          },
        ]}
        data={clubs}
        title="Times cadastrados"
        options={{
          tableLayout: 'fixed',
        }}
      />
    </Container>
  );
};

export default ClubsTable;
