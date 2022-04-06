import styled from "styled-components";

const Section = styled.section`
  font-size: 2rem;
  text-align: left;
  padding: 1.5rem 0 1.5rem 5rem;
`;

const Button = styled.button`
  font-size: 1.4rem;
  margin: 1.5rem 0 1.5rem 5rem;
`;

export default function AccountBalance(props) {
  const buttonText = props.showBalance ? "Hide Balance" : "Show Balance";
  let balance = "*****";

  if (props.showBalance) {
    balance = <>{props.amount}</>;
  }

  return (
    <Section>
      Balance: ${balance}
      <Button onClick={props.handleBalance}>{buttonText}</Button>
    </Section>
  );
}
