import React, { useState, useEffect } from 'react'

// pass dayString to this component. it will start count 24hour from dayString
export default function CountDownTimer ({dayString}) {
    //add 24 hour
    const endTime = new Date( new Date(dayString).getTime() +60 *60*24*1000);
    //function calculate the time difference between now and the end time and return it as a string
    function getTimeRemaining(endTime) {
        const total = Date.parse(endTime) - Date.parse(new Date());
        if(total > 0){
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const ans= hours+":"+minutes+":"+seconds;
        return ans;
        }else
        return "00:00:00";
    }

    const [timeLeft, setTimeLeft] = useState(getTimeRemaining(endTime)); 
    useEffect(() => {
        setTimeout(() => {
          setTimeLeft(getTimeRemaining(endTime));
        }, 1000);
    });

    return(
            <div className={"confirmationBox"}>
                {/* {endTime.toString()} */}
                {/* <h1>{timeLeft}</h1> */}
                <div className={'tim_timer'}>{timeLeft}
                    </div>
            </div>
    )

}