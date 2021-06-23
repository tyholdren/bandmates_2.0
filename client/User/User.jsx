import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import RecordingContainter from "../Recording/RecordingContainer.jsx";

import NavBar from "../NavBar/NavBar";

const User = () => {
  const [user, setUser] = useState(null);

  const [isBioShowing, setIsBioShowing] = useState(false);
  const toggleBio = () => setIsBioShowing(!isBioShowing);

  const history = useHistory();
  const userId = history.location.pathname.split("/users/");
  console.log("userId in users: at index 0", userId[0]);
  console.log("userId in users: at index 1", userId[1]);

  useEffect(() => {
    fetch(`/api/users/${userId[1]}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!user) {
    return (
      <>
        <NavBar type={"profile"} />
        <div>Loading user ...</div>
      </>
    );
  }

  const {
    name,
    username,
    email,
    instruments,
    genres,
    gender,
    birthdate,
    location,
    bio,
    skill_level: skillLevel,
  } = user;

  const age = birthdate;

  const singleInstrument = instruments[0];
  const singleGenre = genres[0];

  return (
    <div>
      <NavBar type="profile" />
      <div className="profileContainer">
        <div className="searchResult">
          <div>Name: {name}</div>
          <div>Location: {location}</div>
          <div>Skill level: {skillLevel}</div>
          <div>Instruments: {singleInstrument}</div>
          <div>Genres: {singleGenre}</div>
          <div>Gender: {gender}</div>
          <div>Birthdate: {birthdate}</div>
          {isBioShowing && (
            <>
              <div>{bio}</div>
              <div>Contact: {email}</div>
            </>
          )}
          <button onClick={toggleBio}>
            {isBioShowing ? "Show less information" : "Show more information"}
          </button>
        </div>
        <RecordingContainter />
      </div>
    </div>
  );
};

export default User;
