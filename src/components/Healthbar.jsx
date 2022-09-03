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
const Healthbar = () => {
  return (
    <HealthbarStyledComponent>
      {[...Array(3)].map(() => (
        <Heart />
      ))}
    </HealthbarStyledComponent>
  );
}
 
export default Healthbar;