import { colorVariables, Icon } from './BaseComponents';
import { useContext } from 'react';
import { OptionsContext } from '../App';
import Healthbar from './Healthbar';
import styled from 'styled-components';
import classNames from 'classnames';

// styled components
const NavbarStyledComponent = styled.nav`
  width: 100vw;
  height: 60px;
  background-color: ${colorVariables.light};
  border-bottom: 1px solid ${colorVariables.light_darker};
  color: ${colorVariables.dark};
  user-select: none;

  &.dark {
    background-color: ${colorVariables.darkest};
    border-bottom: 1px solid ${colorVariables.darker_darkest};
    color: ${colorVariables.light};
  }
`;

const NavbarSection = styled.div`
  display: inline-block;
  width: fit-content;
  box-sizing: border-box;
  line-height: 60px;
  font-size: 24px;
  padding-left: 20px;

  &.clickable:hover {
    background-color: ${colorVariables.light_darker};
  }

  &.divided-right {
    border-right: 1px solid ${colorVariables.light_darker};
  }

  &.dark {
    &.clickable:hover {
      background-color: ${colorVariables.darker_darkest};
    }

    &.divided-right {
      border-right: 1px solid ${colorVariables.darker_darkest}; 
    }
  }

  &.right {
    padding-left: 0px;
    padding-right: 20px;
  }

  &:first-of-type {
    padding-right: 20px;
  }

  .btn {
    margin-top: 10px;
  }
`;

// navbar component
const Navbar = ({ sidebarOpened, setSidebarOpened }) => {
  const options = useContext(OptionsContext);

  return (
    <NavbarStyledComponent
      className={classNames({
        'dark': options.dark_mode
      })}
    >
      <NavbarSection
        className={classNames(
          'clickable','divided-right', {
            'dark': options.dark_mode
          }
        )}
        onClick={() => setSidebarOpened(!sidebarOpened)}
      >
        <Icon>
          { sidebarOpened ? 'close' : 'menu' }
        </Icon>
      </NavbarSection>

      <NavbarSection>
        Timeline Trivia
      </NavbarSection>

      <NavbarSection className="right">
        <Healthbar />
      </NavbarSection>
    </NavbarStyledComponent>
  );
}
 
export default Navbar;