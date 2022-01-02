import { useState, useEffect } from "react";
import { VoiceMsg } from "../public/livechat/MF_LiveChat_Landing/chat_svg";




export default function Recorder({ returnVoiceMessage }) {
    const useRecorder = () => {
        const [audioFile, setAudioFile] = useState(null);
        const [isRecording, setIsRecording] = useState(false);
        const [recorder, setRecorder] = useState(null);

        useEffect(() => {
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
            };

            recorder.addEventListener("dataavailable", handleData);


            return () => recorder.removeEventListener("dataavailable", handleData);
        }, [recorder, isRecording]);

        const startRecording = () => {
            setIsRecording(true);
            setButtonColor("#2198FA");
        };

        const stopRecording = () => {
            setIsRecording(false);
            setButtonColor("");
            if (audioFile !== "") {
                returnVoiceMessage(audioFile);
            }
        };

        return [ startRecording, stopRecording];
    };

    async function requestRecorder() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        return new MediaRecorder(stream, {'type' : 'audio/oga'});
    }

    let [startRecording, stopRecording] = useRecorder();
    

    const [buttonColor, setButtonColor] = new useState("");


    return (
<<<<<<< HEAD
          <div className={isRecording?"":("mf_bg_light_grey") } style={{padding:"0 3px"}} onMouseDown={startRecording} onMouseUp={stopRecording}>
            {/* start recording */}
            <VoiceMsg size={12}/>
          </div>
        // <div className="App">
        //   {/* <audio src={audioURL} controls /> */}
        // </div>
      );
=======
        <>
            {/* <audio src={audioFile} controls /> */}
            <div className={"voice_btn"} onMouseDown={startRecording} style={{ backgroundColor: `${buttonColor}` }} onMouseUp={stopRecording}>
                <VoiceMsg size={12} />
            </div>
        </>


    );
>>>>>>> 29d6bc01f85541c504edbf1a1c49182dee0622ef

}