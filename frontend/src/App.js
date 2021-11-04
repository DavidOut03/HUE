import {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Lights from "./pages/lights";
import Login from "./pages/login";
import Settings from "./pages/settings";


import Test from "./pages/test";


function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {axios.post("/login", {"username": "", "password": ""}).then(
    (response) => {
      const data = response.data;
      // console.log(data.processed);
      setUser(data.processed);
    }
  );}, []);

  function renderOtherPages() {
    if(user != null)  {
      return <div className="content">
      <Switch>
        <Route exact path="/">
          <Lights/>
        </Route>
        <Route exact path="/settings">
            <Settings/>
        </Route>
      </Switch>
        {/* <Switch> <Route exact path="/"> <Lights/> </Route> </Switch>
        <Switch> <Route exact path="/settings"> <Settings/> </Route></Switch>
        <Switch> <Route exact path="/test"> <Test/> </Route> </Switch> */}
      </div>
    } else {
      return <div className="content"> <Switch> <Route path="/"> <Login onLogin={setUser} /> </Route> </Switch> </div>;
    }
  }
  
  return (<Router>{renderOtherPages()}</Router>);
}

export default App;
