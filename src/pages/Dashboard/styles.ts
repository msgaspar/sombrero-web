import styled from 'styled-components';

export const Container = styled.div`
  div {
    box-shadow: none;
    border-radius: 5px;
  }
`;

export const Title = styled.h1`
  font-size: 48px;
  color: #3a3a3a;
`;

export const DashboardPanel = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #fff;

  padding: 20px;
  margin-bottom: 30px;
`;

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  div {
    display: flex;
    align-items: center;

    h1 {
      font-size: 100%;
      margin-right: 7px;
    }
  }
`;

export const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  button {
    background-color: #29bf12;
    color: #fff;
    font-size: 90%;
    border-radius: 5px;
    border: none;
    padding: 10px;
  }
`;
