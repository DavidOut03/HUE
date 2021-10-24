
import {useState} from "react";

function Login(props) {
    const [password, setPassword] = useState("");
    

    function loginUser(event, password) {
   
    }

    return (
        <section class="section-login">
         <div className="login">
          <h1 className="heading login__title">Login</h1>
          <form action="#" class="form">
              <div class="form__group">
                  <input type="password" class="form__input" placeholder="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  <label for="password" class="form__label">Password</label>
              </div>

              <div class="form__group">
                  <button type="submit" class="form__button" onClick={(e) => loginUser(e, password)}>Login</button>
              </div>

          </form>
        </div>
      </section>
    );
}

export default Login;