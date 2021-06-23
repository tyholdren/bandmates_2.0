import React from "react";
import Recording from "./Recording";

const RecordingContainer = (props) => {
  const [recording, setRecording] = React.useState();
  const [firstRun, setFirstRun] = React.useState(true);
  let test = [];
  React.useEffect(async () => {
    if (firstRun) {
      setFirstRun(false);
      let onSuccess = function (stream) {
        console.log("inside onsuccess");
        console.log(stream);
        return new MediaRecorder(stream);
      };
      let onError = function (err) {
        console.log("The following error occured: " + err);
      };
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(onSuccess, onError)
        .then((data) => {
          console.log("Recording Container", data);

          setRecording(<Recording mediaRecorder={data} />);

          console.log(recording);
        });
    }
  });

  return <div>{recording}</div>;
};

export default RecordingContainer;
