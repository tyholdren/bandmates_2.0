import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useReactMediaRecorder } from "react-media-recorder";
import regeneratorRuntime from "regenerator-runtime";
const Recording = (props) => {
  console.log('inside Recording:', props.mediaRecorder)
  const [recorderFunc, setRecorderFunc] = useState({});
  const [soundClips, setSoundClips] = useState([]);


  
  // const soundClips = document.querySelector('.sound-clips');
  // const mainSection = document.querySelector('.main-controls');
  let audioCtx;




  recorderFunc.recordOnclick = () => {
    props.mediaRecorder.start();
    console.log(props.mediaRecorder.state);
    console.log("recorder started");
    const record = document.querySelector('.record');
    const stop = document.querySelector('.stop');
    record.style.background = "red";

    
    stop.disabled = false;
    record.disabled = true;
  }

  recorderFunc.stopOnclick = function() {
    props.mediaRecorder.stop();
    console.log(props.mediaRecorder.state);
    console.log("recorder stopped");
    const record = document.querySelector('.record');
    const stop = document.querySelector('.stop');
    record.style.background = "";
    record.style.color = "";
    // mediaRecorder.requestData();

    stop.disabled = true;
    record.disabled = false;
  }
  // const canvasCtx = canvas.getContext("2d");

  //main block for doing the audio recording

  // if (navigator.mediaDevices.getUserMedia) {
  console.log('getUserMedia supported.');

  const constraints = { audio: true };
  let chunks = [];


  props.mediaRecorder.onstop = function(e) {
    console.log("data available after MediaRecorder.stop() called.");

    const clipName = prompt('Enter a name for your sound clip?','My unnamed clip');

    // const clipContainer = document.createElement('article');
    // const clipLabel = document.createElement('p');
    let clipLabel;
    // const audio = document.createElement('audio');
    let audio;
    // const deleteButton = document.createElement('button');

    // clipContainer.classList.add('clip');
    // audio.setAttribute('controls', '');
    // deleteButton.textContent = 'Delete';
    // deleteButton.className = 'delete';

    // if(clipName === null) {
    //   clipLabel.textContent = 'My unnamed clip';
    // } else {
    //   clipLabel.textContent = clipName;
    // }
    // clipLabel = <p>Clip: {clipName}</p>;

    // clipContainer.appendChild(audio);
    // clipContainer.appendChild(clipLabel);
    // clipContainer.appendChild(deleteButton);
    // soundClips.appendChild(clipContainer);

    // audio.controls = true;
    // let string = JSON.stringify(chunks);
    // chunks = JSON.parse(string);
    let blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });


    console.log('Chunks',chunks);
    console.log('BLOB 84:', blob)
    chunks = [];
    const audioURL = window.URL.createObjectURL(blob);
    console.log('audioURL', audioURL);
    // audio.src = audioURL;
    console.log("recorder stopped");
    audio = <audio controls={true} src={audioURL} />
    // soundClips.push(
    //   <audio controls src={audioURL} />)
    let newArray = [];
    newArray.push(<audio controls src={audioURL} />);
    setSoundClips(newArray.concat(soundClips));
    console.log(soundClips);
    // deleteButton.onclick = function(e) {
    //   let evtTgt = e.target;
    //   evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
    // }

    // clipLabel.onclick = function() {
    //   const existingName = clipLabel.textContent;
    //   const newClipName = prompt('Enter a new name for your sound clip?');
    //   if(newClipName === null) {
    //     clipLabel.textContent = existingName;
    //   } else {
    //     clipLabel.textContent = newClipName;
    //   }
    // }
  }

  props.mediaRecorder.ondataavailable = function(e) {
    console.log(e);
    chunks.push(e.data);
  }
  /*
  let onSuccess = function(stream) {
    console.log('inside onsuccess')
    console.log(stream);
    recorderFunc.mediaRecorder = new MediaRecorder(stream);

    recorderFunc.recordOnclick = () => {
      recorderFunc.mediaRecorder.start();
      console.log(recorderFunc.mediaRecorder.state);
      console.log("recorder started");
      // record.style.background = "red";

      // stop.disabled = false;
      // record.disabled = true;
    }

    recorderFunc.stopOnclick = function() {
      recorderFunc.mediaRecorder.stop();
      console.log(recorderFunc.mediaRecorder.state);
      console.log("recorder stopped");
      // record.style.background = "";
      // record.style.color = "";
      // mediaRecorder.requestData();

      // stop.disabled = true;
      // record.disabled = false;
    }

    recorderFunc.mediaRecorder.onstop = function(e) {
      console.log("data available after MediaRecorder.stop() called.");

      const clipName = prompt('Enter a name for your sound clip?','My unnamed clip');

      const clipContainer = document.createElement('article');
      const clipLabel = document.createElement('p');
      const audio = document.createElement('audio');
      const deleteButton = document.createElement('button');

      clipContainer.classList.add('clip');
      audio.setAttribute('controls', '');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete';

      if(clipName === null) {
        clipLabel.textContent = 'My unnamed clip';
      } else {
        clipLabel.textContent = clipName;
      }

      clipContainer.appendChild(audio);
      clipContainer.appendChild(clipLabel);
      clipContainer.appendChild(deleteButton);
      soundClips.appendChild(clipContainer);

      audio.controls = true;
      const blob = new Blob(chunks, { 'type' : 'audio/ogg; codecs=opus' });
      chunks = [];
      const audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;
      console.log("recorder stopped");

      deleteButton.onclick = function(e) {
        let evtTgt = e.target;
        evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
      }

      clipLabel.onclick = function() {
        const existingName = clipLabel.textContent;
        const newClipName = prompt('Enter a new name for your sound clip?');
        if(newClipName === null) {
          clipLabel.textContent = existingName;
        } else {
          clipLabel.textContent = newClipName;
        }
      }
    }

    recorderFunc.mediaRecorder.ondataavailable = function(e) {
      chunks.push(e.data);
    }
  }

  let onError = function(err) {
    console.log('The following error occured: ' + err);
  }
  */

  // React.useEffect(() => {
  //   navigator.mediaDevices.getUserMedia(constraints).then(onSuccess, onError);
  // })
  

  // } else {
  //   console.log('getUserMedia not supported on your browser!');
  // }

  console.log('after onsuccess')
  let stuff = [];
  
  soundClips.forEach((element) => {
    stuff.push(element);
  })
  console.log('STUFF', stuff)
  return (
    <div>
      <section className="main-controls">
        <div id="buttons">
          <button className="record" onClick={recorderFunc.recordOnclick}>Record</button>
          <button className="stop" onClick={recorderFunc.stopOnclick}>Stop</button>
        </div>
      </section>

      {/* <section className="sound-clips"></section> */}
      {soundClips}
    </div>
  );
};

export default Recording;