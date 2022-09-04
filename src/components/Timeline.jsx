import { useState } from 'react';
import styled from 'styled-components';
import { colorVariables } from './BaseComponents';
import Card from './Card';

const TimelineStyledComponent = styled.div`
  position: absolute;
  left: 10vw;
  bottom: 100px;
  width: 80vw;
  height: 240px;
  padding: 20px;
  border: 1px solid ${colorVariables.light_darker};
`;

const Timeline = () => {
  /* create the state in which cards in timeline are located;
     assign a fake card to it */
  const [timelineCards, setTimelineCards] = useState([{
    id: 0,
    title: 'Title',
    description: 'description',
    image: null,
    question: 'created',
    answer: 0,
    correct_answer: true,
    placed: true
  }]);

  return (
    <TimelineStyledComponent>
      {timelineCards.map(card => (
        <Card
          key={card.id}
          title={card.title}
          description={card.description}
          image={card.image}
          question={card.question}
          correct_answer={card.correct_answer}
          answer={card.answer}
          placed={card.placed}
        />
      ))}
    </TimelineStyledComponent>
  );
}
 
export default Timeline;