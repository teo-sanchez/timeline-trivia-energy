import styled from 'styled-components';
import classNames from 'classnames';
import { useContext } from 'react';
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

const CardDeck = ({ mouseOverTimeline, setHoldingCard, timelineMouseX, health, setHealth,
                    score, setScore }) => {
  const options = useContext(OptionsContext);

  return (
    <CardDeckStyledComponent
      className={classNames({
        'dark': options.dark_mode
      })}
    >
      <Card
        mouseOverTimeline={mouseOverTimeline}
        setHoldingCard={setHoldingCard}
        timelineMouseX={timelineMouseX}
        health={health}
        setHealth={setHealth}
        score={score}
        setScore={setScore}
      />
    </CardDeckStyledComponent>
  );
}
 
export default CardDeck;