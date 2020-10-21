import React, { useState, useEffect, FormEvent } from 'react';

import { FiPlus, FiCheckCircle } from 'react-icons/fi';
import Modal from '../Modal';
import api from '../../services/api';

import { Form, Error, SearchResultsContainer } from './styles';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

interface ClubData {
  time_id: number;
  nome: string;
  nome_cartola: string;
  url_escudo_svg: string;
  isRegistered: boolean;
}

const ModalAddClub: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
}: IModalProps) => {
  const [searchResults, setSearchResults] = useState<ClubData[]>([]);
  const [newClub, setNewClub] = useState('');
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    setSearchResults([]);
    setInputError('');
  }, [isOpen]);

  async function handleSearchClub(
    e: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    e.preventDefault();

    try {
      const response = await api.get<ClubData[]>(
        `/search/?keyword=${encodeURIComponent(newClub)}`,
      );

      const clubList = response.data;

      setSearchResults(clubList);
      setNewClub('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca.');
    }
  }

  async function handleAddClub(club_id: number) {
    try {
      await api.post('/clubs', {
        club_id,
      });

      const updatedSearchResults = [...searchResults];

      const clubIndex = updatedSearchResults.findIndex(
        element => element.time_id === club_id,
      );

      updatedSearchResults[clubIndex].isRegistered = true;

      setSearchResults(updatedSearchResults);
    } catch (err) {
      setInputError('Erro ao adicionar time');
    }
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form hasError={!!inputError} onSubmit={handleSearchClub}>
        <input
          value={newClub}
          onChange={e => setNewClub(e.target.value)}
          placeholder="Digite o nome do time"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}

      <SearchResultsContainer>
        <table>
          {!!searchResults.length && (
            <tr>
              <th colSpan={2}>Time</th>
              <th>Cartoleiro</th>
              <th>&nbsp;</th>
            </tr>
          )}

          {searchResults.map(club => (
            <tr key={club.time_id}>
              <td>
                <img src={club.url_escudo_svg} alt=" " />
              </td>
              <td>{club.nome}</td>
              <td>{club.nome_cartola}</td>
              <td>
                {!club.isRegistered ? (
                  <button type="button">
                    <FiPlus
                      strokeWidth="1.5px"
                      size={22}
                      onClick={() => handleAddClub(club.time_id)}
                    />
                  </button>
                ) : (
                  <button style={{ cursor: 'default' }} type="button">
                    <FiCheckCircle
                      color="#17c74c"
                      size={22}
                      fontWeight="light"
                    />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </table>
      </SearchResultsContainer>

      <button type="button" onClick={setIsOpen}>
        ok
      </button>
    </Modal>
  );
};

export default ModalAddClub;
