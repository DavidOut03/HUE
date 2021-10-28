
import {useState} from "react";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function loginUser(event) {
        if(username  != null && username !== "" && password != null && password !== "") { 
           const getUser = () => {
               
           }
        }
    }
    
    return (
        <section class="section-login">
         <div className="login">/
          <h1 className="heading login__title">Login</h1>
          <form class="form">

          <div class="form__group">
                  <input type="text" class="form__input" placeholder="Username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                  <label for="username" class="form__label">Username</label>
              </div>

              <div class="form__group">
                  <input type="password" class="form__input" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <label for="password" class="form__label">Password</label>
              </div>

              <div class="form__group">
                  <button type="submit" class="form__button" onClick={(e) => loginUser(e)}>Login</button>
              </div>

          </form>
        </div>
      </section>
    );
}

export default Login;