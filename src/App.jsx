import styled from "styled-components"
import SignupPage from "./pages/signupPage/SignupPage"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignInPage from "./pages/signinPage/SigninPage"
import UserProvider from "./context/UserContext"
import HomePage from "./pages/homePage/HomePage"
import TransactionPage from "./pages/transactionPage/TransactionPage"

export default function App() {

  return (
    <PagesContainer>
      <BrowserRouter>
        <UserProvider>
        <Routes>
          <Route path="/" element={<SignInPage/>} />
          <Route path="/cadastro" element={<SignupPage/>} />
          <Route path="/home" element={<HomePage/>} />
          <Route path="/nova-transacao/:type" element={<TransactionPage/>} />
        </Routes>
        </UserProvider>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #00008B;
  width: calc(100vw - 50px);
  height: calc(100vh - 50px);
  padding: 25px;
`
