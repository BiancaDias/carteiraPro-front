import { Container } from "./style"
import { useContext, useState } from "react"
import axios from "axios";
import { User } from "../../context/UserContext";

export default function InsertNew({name, open, setOpen}){
  const [newName, setNewName] = useState("")
  const { user } = useContext(User);

  const urlbase = import.meta.env.VITE_REACT_APP_BASE_URL
  const config = { 
    headers: {
      "Authorization": `Bearer ${user.token}`
    }
  }
  function saveNew(e){
    e.preventDefault();
    
    const body = {name: newName}
    console.log(body)
    if(name === "banco"){
      axios.post(`${urlbase}/banks`, body, config)
        .then((e) => setOpen(false))
        .catch((e) => alert(e))
    }else if(name === "tipo"){
      axios.post(`${urlbase}/types`, body, config)
      .then((e) => setOpen(false))
      .catch((e) => alert(e))
    }else{
      alert("Um erro desconhecido aconteceu! tente novamente")
    }
  }

  function close(){
    setOpen(false)
  }
  return(
    <>
      <Container open={open}>
        <h2>Insira o nome do novo {name}</h2>
        <input
          placeholder="name"
          type="text"
          id="name"
          value={newName}
          onChange={e => setNewName(e.target.value)}
          required
        />
        <button type="button" onClick={saveNew}>Salvar</button>
        <button type="button" onClick={close}>Cancelar</button>
      </Container>
    </>
  )
}