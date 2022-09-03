import { colorVariables, Button, Icon } from './BaseComponents';
import Healthbar from './Healthbar';
import styled from 'styled-components';

// styled components
const NavbarStyledComponent = styled.nav`
  width: 100vw;
  height: 60px;
  background-color: ${colorVariables.darkest};
  border-bottom: 1px solid ${colorVariables.darker_darkest};
  user-select: none;
`;

const NavbarSection = styled.nav`
  display: inline-block;
  width: fit-content;
  box-sizing: border-box;
  line-height: 60px;
  font-size: 24px;
  padding-left: 20px;

  &.clickable:hover {
    background-color: ${colorVariables.darker_darkest};
  }

  &.divided-right {
    border-right: 1px solid ${colorVariables.darker_darkest};
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
const Navbar = () => {
  return (
    <NavbarStyledComponent>
      <NavbarSection className="clickable divided-right">
        <Icon>
          menu
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