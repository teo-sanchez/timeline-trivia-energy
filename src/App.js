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
import GameoverDialog from './components/GameoverDialog';

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
  const [health, setHealth] = useState(3);
  const [score, setScore] = useState(0);
  const [gameover, setGameover] = useState(false);
  const [options, setOptions] = useState(null);
  const [shuffledDeck, setShuffledDeck] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // gameover when player is out of health
  useEffect(() => {
    if (health <= 0) {
      setGameover(true);
    }
  }, [health]);

  // shuffle the deck and set the initial card
  useEffect(() => {
    if (cardsJson) {
      const shuffled = [...cardsJson].sort(() => Math.random() - 0.5);
      const initialCard = shuffled[0];
      setShuffledDeck(shuffled.slice(1)); // remove the initial card from the deck
      setTimelineState([{
        id: 0,
        properties: { ...initialCard },
        placed_correctly: true
      }]);
      setCurrentIndex(0);
    }
  }, [cardsJson]);

  // reset game function
  const resetGame = () => {
    setScore(0);
    setHealth(3);
    setGameover(false);
    const shuffled = [...cardsJson].sort(() => Math.random() - 0.5);
    const initialCard = shuffled[0];
    setShuffledDeck(shuffled.slice(1)); // remove the initial card from the deck
    setTimelineState([{
      id: 0,
      properties: { ...initialCard },
      placed_correctly: true
    }]);
    setCurrentIndex(0);
  };

  return (
    <div className="app">
      { options && cardsJson && (
        <CardsJsonContext.Provider value={shuffledDeck}>
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
                    score={score}
                    gameover={gameover}
                    resetGame={resetGame}
                  />

                  <CenterContainer className="app">
                    <CardDeck
                      mouseOverTimeline={mouseOverTimeline}
                      setHoldingCard={setHoldingCard}
                      timelineMouseX={timelineMouseX}
                      health={health}
                      setHealth={setHealth}
                      score={score}
                      setScore={setScore}
                      setGameover={setGameover}
                      currentIndex={currentIndex}
                      setCurrentIndex={setCurrentIndex}
                    />

                    <Timeline
                      mouseOverTimeline={mouseOverTimeline}
                      setMouseOverTimeline={setMouseOverTimeline}
                      timelineMouseX={timelineMouseX}
                      setTimelineMouseX={setTimelineMouseX}
                      holdingCard={holdingCard}
                    />
                  </CenterContainer>

                  <Sidebar
                    setOptions={setOptions}
                    sidebarOpened={sidebarOpened}
                    setSidebarOpened={setSidebarOpened}
                  />

                  { gameover &&
                    <GameoverDialog
                      score={score}
                      resetGame={resetGame}
                    />
                  }
                </PageContainer>
              </OptionsContext.Provider>
            </TimelineContextUpdater.Provider>
          </TimelineContextState.Provider>
        </CardsJsonContext.Provider>
      )}
    </div>
  );
}
