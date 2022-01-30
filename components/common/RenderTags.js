import * as React from "react";
import {Pill} from "../Pill";

const renderTags = (tids , tags) =>{
    if(!tids||tids.length==0) return <span>-</span>

    return (tids.map(t =>{
        return tags.find(tag=>{
            return tag.tag_id == t
        })
    }).map((tag , index )=>{
        return  <Pill key={index}  color="lightBlue">{tag.tag_name}</Pill>
    }))
}

export {renderTags}
