import { useContext } from "react";
import { Header, HomeContainer } from "./style";
import { User } from "../../context/UserContext";
import { logOut } from "../../utils/logout";
import { BiExit } from "react-icons/bi"
import Transactions from "../../components/transactions/Transactions";

export default function HomePage(){
  const { user, setUser } = useContext(User);
  return(
    <HomeContainer>
      <Header>
        <h1>Olá, {user.name}</h1>
        <BiExit onClick={logOut} />
      </Header>
      <Transactions/>
    </HomeContainer>
  )
}
