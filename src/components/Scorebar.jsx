import styled from 'styled-components'; 

// styled components
const ScoreStyledComponent = styled.div`
  width: fit-content;
  height: 40px;
  margin-top: 10px;
  font-size: 32px;
  font-weight: bold;
`;

const ScoreCounter = styled.div`
  display: inline-block;
  padding: 0 20px;
  color: ${props => (props.darkMode ? '#FFF' : '#000')}; // Change color based on dark mode
`;

// score component
const Scorebar = ({ score, darkMode }) => {
  return (
    <ScoreStyledComponent>
      <ScoreCounter darkMode={darkMode}>
        Score: {score}
      </ScoreCounter>
    </ScoreStyledComponent>
  );
}

export default Scorebar;
