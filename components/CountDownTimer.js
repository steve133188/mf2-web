import React, { useState, useEffect } from 'react'

// pass dayString to this component. it will start count 24hour from dayString
// dayString is a string like date.toIsoString()
export default function CountDownTimer ({dayString,trigger}) {
    const [timeString,setTimeString] = useState(dayString)
    const [timeLeft, setTimeLeft] = useState();
    const [endTime,setEndTime] =useState()
    
    //add 24 hour
    useEffect(()=>{
        const Time = new Date(parseInt(dayString)*1000)
        const lastTime= Time.setDate(Time.getDate()+1)
        
        setEndTime(new Date( lastTime))
    },dayString)
    // const endTime = new Date( lastTime)
    //function calculate the time difference between now and the end time and return it as a string
    function getTimeRemaining(endTime) {

        const total = Date.parse(endTime) - Date.parse(new Date());
        
        if(total> 0){
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const ans= hours+":"+minutes+":"+seconds;
        // return total;
        return ans;
        }else if(total <=0){
        return "00:00:00";}
        else{
            return 
        }
    }

    useEffect(() => {
        setInterval(()=> {
            setTimeLeft(getTimeRemaining(endTime))
        },1000)
        console.log("timer,build")
    },[trigger]);

    return(
       <div className={"confirmationBox"}>
                {/* {endTime.toString()} */}
                {/* <h1>{timeLeft}</h1> */}
                <div className={'tim_timer'} style={{height:"18px"}}>{timeLeft}</div>
            </div>
    )

}
