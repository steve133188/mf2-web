import React, { useState, useEffect } from 'react'

// pass dayString to this component. it will start count 24hour from dayString
// dayString is a string like date.toIsoString()
export default function CountDownTimer ({dayString,timeCount}) {
    const [timeString,setTimeString] = useState(dayString)
    const [timeLeft, setTimeLeft] = useState("");
    const [endTime,setEndTime] =useState()
    const [startCount , setCount] =useState(false);
    
    //add 24 hour
    useEffect(()=>{
        const Time = (parseInt(dayString)+86400)*1000
        const lastTime= Time -  Date.parse(new Date())
        if(lastTime>0) timeCount(true)
        setEndTime( lastTime  )
        setCount(true);
    },[dayString])
    
    useEffect(()=>{
        if(!startCount){return}
        if(!endTime||endTime<0) {timeCount(false);setTimeLeft("00:00:00");return }
        
                const timerInt = setInterval(()=> {
                    setEndTime(endTime-1000)
                    setTimeLeft(getTimeRemaining(endTime))
                    // setTimeLeft(endTime)
                },1000)
        return ()=>clearInterval(timerInt)
    },[endTime])

    // const endTime = new Date( lastTime)
    //function calculate the time difference between now and the end time and return it as a string
    function getTimeRemaining(endTime) {
        
        if(endTime> 0){
        const seconds = Math.floor((endTime / 1000) % 60);
        const minutes = Math.floor((endTime / 1000 / 60) % 60);
        const hours = Math.floor((endTime / (1000 * 60 * 60)) % 24);
        const ans= hours+":"+minutes+":"+seconds;
        // return total;
        return ans;
        }else if(total <0){
        return "00:00:00";}
        else{
            return 
        }
    }


    return(
       <div className={"confirmationBox"}>
                {/* {endTime.toString()} */}
                {/* <h1>{timeLeft}</h1> */}
                <div className={'tim_timer'} style={{height:"18px"}}>{timeLeft}</div>
            </div>
    )

}
