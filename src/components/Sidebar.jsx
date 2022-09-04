import { colorVariables } from './BaseComponents';
import { useContext } from 'react';
import { OptionsContext } from '../App';
import styled from 'styled-components';
import classNames from 'classnames';

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
  background-color: ${colorVariables.light};
  border-top: 1px solid ${colorVariables.light_darker};
  border-right: none;

  &.dark {
    background-color: ${colorVariables.darkest};
    border-top: 1px solid ${colorVariables.darker_darkest};
    border-right: 1px solid ${colorVariables.darker_darkest};
  }
`;

const SidebarItem = styled.div`
  width: 100%;
  height: 60px;
  border-bottom: 1px solid ${colorVariables.light_darker};
  color: ${colorVariables.dark};
  line-height: 60px;
  user-select: none;

  &:hover {
    background-color: ${colorVariables.primary};
    border-bottom: 1px solid ${colorVariables.primary_darker};
    color: ${colorVariables.light};
    cursor: pointer;

    .icon {
      border-left: 1px solid ${colorVariables.primary_darker} !important;
    }
  }

  &:active {
    background-color: ${colorVariables.primary_darker};

    .icon {
      border-left: 1px solid ${colorVariables.primary_darkest} !important;
    }
  }

  .icon, .text {
    display: inline-block;
    box-sizing: border-box;
    height: 60px;
    vertical-align: top;
    font-size: 18px;
  }

  .icon {
    width: 60px;
    padding: 0 20px 0 20px;
    text-align: center;
    border-left: 1px solid ${colorVariables.light_darker};
  }

  .text {
    width: calc(100% - 60px);
    padding-left: 20px;
  }

  &.dark {
    border-bottom: 1px solid ${colorVariables.darker_darkest};
    color: ${colorVariables.light};
    
    .icon {
      border-left: 1px solid ${colorVariables.darker_darkest};
    }
  }
`;

const Sidebar = ({ setOptions, sidebarOpened, setSidebarOpened }) => {
  const options = useContext(OptionsContext);

  const closeSidebar = (e) => {
    const clickedElement = e.target;

    // check if user clicked on the sidebar container, not on the sidebar itself
    if (Array.from(clickedElement.classList).includes('sidebar-container')) {
      setSidebarOpened(false);
    }
  }

  const switchColorMode = () => {
    setOptions({
      ...options,
      dark_mode: !options.dark_mode
    });
  }

  return (
    <div>
      { sidebarOpened && (
        <SidebarContainer
          className="sidebar-container"
          onClick={closeSidebar}
        >
          <SidebarStyledComponent
            className={classNames({
              'dark': options.dark_mode
            })}
          >
            <SidebarItem
              onClick={switchColorMode}
              className={classNames({
                'dark': options.dark_mode
              })}
            >
              <div className="text">
                Color mode
              </div>

              <div className="icon">
                {options.dark_mode ? (
                  '🌙'
                ) : (
                  '☀️'
                )}
              </div>
            </SidebarItem>
          </SidebarStyledComponent>
        </SidebarContainer>
      )}
    </div>
  );
}
 
export default Sidebar;