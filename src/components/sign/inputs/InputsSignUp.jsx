import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { Container } from "./style";

export default function InputsSignUp(){
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const url = `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/sign-up`;
  function cadastro(e){
    e.preventDefault();
    if(password !== confirmPassword){
      alert("As senhas devem ser iguais")
      return;
    }
    const body = {username: name, email, password};
    axios.post(url, body)
      .then(() => navigate('/'))
      .catch((err) =>{
        if(err.response.status === 409){
          alert("e-mail já cadastrado! Por favor, faça login")
        }
        else if(err.response.status === 400){
          alert("Verifique se email é válido e a senha deve ter no minino 6 caracteres, 1 letra maiuscula, 1 letra minuscula, 1 simbolo e numero")
        }
        else{
          alert("um erro inesperado ocorreu! Favor tentar novamente")
        }
      })
  }
  return (
    <Container>
      <form onSubmit={cadastro}>
        <input 
          placeholder="Nome"
          type="text" 
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
        <input
          placeholder="E-mail" 
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input 
          placeholder="Senha" 
          type="password" 
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <input 
          placeholder="Confirme a senha" 
          type="password" 
          id="confirmPassword"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        <button>Cadastrar</button>
      </form>

      <Link to={"/"}>
        Já tem uma conta? Entre agora!
      </Link>
    </Container>
  )
}