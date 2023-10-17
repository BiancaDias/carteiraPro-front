import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { User } from "../../context/UserContext";
import { ButtonAddStyle, Container, Header, TransactionsContainer } from "./style";
import { FaArrowLeft } from 'react-icons/fa';
import Select from "../selectTypes/SelectTypes";
import ButtonAdd from "../buttons/buttomAddNew/ButtonAdd";
import { AiOutlinePlusCircle } from "react-icons/ai"

export default function NewTransaction({type}) {
  
  const { user } = useContext(User);
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("")
  const [banks, setBanks] = useState([])
  const [selectBank, setSelectBank] = useState("")
  const [types, setTypes] = useState([])
  const [selectTypes, setSelectTypes] = useState("")
  const [open, setOpen] = useState(false)
  const [bankOrType, setBankOrType] = useState()
  const navigate = useNavigate()
  const urlbase = import.meta.env.VITE_REACT_APP_BASE_URL
  const config = {
    headers: {
      "Authorization": `Bearer ${user.token}`
    }
  }

  function openNew(open){
    setBankOrType(open)
    setOpen(true)
  }
  console.log(selectBank)
  useEffect(()=>{
    axios.get(`${urlbase}/banks`, config)
      .then((e) => {
        setBanks(e.data)
      })
      .catch((e) =>{
        console.log(e)
      })

    axios.get(`${urlbase}/types`, config)
    .then((e) => {
      setTypes(e.data)
      console.log(e.data)
    })
    .catch((e) =>{
      console.log(e)
    })
  },[open])
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
          <Container>
            <Select name={"banco"} options={banks} select={selectBank} setSelect={setSelectBank}/>
            <ButtonAddStyle onClick={() =>openNew("banco")} type="button"><AiOutlinePlusCircle/></ButtonAddStyle>
            <ButtonAdd open={open} name={bankOrType} setOpen={setOpen}/>
          </Container>
          <Container>
            <Select name={"tipo"} options={types} select={selectTypes} setSelect={setSelectTypes}/>
            <ButtonAddStyle onClick={()=> openNew("tipo")} type="button"><AiOutlinePlusCircle/></ButtonAddStyle>
            <ButtonAdd open={open} name={bankOrType} setOpen={setOpen}/>
          </Container>
        <button type="submit">Salvar {type}</button>
      </form>
    </TransactionsContainer>
  )
}