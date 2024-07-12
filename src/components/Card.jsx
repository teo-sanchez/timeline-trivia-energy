import styled from 'styled-components';
import classNames from 'classnames';
import { useContext, useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';
import { OptionsContext, TimelineContextState, TimelineContextUpdater, CardsJsonContext } from '../App';
import { colorVariables } from './BaseComponents';
import useMouse from '../hooks/useMouse';

const CardStyledComponent = styled.div`
  display: inline-block;
  width: 160px;
  height: 240px;
  background-color: ${colorVariables.lightest};
  border: 1px solid ${colorVariables.light_darker};
  border-radius: 4px;
  user-select: none;
  white-space: normal;

  .card-header, .image, .card-footer {
    width: 100%;
    box-sizing: border-box;
    
    &:not(:last-of-type) {
      border-bottom: 1px solid ${colorVariables.light_darker};
    }
  }

  .card-header {
    height: 90px;
    padding: 10px;

    h2 {
      font-size: 14px;
      color: ${colorVariables.darker_darkest};
    }

    p {
      font-size: 12px;
      color: ${colorVariables.dark};
    }
  }

  .image {
    height: 120px;
    background-size: cover;
  }

  .card-footer {
    height: 30px;
    line-height: 30px;
    background-color: ${colorVariables.primary};
    border-radius: 0 0 4px 4px;
    text-align: center;
    color: ${colorVariables.lightest};
    font-size: 14px;
    font-weight: 500;

    &.correct {
      background-color: ${colorVariables.green};
    }

    &.incorrect {
      background-color: ${colorVariables.red};
    }
  }

  &.dark {
    background-color: ${colorVariables.dark};
    border: 1px solid ${colorVariables.darker_darkest};

    .card-header, .image, .card-footer {
      h2, p {
        color: ${colorVariables.light};
      }

      &:not(:last-of-type) {
        border-bottom: 1px solid ${colorVariables.darker_darkest};
      }
    }
  }

  &.movable-card {
    position: absolute;
    z-index: 1000;
    cursor: grab;
  }

  &:not(:first-of-type) {
    margin-left: 20px;
  }

  &:last-of-type {
    margin-right: 180px;
  }
`;

const Card = ({ deckRef, mouseOverTimeline, setHoldingCard, properties, placed, placedCorrectly,
                timelineMouseX, health, setHealth, score, setScore }) => {
  const options = useContext(OptionsContext);
  const [timelineState, setTimelineState] = [useContext(TimelineContextState), useContext(TimelineContextUpdater)];
  const cardRef = useRef(null);

  const cardsJson = useContext(CardsJsonContext);
  const [cardProperties, setCardProperties] = useState({});

  const getRandomCard = () => {
    const cardIndex = Math.floor(Math.random() * cardsJson.length);
    const newCard = cardsJson[cardIndex];
    // check if selected card is already in the timeline; we don't want that
    const alreadyExists = timelineState.some(card => card.properties.title === newCard.title);

    if (!alreadyExists) {
      return newCard;
    } else {
      // if the card already exists, pick a new one
      return getRandomCard();
    }
  }

  // set card properties
  const setProperties = (defaultProperties) => {
    // if no properties are set, set to random card
    if (defaultProperties === undefined) {
      const randomCard = getRandomCard();
      
      /*
        keys:
          type - shown in card footer; can also be used as a question
          title - shown in card header
          description - below title
          answer - used to decide whether the user was correct
          imagelink - link to related image
      */

      setCardProperties({
        ...randomCard
      });
    } else {
      setCardProperties({
        ...defaultProperties
      });
    }
  };

  useEffect(() => {
    // if the properties prop is set, set properties accordingly
    if (properties !== undefined) {
      setProperties(properties);
    } else {
      // otherwise set random properties
      setProperties();
    }
  }, []);

  const mousePos = useMouse();
  const [beingMoved, setBeingMoved] = useState(false);
  const [savedMousePos, setSavedMousePos] = useState({x: 0, y: 0});
  const [basePos, setBasePos] = useState({x: 0, y: 0});

  // add current card to the timeline
  const addCardToTimeline = () => {
    // remove card preview
    let cleanTimelineState = timelineState.filter(card => !card.fake);
    setTimelineState(cleanTimelineState);

    const getCorrectPosition = (answer) => {
      const currentAnswers = cleanTimelineState.map(card => card.properties.answer);
      const sortedAnswers = [...currentAnswers, answer].sort((a, b) => a - b);
      return sortedAnswers.indexOf(answer);
    }

    const isPlacedCorrectly = (answer, pos) => {
      return getCorrectPosition(answer) === pos;
    }

    const cardWidth = 180;
    const position = (() => {
      const realPosition = Math.floor(timelineMouseX / cardWidth);

      if (realPosition > timelineState.length-1) {
        return timelineState.length-1;
      } else {
        return realPosition;
      }
    })();

    let newTimelineState = [...timelineState];

    let card = {
      id: timelineState.length,
      properties: { ...cardProperties },
      placed_correctly: isPlacedCorrectly(cardProperties.answer, position)
    };

    // if the card is correct, add 1 to score; otherwise, take 1 heart
    if (card.placed_correctly) {
      setScore(score+1);
    } else {
      setHealth(health);
    }

    // remove placeholder cards
    newTimelineState = newTimelineState.filter(card => !card.fake);

    // insert card to the correct position regardless of answer correctness
    const correctPosition = getCorrectPosition(cardProperties.answer);
    newTimelineState.splice(correctPosition, 0, card);

    // commit changes
    setTimelineState(newTimelineState);
  }

  const moveCard = (x, y) => {
    cardRef.current.style.left = `${x}px`;
    cardRef.current.style.top = `${y}px`;
  }

  // set helping states when the card starts being moved
  const startMoving = () => {
    // check if the card can be held <=> is in the deck
    if (!placed) {
      setBeingMoved(true);
      setHoldingCard(true);
      // save the original mouse and card position
      setSavedMousePos(mousePos);
      setBasePos({x: cardRef.current.offsetLeft, y: cardRef.current.offsetTop});
    }
  }

  // stop movement
  const endMoving = () => {
    if (!placed) {
      setBeingMoved(false);
      setHoldingCard(false);
      if (mouseOverTimeline) {
        // add the moved card to the timeline
        addCardToTimeline();
        // generate new properties
        setProperties();
      }

      // move card back to deck
      moveCard(basePos.x, basePos.y);
    }
  }

  // card movement
  useEffect(() => {
    if (beingMoved && !placed) {
      const change = {
        x: mousePos.x - savedMousePos.x,
        y: mousePos.y - savedMousePos.y
      }

      const currentPos = {
        x: basePos.x + change.x,
        y: basePos.y + change.y
      }

      moveCard(currentPos.x, currentPos.y);
    }
  }, [mousePos]);

  // on window resize, move card back to deck position
  const windowSize = useWindowSize();

  useEffect(() => {
    if (deckRef !== undefined) {
      if (deckRef.current !== null) {
        // calculate card's position in the deck
        const startPos = {
          x: deckRef.current.offsetLeft + 20,
          y: deckRef.current.offsetTop + 20 
        };

        moveCard(startPos.x, startPos.y);
      }
    }
  }, [windowSize]);

  return (
    <CardStyledComponent
      ref={cardRef}
      className={classNames({
        'dark': options.dark_mode,
        'movable-card': !placed
      })}
      onMouseDown={startMoving}
      onMouseUp={endMoving}
    >
      <div className="card-header">
        <h2>{ cardProperties.title }</h2>
        <p>{ cardProperties.description }</p>
      </div>

      <div
        className="image"
        style={{
          backgroundImage: `url(${cardProperties.imagelink})`
        }}>
      </div>

      { /* change the footer's color based on correctness of the answer */ }
      <div
        className={classNames(
          "card-footer", {
            'correct': placed && placedCorrectly,
            'incorrect': placed && !placedCorrectly
          }
        )}
      >
        { /* show either the answer or the question; depends on whether the card is placed */ }
        { placed ? (
          cardProperties.answer
        ) : (
          cardProperties.type
        )}
      </div>
    </CardStyledComponent>
  );
}
 
export default Card;