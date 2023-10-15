import { useParams } from "react-router-dom"
import NewTransaction from "../../components/newTransactions/NewTransactions";

export default function TransactionPage(){

  const { type } = useParams();
  return(<NewTransaction type={type}/>)
}