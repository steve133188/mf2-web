import { useState, useEffect } from "react";
import { VoiceMsg } from "../public/livechat/MF_LiveChat_Landing/chat_svg";

import {Recorder as jsRecorder} from 'recorder-js';


export default function Recorder({ returnVoiceMessage }) {

      async function requestRecorder() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        return new MediaRecorder(stream,   { type : 'audio/ogg; codecs=opus' });
    }

    const useRecorder = () => {
        const [audioFile, setAudioFile] = useState(null);
        const [audioURL, setAudioURL] = useState("");
        const [isRecording, setIsRecording] = useState(false);
        const [recorder, setRecorder] = useState(null);

        useEffect( async() => {
            // Lazily obtain recorder first time we're recording.
            if (recorder === null) {
                if (isRecording) {
                    requestRecorder().then(setRecorder, console.error);
                }
                return;
            }

            // Manage recorder state.
            if (isRecording) {
                recorder.start();
            } else {
                recorder.stop();
            }

            // Obtain the audio when ready.
            const handleData = e => {
                setAudioFile(prev=>e.data);
               setAudioURL(URL.createObjectURL(e.data));
            };

            recorder.addEventListener("dataavailable", handleData);


            return () => recorder.removeEventListener("dataavailable", handleData);
        }, [recorder, isRecording]);

        const startRecording = () => {
            setIsRecording(true);
            setButtonColor("#D0E9FF");
            setSVGColor("#2198FA")
        };

        const stopRecording = () => {
            setIsRecording(false);
            setButtonColor("");
            setButtonColor("");
            if (audioFile !== "") {
                returnVoiceMessage(audioFile);
            }
        };
        function download() {
            jsRecorder.download(audioFile, 'my-audio-file'); // downloads a .wav file
          }


        return [ audioURL, isRecording,startRecording, stopRecording];
    };

  

    

    let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();

    const [buttonColor, setButtonColor] = new useState("");
    const [svgColor, setSVGColor] = new useState("");


    let [isRec,setRec] = useState(false)
    const rec = () =>{
        setRec(!isRec)
        console.log(isRec?"voice start":"End")

        isRec?startRecording():stopRecording();
    }


    return (
        <>
            {/* <audio src={audioURL} controls /> */}
            <div className={"voice_btn"} onClick={rec} style={{ backgroundColor: `${buttonColor}`, fill:`${svgColor}` ,borderRadius:"10px" }}>
                <VoiceMsg size={12} />
                <div className={"rec_signal blink_me"} style={{opacity:(isRecording?"1":"0")}}></div>
            </div>
        </>


    );

}