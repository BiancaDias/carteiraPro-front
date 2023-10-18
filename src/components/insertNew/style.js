import styled from "styled-components";

export const ButtonAddStyle = styled.button`
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`

export const Container = styled.div`
  display: ${({open}) => open ? "flex" : "none"};
  width: 80%;
  height: 90%;
  background-color: #FFF;
  border-radius: 5px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 15px;
  flex-direction: column;
  justify-content: center;
  h2{
    font-size: 25px;
    margin-bottom: 25px;
  }
  button{
    margin-top: 15px;
  }
`