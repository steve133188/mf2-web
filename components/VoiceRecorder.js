import {useState , useEffect} from "react";
import { VoiceMsg } from "../public/livechat/MF_LiveChat_Landing/chat_svg";

const useRecorder = () => {
    const [audioURL, setAudioURL] = useState("");
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
        setAudioURL(URL.createObjectURL(e.data));
      };
  
      recorder.addEventListener("dataavailable", handleData);
      return () => recorder.removeEventListener("dataavailable", handleData);
    }, [recorder, isRecording]);
  
    const startRecording = () => {
      setIsRecording(true);
    };
  
    const stopRecording = () => {
      setIsRecording(false);
    };
  
    return [audioURL, isRecording, startRecording, stopRecording];
};
async function requestRecorder() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return new MediaRecorder(stream);
  }

export default function Recorder(){
    let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
    return (
          <div className={isRecording?"":("mf_bg_light_grey") } style={{padding:"0 3px"}} onMouseDown={startRecording} onMouseUp={stopRecording}>
            {/* start recording */}
            <VoiceMsg size={12}/>
          </div>
        // <div className="App">
        //   {/* <audio src={audioURL} controls /> */}
        // </div>
      );

}