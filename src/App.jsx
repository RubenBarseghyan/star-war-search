import { Tabs } from 'antd';
import PlanetList from './components/PlanetList';
import CharacterList from './components/CharacterList';
import FilmList from './components/FilmList';

const { TabPane } = Tabs;

const App = () => {
  return (
    <div className="App">
      <h1>Star Wars Info</h1>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Planets" key="1">
          <PlanetList />
        </TabPane>
        <TabPane tab="Characters" key="2">
          <CharacterList />
        </TabPane>
        <TabPane tab="Films" key="3">
          <FilmList />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default App;
