import { useContext, useRef, useEffect } from 'react';
import { OptionsContext, TimelineContextState, TimelineContextUpdater } from '../App';
import styled from 'styled-components';
import classNames from 'classnames';
import { colorVariables } from './BaseComponents';
import Card from './Card';
import useMouse from '../hooks/useMouse';

const TimelineStyledComponent = styled.div`
  position: absolute;
  left: 10vw;
  bottom: 20px;
  width: 80vw;
  height: 240px;
  padding: 20px;
  border: 1px solid ${colorVariables.light_darker};

  &.dark {
    border: 1px solid ${colorVariables.darker_darkest};
  }
`;

const Timeline = ({ setMouseOverTimeline }) => {
  const options = useContext(OptionsContext);
  const timelineState = useContext(TimelineContextState);

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
  })

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
          placed={true}
        />
      ))}
    </TimelineStyledComponent>
  );
}
 
export default Timeline;