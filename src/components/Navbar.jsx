import { colorVariables, Icon } from './BaseComponents';
import styled from 'styled-components';

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
`;

const Navbar = () => {
  return (
    <NavbarStyledComponent>
      <NavbarSection>
        <Icon>
          menu
        </Icon>
      </NavbarSection>

      <NavbarSection>
        Timeline Trivia
      </NavbarSection>
    </NavbarStyledComponent>
  );
}
 
export default Navbar;