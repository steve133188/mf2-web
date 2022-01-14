import React, { useState, useEffect } from 'react'

// pass dayString to this component. it will start count 24hour from dayString
// dayString is a string like date.toIsoString()
export default function CountDownTimer ({dayString,trigger}) {
    const [timeString,setTimeString] = useState(dayString)
    const [timeLeft, setTimeLeft] = useState("");
    const [endTime,setEndTime] =useState()
    
    //add 24 hour
    useEffect(()=>{
        const Time = parseInt((dayString))*1000+86400000
        const lastTime= Time -  Date.parse(new Date())
        
        setEndTime( lastTime+57600000   )
    },[dayString])
    
    useEffect(()=>{
        console.log(endTime,"endtime testeing")
        if(!endTime||endTime<0) return setTimeLeft("00:00:00");
        
                const timerInt = setInterval(()=> {
                    setEndTime(endTime-1000)

                    setTimeLeft(new Date(endTime).toLocaleTimeString())
                    // setTimeLeft(endTime)
                },1000)
        console.log("timer,build")
        return ()=>clearInterval(timerInt)
    },[endTime])

    // const endTime = new Date( lastTime)
    //function calculate the time difference between now and the end time and return it as a string


    return(
       <div className={"confirmationBox"}>
                {/* {endTime.toString()} */}
                {/* <h1>{timeLeft}</h1> */}
                <div className={'tim_timer'} style={{height:"18px"}}>{timeLeft??"00:00:00"}</div>
            </div>
    )

}
