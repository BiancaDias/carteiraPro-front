import { useContext } from "react";
import { User } from "../context/UserContext";
import axios from "axios";

export function logOut() {
  const { user, setUser } = useContext(User);

  const url = `${process.env.REACT_APP_API_URL}/logout`;
  const body = { token: user.token }
  axios.post(url, body)
    .then(() => {
      setUser(null);
      localStorage.setItem("user", JSON.stringify({}));
      navigate('/')
    })
    .catch((e) => {
      if(!user.token){
        navigate('/')
      }else{
        alert(e.response.status)
      }
    })
}