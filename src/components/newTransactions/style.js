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
export {
  TransactionsContainer,
  Header
}