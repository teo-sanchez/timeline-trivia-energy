import styled from 'styled-components';
import classNames from 'classnames';
import { useContext, useEffect, useRef, useState } from 'react';
import { OptionsContext } from '../App';
import { colorVariables } from './BaseComponents';
import useMouse from '../hooks/useMouse';

const CardStyledComponent = styled.div`
  position: absolute;
  width: 160px;
  height: 240px;
  background-color: ${colorVariables.lightest};
  border: 1px solid ${colorVariables.light_darker};
  border-radius: 4px;
  user-select: none;
  cursor: grab;

  .card-header, .image, .card-footer {
    width: 100%;
    box-sizing: border-box;
    
    &:not(:last-of-type) {
      border-bottom: 1px solid ${colorVariables.light_darker};
    }
  }

  .card-header {
    height: 60px;
    padding: 10px;

    h2 {
      font-size: 16px;
      color: ${colorVariables.darker_darkest};
    }

    p {
      font-size: 14px;
      color: ${colorVariables.dark};
    }
  }

  .image {
    height: 150px;
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
`;

const Card = ({ title, description, image, question, correct_answer, answer, placed }) => {
  const options = useContext(OptionsContext);
  const cardRef = useRef(null);

  const mousePos = useMouse();
  const [beingMoved, setBeingMoved] = useState(false);
  const [savedMousePos, setSavedMousePos] = useState({x: 0, y: 0});
  const [basePos, setBasePos] = useState({x: 0, y: 0});

  // set helping states when the card starts being moved
  const startMoving = () => {
    setBeingMoved(true);
    // save the original mouse and card position
    setSavedMousePos(mousePos);
    setBasePos({x: cardRef.current.offsetLeft, y: cardRef.current.offsetTop});
  }

  // stop movement
  const endMoving = () => {
    setBeingMoved(false);
  }

  // card movement
  useEffect(() => {
    if (beingMoved) {
      const change = {
        x: mousePos.x - savedMousePos.x,
        y: mousePos.y - savedMousePos.y
      }

      const currentPos = {
        x: basePos.x + change.x,
        y: basePos.y + change.y
      }

      cardRef.current.style.left = `${currentPos.x}px`;
      cardRef.current.style.top = `${currentPos.y}px`;
    }
  }, [mousePos]);

  return (
    <CardStyledComponent
      ref={cardRef}
      className={classNames({
        'dark': options.dark_mode
      })}
      onMouseDown={startMoving}
      onMouseUp={endMoving}
    >
      <div className="card-header">
        <h2>{ title }</h2>
        <p>{ description }</p>
      </div>

      <div
        className="image"
        style={{
          backgroundImage: `url(${image})`
        }}>
      </div>

      { /* change the footer's color based on correctness of the answer */ }
      <div
        className={classNames(
          "card-footer", {
            'correct': placed && correct_answer,
            'incorrect': placed && !correct_answer
          }
        )}
      >
        { /* show either the answer or the question; depends on whether the card is placed */ }
        { placed ? (
          answer
        ) : (
          question
        )}
      </div>
    </CardStyledComponent>
  );
}
 
export default Card;