import { useContext } from 'react';
import styled from "styled-components";
import { colorVariables } from "./BaseComponents";
import { OptionsContext } from "../App";
import classNames from 'classnames';

const FakeCardStyledComponent = styled.div`
  display: inline-block;
  width: 160px;
  height: 240px;
  box-sizing: border-box;
  border: 2px solid ${colorVariables.light_darker};
  border-radius: 4px;
  color: ${colorVariables.light_darker};
  user-select: none;
  vertical-align: top;
  text-align: center;
  line-height: 240px;
  
  &:not(:first-of-type) {
    margin-left: 20px;
  }

  span.material-symbols-outlined {
    font-size: 64px;
    vertical-align: middle;
  }

  &.dark {
    border: 2px solid ${colorVariables.darker_darkest};
    color: ${colorVariables.darker_darkest};
  }
`;

const FakeCard = () => {
  const options = useContext(OptionsContext);

  return (
    <FakeCardStyledComponent
      className={classNames({
        'dark': options.dark_mode
      })}
    >
      <span className="material-symbols-outlined">
        add
      </span>
    </FakeCardStyledComponent>
  );
}
 
export default FakeCard;