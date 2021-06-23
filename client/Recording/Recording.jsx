import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useReactMediaRecorder } from "react-media-recorder";
import regeneratorRuntime from "regenerator-runtime";
const Recording = (props) => {
  console.log("inside Recording:", props.mediaRecorder);
  const [recorderFunc, setRecorderFunc] = useState({});
  const [soundClips, setSoundClips] = useState([]);

  let audioCtx;

  recorderFunc.recordOnclick = () => {
    props.mediaRecorder.start();
    console.log(props.mediaRecorder.state);
    console.log("recorder started");
    const record = document.querySelector(".record");
    const stop = document.querySelector(".stop");
    record.style.background = "red";

    stop.disabled = false;
    record.disabled = true;
  };

  recorderFunc.stopOnclick = function () {
    props.mediaRecorder.stop();
    console.log(props.mediaRecorder.state);
    console.log("recorder stopped");
    const record = document.querySelector(".record");
    const stop = document.querySelector(".stop");
    record.style.background = "";
    record.style.color = "";

    stop.disabled = true;
    record.disabled = false;
  };

  console.log("getUserMedia supported.");

  const constraints = { audio: true };
  let chunks = [];

  props.mediaRecorder.onstop = function (e) {
    console.log("data available after MediaRecorder.stop() called.");

    const clipName = prompt(
      "Enter a name for your sound clip?",
      "My unnamed clip"
    );

    let clipLabel;

    let audio;

    let blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });

    console.log("Chunks", chunks);
    console.log("BLOB 84:", blob);
    chunks = [];
    const audioURL = window.URL.createObjectURL(blob);
    console.log("audioURL", audioURL);

    console.log("recorder stopped");
    audio = <audio controls={true} src={audioURL} />;

    let newArray = [];
    newArray.push(
      <audio
        className="btn gray block circular logoutBtn clip"
        controls
        src={audioURL}
      />
    );
    setSoundClips(newArray.concat(soundClips));
    console.log(soundClips);
  };

  props.mediaRecorder.ondataavailable = function (e) {
    console.log(e);
    chunks.push(e.data);
  };

  console.log("after onsuccess");
  let stuff = [];

  soundClips.forEach((element) => {
    stuff.push(element);
  });
  console.log("STUFF", stuff);
  return (
    <div>
      <section className="main-controls">
        <div id="buttons">
          <button className="record" onClick={recorderFunc.recordOnclick}>
            Record
          </button>
          <button className="stop" onClick={recorderFunc.stopOnclick}>
            Stop
          </button>
        </div>
      </section>

      <div className="recordingContainer">{soundClips}</div>
    </div>
  );
};

export default Recording;
