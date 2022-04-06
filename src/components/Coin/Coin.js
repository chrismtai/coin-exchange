import styled from "styled-components";

const Td = styled.td`
  border: 1px solid #cccccc;
  width: 25vh;
`;

export default function Coin(props) {
  const handleClick = (event) => {
    event.preventDefault();
    props.handleRefresh(props.id);
  };

  return (
    <tr>
      <Td>{props.name}</Td>
      <Td>{props.ticker}</Td>
      <Td>${props.price}</Td>

      {props.showBalance ? <Td>${props.balance}</Td> : <Td>$******</Td>}
      <Td>
        <form action="#" method="POST">
          <button onClick={handleClick}>Refresh</button>
        </form>
      </Td>
    </tr>
  );
}
