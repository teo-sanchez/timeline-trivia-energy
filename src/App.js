import './styles/general.css';
import './styles/classes.css';
import { PageContainer, CenterContainer } from './components/BaseComponents';
import Navbar from './components/Navbar';

function App() {
  return (
    <PageContainer>
      <Navbar />

      <CenterContainer className="app">
        
      </CenterContainer>
    </PageContainer>
  );
}

export default App;