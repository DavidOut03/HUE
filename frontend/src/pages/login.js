import {useState} from "react";
import axios from "axios";
import LoadingScreen from "../components/loading-screen";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [account, setAccount] = useState(null);
    // const [passwordRight, setPasswordRight] = useState("");

    function loginUser(event) {
        event.preventDefault();

        if(username !== undefined && password !== undefined && username != null && password != null) {

       
        console.log("------------------------------------------------------");
        console.log("                   Trying to login");
        

        setAccount(" ");
        const data = {"username": username, "password":password};
        // axios.post("/login", data).then((response) => {response.json()}).then((responseData) => {console.log(responseData)}).catch((error) => {console.log(error);});
        axios.post("/login", data).then((response) => {
            if(response.data.processed === true) {
                setAccount(data);
            } else {
                setUsername("");
                setPassword("");
                setAccount(null);
            }
         });

        console.log("------------------------------------------------------");
        }
    }
    
    if(account == null) {
        return (
            <section className="section-login">
             <div className="login">/
              <h1 className="heading login__title">Login</h1>
              <form className="form">
    
              <div className="form__group">
                      <input type="text" className="form__input" placeholder="Username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                      <label htmlFor="username" className="form__label">Username</label>
                  </div>
    
                  <div className="form__group">
                      <input type="password" className="form__input" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                      <label htmlFor="password" className="form__label">Password</label>
                  </div>
    
                  <div className="form__group">
                      <button className="form__button" onClick={(e) => loginUser(e)}>Login</button>
                  </div>
    
              </form>
            </div>
          </section>
        );
    } else if(account === " ") {
        return <LoadingScreen/>;
    } else {
        props.onLogin(account);
        return <LoadingScreen/>;
    }
  
}

export default Login;