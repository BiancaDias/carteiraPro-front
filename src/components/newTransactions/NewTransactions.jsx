import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { User } from "../../context/UserContext";
import { ButtonAddStyle, Container, Header, TransactionsContainer } from "./style";
import { FaArrowLeft } from 'react-icons/fa';
import Select from "../selectTypes/SelectTypes";
import { AiOutlinePlusCircle } from "react-icons/ai"
import InsertNew from "../insertNew/InsertNew";

export default function NewTransaction({type}) {
  
  const { user } = useContext(User);
  const [value, setValue] = useState("R$ 0,00");
  const [description, setDescription] = useState("")
  const [banks, setBanks] = useState([])
  const [bankId, setBankId] = useState("")
  const [types, setTypes] = useState([])
  const [typeId, setTypeId] = useState("")
  const [open, setOpen] = useState(false)
  const [bankOrType, setBankOrType] = useState()
  const navigate = useNavigate()
  const urlbase = import.meta.env.VITE_REACT_APP_BASE_URL
  const config = {
    headers: {
      "Authorization": `Bearer ${user.token}`
    }
  }
  const handleInputChange = (e) => {
    let numericValue = e.target.value.replace(/\D/g, '');
    console.log(numericValue)
    if(numericValue.length === 4 && numericValue[0] === "0"){
      console.log("entra aqui")
      numericValue = numericValue.substring(1);
    }
    if (numericValue.length > 2) {
      const reais = numericValue.slice(0, -2);
      const centavos = numericValue.slice(-2);
      setValue(`R$ ${reais},${centavos}`);
    } else if (numericValue.length > 0) {
      const centavos = numericValue.padStart(2, '0');
      setValue(`R$ 0,${centavos}`);
    } else {
      setValue('R$ 0,00');
    }
  };
  function openNew(open){
    setBankOrType(open)
    setOpen(true)
  }
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
    const amount = Number(value.replace(/\D/g, ''));
    if(amount === 0) alert("O valor precisa ser maior que 0")
    if(bankId === "" || typeId=== "") alert("Selecione o banco e o tipo")

    const numberBank = Number(bankId)
    const numberType = Number(typeId)
    const body = {amount, description, typebalance: type, bankId: numberBank, typeId: numberType}
    axios.post(url, body, config)
      .then(() => navigate("/home"))
      .catch((err) =>{
        console.log(err)
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
          value={value}
          onChange={handleInputChange}
          required
        />
        <input 
          placeholder="Descrição" 
          type="text" 
          id="descricao"
          value={description}
          onChange = {e => setDescription(e.target.value)}
          required
        />
          <Container>
            <Select name={"banco"} options={banks} select={bankId} setSelect={setBankId}/>
            <ButtonAddStyle onClick={() =>openNew("banco")} type="button"><AiOutlinePlusCircle/></ButtonAddStyle>
            <InsertNew open={open} name={bankOrType} setOpen={setOpen}/>
          </Container>
          <Container>
            <Select name={"tipo"} options={types} select={typeId} setSelect={setTypeId}/>
            <ButtonAddStyle onClick={()=> openNew("tipo")} type="button"><AiOutlinePlusCircle/></ButtonAddStyle>
            <InsertNew open={open} name={bankOrType} setOpen={setOpen}/>
          </Container>
        <button onClick={transaction} type="submit">Salvar {type}</button>
      </form>
    </TransactionsContainer>
  )
}