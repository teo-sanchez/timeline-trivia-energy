import styled from 'styled-components';
import { colorVariables } from './BaseComponents';
import Card from './Card';

const CardDeckStyledComponent = styled.div`
  width: 160px;
  height: 240px;
  border: 1px solid ${colorVariables.light_darker};
  margin-top: 20px;
  padding: 20px;
`;

const CardDeck = () => {
  return (
    <CardDeckStyledComponent>
      <Card />
    </CardDeckStyledComponent>
  );
}
 
export default CardDeck;