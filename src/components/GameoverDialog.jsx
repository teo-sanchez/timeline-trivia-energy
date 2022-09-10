import { useContext } from 'react';
import styled from 'styled-components';
import classNames from 'classnames';
import { colorVariables, ShadowContainer, Button, Icon } from './BaseComponents';
import { OptionsContext, TimelineContextUpdater } from '../App';

const Dialog = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: fit-content;
  min-width: 300px;
  min-height: 150px;
  background-color: ${colorVariables.light};
  box-sizing: border-box;
  border: 1px solid ${colorVariables.light_darker};
  border-radius: 4px;
  color: ${colorVariables.dark};
  cursor: default;
  user-select: none;

  .title, .content {
    width: 100%;
    box-sizing: border-box;
    padding: 0 10px 0 10px;
    text-align: center;
  }

  .title {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid ${colorVariables.light_darker};
    font-size: 20px;
    font-weight: 600;
  }

  .content {
    padding: 10px;

    .btn {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &.dark {
    background-color: ${colorVariables.darkest};
    border: 1px solid ${colorVariables.darker_darkest};
    color: ${colorVariables.light};

    .title {
      border-bottom: 1px solid ${colorVariables.darker_darkest};
    }
  }
`;

const GameoverDialog = ({ score, resetGame }) => {
  const options = useContext(OptionsContext);

  const closeDialog = (e) => {
    const clickedElementClasses = Array.from(e.target.classList);

    if (clickedElementClasses.includes('dialog-container')) {
      resetGame();
    }
  };

  return (
    <ShadowContainer
      className="dialog-container"
      onClick={closeDialog}
    >
      <Dialog
        className={classNames({
          dark: options.dark_mode
        })}
      >
        <div className="title">
          Game over!
        </div>

        <div className="content">
          Your score was {score}.

          <Button
            onClick={resetGame}
          >
            Try again

            <Icon>
              arrow_forward
            </Icon>
          </Button>
        </div>
      </Dialog>
    </ShadowContainer>
  );
}
 
export default GameoverDialog;