import styled from 'styled-components';
import classNames from 'classnames';
import { colorVariables } from './BaseComponents';

const CardStyledComponent = styled.div`
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
`;

const Card = ({ title, description, image, question, correct_answer, answer, placed }) => {
  return (
    <CardStyledComponent>
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