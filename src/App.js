import './styles/general.css';
import './styles/classes.css';
import { useState, useEffect, createContext } from 'react';
import { PageContainer, CenterContainer } from './components/BaseComponents';
import useFetchJson from './hooks/useFetchJson';
import classNames from 'classnames';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import CardDeck from './components/CardDeck';
import Timeline from './components/Timeline';

export const OptionsContext = createContext();
export const TimelineContextState = createContext();
export const TimelineContextUpdater = createContext();
export const CardsJsonContext = createContext();

export default function App() {
  const [cardsJson, cardsError] = useFetchJson("/json/cards.json");

  const [sidebarOpened, setSidebarOpened] = useState(false);
  const [mouseOverTimeline, setMouseOverTimeline] = useState(false);
  const [holdingCard, setHoldingCard] = useState(false);
  const [timelineState, setTimelineState] = useState([]);
  const [timelineMouseX, setTimelineMouseX] = useState(0);
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
      { options && cardsJson && (
        <CardsJsonContext.Provider value={cardsJson}>
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
                      timelineMouseX={timelineMouseX}
                      setHoldingCard={setHoldingCard}
                    />

                    <Timeline
                      mouseOverTimeline={mouseOverTimeline}
                      setMouseOverTimeline={setMouseOverTimeline}
                      setTimelineMouseX={setTimelineMouseX}
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
        </CardsJsonContext.Provider>
      )}
    </div>
  );
}