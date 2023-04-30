import React, {useState} from 'react';
import './App.css';
import OSM from './component/OSM';

const App = () => {

  const [initialPosition, setInitialPosition] = useState<[number, number]>([48.866667,2.333333]);
  const [modalShow, setModalShow] = React.useState(true);

  return (
    <>        
    <div className="App">
     <OSM  localisation= {initialPosition}/>
    </div>
    </>
  );
}

export default App;
