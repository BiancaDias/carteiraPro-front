import { useContext } from "react";
import { Header, HomeContainer } from "./style";
import { User } from "../../context/UserContext";
import { BiExit } from "react-icons/bi"
import Transactions from "../../components/transactions/Transactions";
import { useNavigate } from "react-router-dom";
import ButtonsTransactions from "../../components/buttons/buttonsTransactions/ButtonsTransactions";

export default function HomePage(){
  const { user, setUser } = useContext(User);
  const navigate = useNavigate();

  function logOut() {
    setUser(null);
    localStorage.setItem("user", JSON.stringify({}));
    navigate('/')
  }
  return(
    <HomeContainer>
      <Header>
        <h1>Olá, {user.name}</h1>
        <BiExit onClick={logOut} />
      </Header>
      <Transactions/>
      <ButtonsTransactions/>
    </HomeContainer>
  )
}
