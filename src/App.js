import './styles/general.css';
import './styles/classes.css';
import { useState } from 'react';
import { PageContainer, CenterContainer } from './components/BaseComponents';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  const [sidebarOpened, setSidebarOpened] = useState(false);

  return (
    <PageContainer>
      <Navbar
        sidebarOpened={sidebarOpened}
        setSidebarOpened={setSidebarOpened}
      />

      <CenterContainer className="app">
        
      </CenterContainer>

      <Sidebar
        sidebarOpened={sidebarOpened}
      />
    </PageContainer>
  );
}

export default App;