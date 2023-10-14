import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { User } from "../../../context/UserContext";
import { Container } from "./style";

export default function InputsignIn(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(User)
  const navigate = useNavigate();
  const url = `${import.meta.env.VITE_REACT_APP_BASE_URL}/users/sign-in`;
  function login(e){
    e.preventDefault();
    const body = {email, password};
    axios.post(url, body)
      .then((e) => {
        const {token, name} = e.data;
        localStorage.setItem("user", JSON.stringify({token, name}));
        setUser({token, name})
        navigate("/home");
      })
      .catch((err) =>{
        if(err.response.status === 401){
          alert("e-mail ou senha incorretos");
        }
        else{
          alert("Um erro inesperado ocorreu! Favor tentar novamente")
        }
      })
  }
  return (
    <Container>
      <form onSubmit={login}>
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
        <button>Entrar</button>
      </form>

      <Link to={"/cadastro"}>
        Primeira vez? Cadastre-se!
      </Link>
    </Container>
  )
}
