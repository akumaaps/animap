import './App.css';
import OSM from './component/OSM';

const App = () => {

  return (
    <>        
    <div className="App">
     <OSM  localisation= {[48.866667,2.333333]}/>
    </div>
    </>
  );
}

export default App;
