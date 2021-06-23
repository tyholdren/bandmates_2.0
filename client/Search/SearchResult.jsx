import React, { useState } from "react";

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

  const idObj = { id: id };
  console.log("id", id);
  const addFollower = () => {
    fetch("/api/followers", {
      method: "POST",
      body: JSON.stringify(id),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  };

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
          <div>{bio}</div>
          <div>Contact: {email}</div>
        </>
      )}
      <button onClick={toggleBio}>
        {isBioShowing ? "Show less information" : "Show more information"}
      </button>
    </div>
  );
};

export default SearchResult;
