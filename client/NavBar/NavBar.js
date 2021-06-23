import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

const NavBar = (props) => {
  const history = useHistory();

  const handlerLogout = () => {
    fetch("/verify/logout")
      .then((response) => response.json)
      .then()
      .catch((err) => console.log(err));

    history.push("/");
  };

  const handlerSearchMusicians = () => {
    history.push("/Search");
  };

  const handlerProfile = () => {
    history.push("/Users/4");
  };

  let buttonType;
  if (props.type === "profile") {
    buttonType = (
      <input
        className="btn gray block circular logoutBtn"
        type="button"
        value="Search Musicians"
        onClick={handlerSearchMusicians}
      />
    );
  } else {
    buttonType = (
      <input
        className="btn gray block circular logoutBtn"
        type="button"
        value="Profile"
        onClick={handlerProfile}
      />
    );
  }

  return (
    <div className="navBarContainer">
      <span>{buttonType}</span>
      <span className="floatRight">
        <input
          className="btn gray block circular logoutBtn"
          type="button"
          value="Logout"
          onClick={handlerLogout}
        />
      </span>
    </div>
  );
};

export default NavBar;
