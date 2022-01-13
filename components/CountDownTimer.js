import React, { useState, useEffect } from 'react'

// pass dayString to this component. it will start count 24hour from dayString
// dayString is a string like date.toIsoString()
export default function CountDownTimer ({dayString}) {
    const [timeString,setTimeString] = useState(dayString)
    const [timeLeft, setTimeLeft] = useState();
    let lastTime = new Date(parseInt(timeString)*1000)
    lastTime= lastTime.setDate(lastTime.getDate()+1)
    //add 24 hour
    const endTime = new Date( lastTime);
    // let lastTime = new Date(parseInt(dayString)*1000)
    // lastTime= lastTime.setDate(lastTime.getDate()+1)
    // //add 24 hour
    // const endTime = new Date( lastTime);
    //function calculate the time difference between now and the end time and return it as a string
    function getTimeRemaining(endTime) {

        const total = Date.parse(endTime) - Date.parse(new Date());
        if(total> 0){
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const ans= hours+":"+minutes+":"+seconds;
        return ans;
        }else
        return "00:00:00";
    }

    useEffect(() => {
        setInterval(()=> {
            setTimeLeft(prev=>getTimeRemaining(endTime))
        },1000)
    },[timeString]);

    return(
       <div className={"confirmationBox"}>
                {/* {endTime.toString()} */}
                {/* <h1>{timeLeft}</h1> */}
                <div className={'tim_timer'}>{timeLeft}</div>
            </div>
    )

}
