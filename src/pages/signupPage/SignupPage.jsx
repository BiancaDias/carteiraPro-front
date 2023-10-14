import Logo from "../../components/logo/Logo";
import InputsSignUp from "../../components/sign/inputs/InputsSignUp";
import { Container } from "./style";

export default function SignupPage() {
  return (
    <Container>
      <Logo/>
      <InputsSignUp/>
    </Container>
  )
}