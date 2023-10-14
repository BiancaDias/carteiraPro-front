import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";

export default function InputsignIn(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const url = `${process.env.REACT_APP_API_URL}`;
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
          alert("senha incorreta");
        }
        else if(err.response.status === 404){
          alert("e-mail não cadastrado");
        }
        else if(err.response.status === 422){
          alert("Favor inserir um e-mail valido")
        }
        else{
          alert("Um erro inesperado ocorreu! Favor tentar novamente")
        }
      })
  }
  return (
    <SingInContainer>
      <form onSubmit={login}>
        <MyWalletLogo />
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
    </SingInContainer>
  )
}
