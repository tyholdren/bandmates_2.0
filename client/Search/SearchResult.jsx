import React, { useState } from 'react';

/*

The SearchResult component receives its props from the 
Search component. In the Search component, the user's 
values are spread (...) into SearchResults. 
skill_level is renamed as skillLevel to comply with
JavaScript naming conventions. 
The state isBioShowing is used to indicate whether or
not additional information about a user (bio, email)
should be shown. 

FUTURE IMPLEMENTATIONS:
- rather than display all the information about the user
in the search result, a future implementation should
provide a Link (via React Router) to /users/:id. 

*/

const SearchResult = ({
  _id: id,
  name,
  location,
  instruments,
  skill_level: skillLevel,
  genres,
  bio,
  email,
  gender,
}) => {
  const [isBioShowing, setIsBioShowing] = useState(false);
  const toggleBio = () => setIsBioShowing(!isBioShowing);
  const formattedInstruments = instruments.join(", ");
  const formattedGenres = genres.join(", ");
  // const addFollower = (() => {
  //   fetch('/api/users')
  //     .then(res => res.json())
  //     .then(({ users }) => {
  //       setInitialResults(users);
  //       setSearchResults(users);
  //     })
  //     .catch(err => console.log(err));
  // }, []);

  // const userFollowerIDs = {
  //   user_id: id,
  //   follower_id 
  // }
  const idObj = {id: id}
  console.log("id", id);
  const addFollower = () => {
    fetch('/api/followers', {
      method: 'POST',
      body: JSON.stringify(id),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  }

  return (
    <div className="searchResult">
      <div>Name: {name}</div>
      <div>Location: {location}</div>
      <div>Skill level: {skillLevel}</div>
      <div>Instruments: {formattedInstruments}</div>
      <div>Genres: {formattedGenres}</div>
      <div>Gender: {gender}</div>
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
      {/* <button onClick={addFollower}>
        Follow
      </button> */}
    </div>
  )
};

export default SearchResult;
