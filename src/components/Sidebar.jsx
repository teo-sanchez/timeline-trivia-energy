import styled from 'styled-components';
import { colorVariables } from './BaseComponents';

const SidebarContainer = styled.div`
  position: fixed;
  left: 0;
  top: 60px;
  width: 100vw;
  height: calc(100vh - 60px);
  background-color: rgba(0, 0, 0, 0.5);
`;

const SidebarStyledComponent = styled.div`
  position: fixed;
  left: 0;
  top: 60px;
  width: 350px;
  height: calc(100vh - 60px);
  background-color: ${colorVariables.lighter_darkest};
  border-top: 1px solid ${colorVariables.darker_darkest};
  border-right: 1px solid ${colorVariables.darker_darkest};
`;

const Sidebar = ({ sidebarOpened }) => {
  return (
    <div>
      { sidebarOpened && (
        <SidebarContainer>
          <SidebarStyledComponent>

          </SidebarStyledComponent>
        </SidebarContainer>
      )}
    </div>
  );
}
 
export default Sidebar;