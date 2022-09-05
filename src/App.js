import './styles/general.css';
import './styles/classes.css';
import { useState, useEffect, createContext, useRef } from 'react';
import { PageContainer, CenterContainer } from './components/BaseComponents';
import classNames from 'classnames';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CardDeck from './components/CardDeck';
import Timeline from './components/Timeline';

export const OptionsContext = createContext();
export const TimelineContextState = createContext();
export const TimelineContextUpdater = createContext();

export default function App() {
  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [mouseOverTimeline, setMouseOverTimeline] = useState(false);
  const [timelineState, setTimelineState] = useState([]);
  const [options, setOptions] = useState(null);

  // set default options if there are none
  useEffect(() => {
    if (localStorage.getItem('options') === null) {
      const defaultOptions = {
        dark_mode: false
      };

      localStorage.setItem('options', JSON.stringify(defaultOptions));
    }

    // put the options into a state
    setOptions(JSON.parse(localStorage.getItem('options')));
  }, []);

  // update options
  useEffect(() => {
    localStorage.setItem('options', JSON.stringify(options));
  }, [options]);

  return (
    <div className="app">
      { options && (
        <TimelineContextState.Provider value={timelineState}>
          <TimelineContextUpdater.Provider value={setTimelineState}>
            <OptionsContext.Provider value={options}>
              <PageContainer
                className={classNames({
                  'dark': options.dark_mode
                })}
              >
                <Navbar
                  sidebarOpened={sidebarOpened}
                  setSidebarOpened={setSidebarOpened}
                />

                <CenterContainer className="app">
                  <CardDeck
                    mouseOverTimeline={mouseOverTimeline}
                  />

                  <Timeline
                    setMouseOverTimeline={setMouseOverTimeline}
                  />
                </CenterContainer>

                <Sidebar
                  setOptions={setOptions}
                  sidebarOpened={sidebarOpened}
                  setSidebarOpened={setSidebarOpened}
                />
              </PageContainer>
            </OptionsContext.Provider>
          </TimelineContextUpdater.Provider>
        </TimelineContextState.Provider>
      )}
    </div>
  );
}