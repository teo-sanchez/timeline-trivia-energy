import styled from 'styled-components';
import classNames from 'classnames';
import { useContext, useRef } from 'react';
import { OptionsContext } from '../App';
import { colorVariables } from './BaseComponents';
import Card from './Card';

const CardDeckStyledComponent = styled.div`
  width: 160px;
  height: 240px;
  border: 1px solid ${colorVariables.light_darker};
  margin-top: 20px;
  padding: 20px;

  &.dark {
    border: 1px solid ${colorVariables.darker_darkest};
  }
`;

const CardDeck = ({ mouseOverTimeline, timelineMouseX, setHoldingCard }) => {
  const options = useContext(OptionsContext);
  const cardDeckRef = useRef(null);

  return (
    <CardDeckStyledComponent
      ref={cardDeckRef}
      className={classNames({
        'dark': options.dark_mode
      })}
    >
      <Card
        mouseOverTimeline={mouseOverTimeline}
        timelineMouseX={timelineMouseX}
        setHoldingCard={setHoldingCard}
        cardDeckRef={cardDeckRef}
      />
    </CardDeckStyledComponent>
  );
}
 
export default CardDeck;