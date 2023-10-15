import { useNavigate } from "react-router-dom";
import { ListItemContainer, TransactionsContainer, TransactionsContainerEmpty, Value } from "./style";
import { useContext, useEffect, useState } from "react";
import { User } from "../../context/UserContext";
import axios from "axios";
import { sumTotal } from "../../utils/sumTotal";

export default function Transactions(){
  const navigate = useNavigate();
  const { user } = useContext(User);
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0)
  const config = {
    headers: {
      "Authorization": `Bearer ${user.token}`
    }
  }

  useEffect(() => {
    const url = `${import.meta.env.VITE_REACT_APP_BASE_URL}/transactions`
    axios.get(url, config)
      .then(e => {
        console.log(e)
        setTransactions(e.data);
        console.log(sumTotal(e.data))
        setBalance(sumTotal(e.data))
      })
      .catch(e => { 
        if(!user.token){
          navigate('/')
        }
      })
  }, [])
  return(
    <>
      {transactions.length!==0?<TransactionsContainer>
        
        <ul>
          {transactions.map((transactions) =>
            <ListItemContainer key={transactions.id}>
              <div>
                <span>{transactions.date}</span>
                <strong>{transactions.description}</strong>
              </div>
              <Value color={transactions.typebalance === "saida" ? "negativo" : "positivo"}>{parseFloat(transactions.amount / 100).toFixed(2).replace(".", ",")}</Value>
            </ListItemContainer>
          )}

        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={balance < 0 ? "negativo" : "positivo"}>{balance.toFixed(2).replace(".", ",")}</Value>
        </article>
      </TransactionsContainer>:
      <TransactionsContainerEmpty>
        <p>Não há registros de entrada ou saída</p>
      </TransactionsContainerEmpty>}
    </>
  )
}