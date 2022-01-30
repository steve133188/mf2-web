import * as React from "react";
import {Pill} from "../Pill";

const renderChannelsIcon = (channels , width = "24px" , height="24px") =>{

    if(!channels || channels.length==0) return <span>-</span>

    return (channels.map((chan , index )=>{
        return  <img key={index} width={width} height={height} src={`/channel_SVG/${chan}.svg`} alt=""/>
    }))
}

export {renderChannelsIcon}
