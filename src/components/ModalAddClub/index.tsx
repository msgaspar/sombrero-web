import React, { useState, FormEvent } from 'react';

import Modal from '../Modal';
import cartolaApi from '../../services/cartolaApi';

import { Form, Error } from './styles';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

interface ClubData {
  time_id: number;
  nome: string;
  nome_cartola: string;
  url_escudo_svg: string;
}

const ModalAddClub: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
}: IModalProps) => {
  const [searchResults, setSearchResults] = useState<ClubData[]>([]);
  const [newClub, setNewClub] = useState('');
  const [inputError, setInputError] = useState('');

  async function handleAddClub(e: FormEvent<HTMLFormElement>): Promise<void> {
    e.preventDefault();

    if (!newClub) {
      setInputError('Digite o nome do time ou do cartoleiro');
    }

    try {
      const response = await cartolaApi.get<ClubData[]>(
        `times?q=${encodeURIComponent(newClub)}`,
      );

      const clubList = response.data;

      setSearchResults(clubList);
      setNewClub('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca.');
    }
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form hasError={!!inputError} onSubmit={handleAddClub}>
        <input
          value={newClub}
          onChange={e => setNewClub(e.target.value)}
          placeholder="Digite o nome do time"
        />
        <button type="submit">Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <button type="button" onClick={setIsOpen}>
        ok
      </button>
    </Modal>
  );
};

export default ModalAddClub;
