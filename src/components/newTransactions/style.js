import styled from "styled-components";

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`
const Container = styled.div`
  display: flex;
`
const ButtonAddStyle = styled.button`
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`

export {
  TransactionsContainer,
  Header,
  Container,
  ButtonAddStyle
}
