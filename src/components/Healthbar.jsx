import styled from 'styled-components'; 

// styled components
const HealthbarStyledComponent = styled.div`
  width: fit-content;
  height: 40px;
  margin-top: 10px;
`;

const Heart = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  background-image: url('./media/heart.png');
  background-size: cover;
`;

// healthbar component
const Healthbar = ({ health }) => {
  return (
    <HealthbarStyledComponent>
      {[...Array(health).keys()].map(id => (
        <Heart key={id} />
      ))}
    </HealthbarStyledComponent>
  );
}
 
export default Healthbar;