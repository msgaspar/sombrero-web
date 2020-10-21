import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Form = styled.form<FormProps>`
  margin: 20px auto 0;
  max-width: 600px;
  display: flex;

  input {
    flex: 1;
    height: 40px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    border: 2px solid #fff;
    border-right: 0;

    ${props =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 150px;
    height: 40px;
    background: #29bf12;
    border-radius: 0 5px 5px 0;
    border: 0;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#29bf12')};
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 3px;
`;

export const SearchResultsContainer = styled.div`
  height: 500px;
  max-width: 600px;
  margin: 20px auto;

  table {
    margin-top: 40px;
    width: 100%;
  }

  th {
    padding-bottom: 20px;
  }

  td {
    font-size: 90%;
    padding: 7px 0;
  }

  td,
  th {
    text-align: left;
    vertical-align: middle;
  }

  img {
    width: 20px;
  }

  button {
    border: none;
  }
`;
