import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import NavBar from '../NavBar/NavBar';

const User = () => {
  const [user, setUser] = useState(null);
  
  // next four lines brought over from searchResult.jsx
  const [isBioShowing, setIsBioShowing] = useState(false);
  const toggleBio = () => setIsBioShowing(!isBioShowing);
  // const formattedInstruments = instruments.join(", ");
  // const formattedGenres = genres.join(", ");


  // TODO: there's probably a better way to get a user's ID from ReactRouterDom.
  const history = useHistory();
  const userId = history.location.pathname.split('/users/');
  console.log('userId in users: at index 0',userId[0]);
  console.log('userId in users: at index 1',userId[1]);
  // TODO: in the future, user information should be fetched from 
  // backend via a get request to /api/users/:id
  useEffect(() => {
    fetch(`/api/users/${ userId[1] }`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
      })
      .catch(err => console.log(err));
  }, []);
  // NOTE: looks like this is set up for us to get info about the specific user from the databse

  if (!user) {
    return (
      <>
        <NavBar />
        <div>
          Loading user ...
        </div>
      </>
    )
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

  

  // TODO: use birthdate to format age.
  const age = birthdate;
  
  // TODO: format genres and instruments from arrays to strings
  // (once the backend is serving up arrays)
  const singleInstrument = instruments[0];
  const singleGenre = genres[0];

  //NOTE: not sure if we're actually even using any of this information below...
  // return (

  //   <>
  //     <NavBar />
  //     <div>{name}</div>
  //     <div>{username}</div>
  //     <div>{formattedInstruments}</div>
  //     <div>{formattedGenres}</div>
  //     <div>{skillLevel}</div>
  //     <div>{age} years old, {gender}, located in {location}</div>
  //     <div>{bio}</div>
  //     <div>{email}</div>
  //   </>
  // )
  return (
    <div>
    <NavBar />
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
          <div>
            {bio}
          </div>
          <div>
            Contact: {email}
          </div>
        </>
      )}
      <button onClick={toggleBio}>
        {isBioShowing ? 'Show less information' : 'Show more information'}
      </button>
    </div>
    </div>
  )
};

export default User;
