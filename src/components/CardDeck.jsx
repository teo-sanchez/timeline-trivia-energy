import styled from 'styled-components';
import classNames from 'classnames';
import { useContext } from 'react';
import { OptionsContext, CardsJsonContext } from '../App';
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
                    score, setScore, setGameover, currentIndex, setCurrentIndex }) => {
  const options = useContext(OptionsContext);
  const shuffledDeck = useContext(CardsJsonContext);

  const drawNextCard = () => {
    if (currentIndex < shuffledDeck.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setGameover(true);
    }
  };

  return (
    <CardDeckStyledComponent
      className={classNames({
        'dark': options.dark_mode
      })}
    >
      {currentIndex < shuffledDeck.length ? (
        <Card
          cardData={shuffledDeck[currentIndex]}
          drawNextCard={drawNextCard}
          mouseOverTimeline={mouseOverTimeline}
          setHoldingCard={setHoldingCard}
          timelineMouseX={timelineMouseX}
          health={health}
          setHealth={setHealth}
          score={score}
          setScore={setScore}
        />
      ) : (
        <p>No more cards!</p>
      )}
    </CardDeckStyledComponent>
  );
}
 
export default CardDeck;
