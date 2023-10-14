import styled from "styled-components"
import SignupPage from "./pages/signupPage/SignupPage"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import SignInPage from "./pages/signinPage/SigninPage"

export default function App() {

  return (
    <PagesContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage/>} />
          <Route path="/cadastro" element={<SignupPage/>} />
        </Routes>
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
