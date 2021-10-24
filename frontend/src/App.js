import {useState} from 'react';
import './App.css';

import Lights from "./pages/lights";
import Login from "./pages/login";


function App() {

  const [page, setPage] = useState(<Login />);
  
  return (
    <div className="App">
     {page}
    </div>
  );
}

export default App;
