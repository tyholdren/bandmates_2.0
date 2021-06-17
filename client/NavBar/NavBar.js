import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';

// TODO: in the future, the NavBar should have
// information about the current user, and uses that
// to Link the user to their profile. This will be 
// accomplished with Redux and Auth. 
const NavBar = (props) => {
  const history = useHistory();
  
  const handlerLogout = () => {
    //delete cookie
    fetch('/verify/logout')
      .then(response => response.json)
      .then()
      .catch(err => console.log(err))
    //redirect to login
    history.push('/')
  }

  const handlerSearchMusicians = () => {
    history.push('/Search')
  }

  const handlerProfile = () => {
    history.push('/Users/4')
  }

  let buttonType;
  if(props.type === 'profile'){
    buttonType = (
      <input
            className="btn gray block circular logoutBtn"
            type="button"
            value="Search Musicians"
            onClick={handlerSearchMusicians}
      />
    )
  }
  else{
    buttonType = (
      <input
            className="btn gray block circular logoutBtn"
            type="button"
            value="Profile"
            onClick={handlerProfile}
      />
    )
  }

  
  return(
    <div className="navBarContainer">
      {/* <div>
        Hello, {username}!
      </div> */}
      {/* <div>
        <Link to={`/users/${id}`}>View profile</Link>
      </div> */}

      <span>
        {buttonType}
      </span>
      <span>
        <input
          className="btn gray block circular logoutBtn"
          type="button"
          value="Logout"
          onClick={handlerLogout}
        />
      </span>
      <span>
        <Link to="/users" className="">Search musicians</Link>
      </span>
      

      {/* TODO: clicking "Log out" should actually log a user out,
        not just redirect them to the logIn page.  */}
      {/* <Link to="/" className="redirect">Log out</Link> */}
    </div>
  )
};

export default NavBar;
