import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { User } from "../../context/UserContext";
import { Header, TransactionsContainer } from "./style";
import { FaArrowLeft } from 'react-icons/fa';

export default function NewTransaction({type}) {
  
  const { user } = useContext(User);
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("")
  const [banks, setBanks] = useState("")
  const navigate = useNavigate()
  const urlbase = import.meta.env.VITE_REACT_APP_BASE_URL
  const config = {
    headers: {
      "Authorization": `Bearer ${user.token}`
    }
  }
  useEffect(()=>{
    const url = `${urlbase}/banks`
    axios.get(url, config)
      .then((e) => {
        setBanks(e.data)
        console.log(e.data)
      })
      .catch((e) =>{
        console.log(e)
      })
  },[])
  function goBack(){
    navigate("/home")
  }
  function transaction(e){
    e.preventDefault();
    const url = `${urlbase}/transactions`
    let novoValor = valor;
    if(valor.includes(",")){
      novoValor = valor.replace(",",".")
    }
    const body = {valor:novoValor, descricao, tipo}
    axios.post(url, body, config)
      .then(() => navigate("/home"))
      .catch((err) =>{
        if(err.response.status === 401 || err.response.status === 404){
          alert("Usuario deslogado! Por favor, faça login");
          navigate("/")
        }
        if(err.response.status === 422){
          alert("O valor não é valido! Favor verificar se o valor digitado é positivo");
        }
      })
  }
  return (
    <TransactionsContainer>
      <Header>
        <h1>Nova {type}</h1>
        <FaArrowLeft color="#fff" size={20} onClick={goBack}/>
      </Header>
      <form onSubmit={transaction}>
        <input 
          placeholder="Valor" 
          type="text"
          id="valor"
          value={valor}
          onChange={e => setValor(e.target.value)}
          required
        />
        <input 
          placeholder="Descrição" 
          type="text" 
          id="descricao"
          value={descricao}
          onChange = {e => setDescricao(e.target.value)}
          required
        />
        {/* <div>
          <label htmlFor="bank"> </label>
          <select
            id=""
        </div> */} 
        <button>Salvar {type}</button>
      </form>
    </TransactionsContainer>
  )
}
