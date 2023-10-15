import { Link } from "react-router-dom";
import { ButtonsContainer } from "./style";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"

export default function ButtonsTransactions(){
  return(
    <ButtonsContainer>
      <Link to={"/nova-transacao/entrada"}>
        <button>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
      </Link>
      <Link to={"/nova-transacao/saida"}>
        <button>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </Link>
    </ButtonsContainer>
  )
}