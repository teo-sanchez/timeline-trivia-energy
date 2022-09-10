import { useState, useContext, useRef, useEffect } from 'react';
import { CardsJsonContext, OptionsContext, TimelineContextState, TimelineContextUpdater } from '../App';
import styled from 'styled-components';
import classNames from 'classnames';
import { colorVariables } from './BaseComponents';
import Card from './Card';
import FakeCard from './FakeCard';
import useMouse from '../hooks/useMouse';
import { useScroll } from 'react-use';

const TimelineStyledComponent = styled.div`
  position: absolute;
  left: 10vw;
  bottom: 20px;
  width: calc(80vw - 40px);
  height: 240px;
  padding: 20px;
  border: 1px solid ${colorVariables.light_darker};
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;

  &::-webkit-scrollbar-thumb {
    background-color: ${colorVariables.light_darker};
    border: 1px solid ${colorVariables.light_darkest};
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: ${colorVariables.light_darkest};
  }

  &.dark {
    border: 1px solid ${colorVariables.darker_darkest};

    &::-webkit-scrollbar-thumb {
      background-color: ${colorVariables.darkest};
      border: 1px solid ${colorVariables.darker_darkest};
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: ${colorVariables.darker_darkest};
    }
  }
`;

const Timeline = ({ mouseOverTimeline, setMouseOverTimeline, setTimelineMouseX }) => {
  const options = useContext(OptionsContext);
  const cardsJson = useContext(CardsJsonContext);
  const [timelineState, setTimelineState] = [useContext(TimelineContextState), useContext(TimelineContextUpdater)];

  // add a random card to the timeline if there aren't any
  useEffect(() => {
    if (timelineState.length < 1) {
      const randomCard = cardsJson[Math.floor(Math.random() * cardsJson.length)];

      setTimelineState([
        ...timelineState,
        {
          id: timelineState.length,
          properties: {
            ...randomCard
          },
          placed_correctly: true
        }
      ]);
    }
  }, [timelineState]);

  const timelineRef = useRef(null);
  const mousePos = useMouse();

  /* onMouseOver cannot be used as the user is already hovering over a card,
     therefore we need to catch the correct position manually */
  const getTimelinePosition = () => {
    return {
      x: timelineRef.current.offsetLeft,
      y: timelineRef.current.offsetTop
    };
  }

  const getTimelineSize = () => {
    return {
      width: timelineRef.current.offsetWidth,
      height: timelineRef.current.offsetHeight
    };
  }

  // function to check whether a point is inside a rectangle or not
  const pointInRectangle = (pointX, pointY, rectX, rectY, width, height) => {
    if (pointX >= rectX && pointX <= rectX + width) {
      if (pointY >= rectY && pointY <= rectY + height) {
        return true;
      }
    }
    return false;
  }

  // check if cursor is over the timeline on each render
  useEffect(() => {
    const {x: rectX, y: rectY} = getTimelinePosition();
    const {width, height} = getTimelineSize();
    const {x: pointX, y: pointY} = mousePos;
    setMouseOverTimeline(pointInRectangle(pointX, pointY, rectX, rectY, width, height));
  }, [mousePos]);

  // scrolling
  const { x: timelineScrollX } = useScroll(timelineRef);

  useEffect(() => {
    const timelineProperties = {
      start: timelineRef.current.offsetLeft,
      width: timelineRef.current.offsetWidth + timelineScrollX
    };

    const calculatedTimelineMouseX = mousePos.x - timelineProperties.start + timelineScrollX;

    if (calculatedTimelineMouseX >= 0 && calculatedTimelineMouseX <= timelineProperties.width) {
      if (mouseOverTimeline) {
        setTimelineMouseX(calculatedTimelineMouseX);
      }
    }
  }, [mousePos]);

  return (
    <TimelineStyledComponent
      ref={timelineRef}
      className={classNames({
        'dark': options.dark_mode
      })}
    >
      {timelineState.map(card => (
        <Card 
          key={card.id}
          properties={card.properties}
          placed={true}
          placedCorrectly={card.placed_correctly}
        />
      ))}
    </TimelineStyledComponent>
  );
}
 
export default Timeline;