import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory, Redirect } from 'react-router';
import '../styles/login.css';

const LogIn = () => {
  const [errors, setErrors] = useState('');
  const [message, setMessage] = useState('');

  const history = useHistory();
  /*
  
  
  const returned = useState('value'); => ['value', function]
  returned = ['value', function definition]
  const string = returned[0];
  const setString = returned[1];

  const obj = {property1: 'value', property2: function}
  const [property1, property2] = obj;
  =>
    const property1 = obj.property1;
    const property2 = obj.property2;
  */
  const [username,setUsername] = useState('');
  const [password, setPassword] = useState('');




  const handleLogIn = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    console.log(username, password);
    // TODO: do some sort of put request with the username and password to start a session. 
    // fetch()
      // .catch(err => setErrors(err));
  };

  const handlerUpdateUsername = (event) => {
    setUsername(event.target.value) 
  }

  const handlerUpdatePassword = (event) => {
    setPassword(event.target.value)
  }

  const handlerLogin = () => {
    console.log(username,password)
    //do fetch call
    fetch('/verify/login', {
      method: 'POST',
      headers: {'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'},
      body: JSON.stringify({username: username, password: password}),
    }) // => apsdjfpiajofasodfosadfoasdfosaodfsfasdfoasfasf
      .then(response => response.json()) //=> apsdjfpiajofasodfosadfoasdfosaodfsfasdfoasfasf => readable format
      .then(data => { 
        if(data.valid){
          console.log(data.userId);
          history.push('/users/' + data.userId)
        }
        else{
          setMessage('Invalid User name')
        }
      }) // => readable data
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="signUpAndLogIn">
      <div id="signUpContainer">
        <h1>Bandmates</h1>
        {errors && (
          <div className="loginFields">
            {errors}
          </div>
        )}
        <form
          onSubmit={handleLogIn}>
          <input
            className="loginFields"
            type="text"
            id="username"
            name="username"
            placeholder="kenny@loggins.com"
            onChange={handlerUpdateUsername}
          />
          <input
            className="loginFields"
            type="password"
            id="password"
            name="password"
            placeholder="SickPassword420"
            onChange={handlerUpdatePassword}
            
          />
          <input
            className="loginFields btn gray block circular"
            type="button"
            value="Log In"
            onClick={handlerLogin}
          />
        </form>
        <Link to="/signUp">
          <button className="loginFields btn gray block circular">
            Sign Up
          </button>
        </Link>
        <div style={{color: 'red', textAlign:'center'}}>{message}</div>

      </div>
    </div>
  )
};


/*
GOAL:: LOGIN
  username and password info
*/

export default LogIn;
