import {useState} from 'react';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Lights from "./pages/lights";
import Login from "./pages/login";
import Test from "./pages/test";
import LoadingScreen from "./pages/loading-screen";


function App() {
  const [user, setUser] = useState({});

  function renderOtherPages() {
    if(user != null)  {
      return <div className="content">
        <Switch>  <Route exact path="/"> <Lights/> </Route> </Switch>
        <Switch> <Route exact path="/test"> <Test/> </Route> </Switch>
      </div>
    } else {
      return <div className="content"> <Switch> <Route exact path="/"> <Login onLogin={setUser} /> </Route> </Switch> </div>;
    }
  }
  
  return (<Router>{renderOtherPages()}</Router>);
}

export default App;
