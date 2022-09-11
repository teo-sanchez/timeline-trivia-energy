import { useState, useContext, useRef, useEffect } from 'react';
import { CardsJsonContext, OptionsContext, TimelineContextState, TimelineContextUpdater } from '../App';
import styled from 'styled-components';
import classNames from 'classnames';
import { colorVariables, Icon } from './BaseComponents';
import Card from './Card';
import FakeCard from './FakeCard';
import useMouse from '../hooks/useMouse';
import { useScroll } from 'react-use';

const TimelineStyledComponent = styled.div`
  position: absolute;
  z-index: 100;
  left: 10vw;
  bottom: 20px;
  width: calc(80vw - 40px);
  height: 240px;
  padding: 20px;
  border: 1px solid ${colorVariables.light_darker};
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  scroll-behavior: smooth;

  &::-webkit-scrollbar-track {
    height: 0px;
  }

  &.dark {
    border: 1px solid ${colorVariables.darker_darkest};
  }
`;

const TimelineControls = styled.div`
  position: absolute;
  z-index: 200;
  left: 10vw;
  bottom: 20px;
  width: calc(80vw - 40px);
  height: 240px;
  padding: 20px;
`;

const ArrowMove = styled.div`
  position: absolute;
  top: 0;
  width: 200px;
  height: 100%;
  user-select: none;
  cursor: pointer;

  span.material-symbols-outlined {
    position: absolute;
    line-height: 280px;
    color: ${colorVariables.lightest};
    font-size: 36px;
  }

  &.left {
    left: 0;
    background: linear-gradient(90deg, rgba(26,26,26,0.2) 0%, rgba(26,26,26,0) 100%);

    span.material-symbols-outlined {
      left: 20px;
    }
  }

  &.right {
    right: 0;
    background: linear-gradient(90deg, rgba(26,26,26,0.0) 0%, rgba(26,26,26,0.2) 100%);

    span.material-symbols-outlined {
      right: 20px;
    }
  }

  &.dark {
    // darker gradient (0.5 opacity instead of 0.2)
    &.left {
      background: linear-gradient(90deg, rgba(26,26,26,0.5) 0%, rgba(26,26,26,0) 100%);
    }

    &.right {
      background: linear-gradient(90deg, rgba(26,26,26,0.0) 0%, rgba(26,26,26,0.5) 100%);
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

  const showArrows = () => {
    let arrows = [];

    if (timelineScrollX > 0) {
      arrows.push('left');
    }

    if (timelineRef.current !== null) {
      const contentDoesNotFit = timelineRef.current.scrollWidth - 20 > window.innerWidth*0.8 + timelineScrollX;
      console.log(timelineRef.current.offsetWidth);

      if (contentDoesNotFit) {
        arrows.push('right');
      }
    }

    return arrows;
  };

  const scrollTimeline = (change) => {
    const currentScroll = timelineRef.current.scrollLeft;
    const newScroll = currentScroll + change;
    timelineRef.current.scrollLeft = newScroll;
  }

  const scrollLeft = () => {
    scrollTimeline(-200);
  }

  const scrollRight = () => {
    scrollTimeline(200);
  }

  return (
    <div>
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

      <TimelineControls>
        { showArrows().includes('left') && (
          <ArrowMove
            className={classNames("left", {
              'dark': options.dark_mode
            })}
            onClick={scrollLeft}
          >
            <Icon>arrow_back</Icon>
          </ArrowMove>
        )}

        { showArrows().includes('right') && (
          <ArrowMove
            className={classNames("right", {
              'dark': options.dark_mode
            })}
            onClick={scrollRight}
          >
            <Icon>arrow_forward</Icon>
          </ArrowMove>
        )}
      </TimelineControls>
    </div>
  );
}
 
export default Timeline;