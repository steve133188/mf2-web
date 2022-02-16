
import { CheckBoxM,Whatsapp,WhatsappB,Messager,Wechat } from "../../../../public/livechat/MF_LiveChat_Landing/Search_Bar/filter-icon";

export default function ChannelListItem(  props){
// console.log(props)

    return(<>
        <div className={"channelListitem"} style={{padding:0}}>
                        <div className={"left"}>
                        <img className={"serachSVG"} src={`/channel_SVG/${props.name}.svg`} />
                        <div style={{margin:"0 5px", minWidth:"180px"}}> {props.name}</div>
                        </div>
                        <div className={"right"} style={{width:"24",height:"24"}}>
                        <div className="newCheckboxContainer right" style={{width:"24",height:"24"}}>
                                        <label className="newCheckboxLabel">
                                        <input type="checkbox"
                                                id={props.id}
                                                value={props.value}
                                                name={props.name}
                                                checked={props.checked}
                                                onChange={()=>{}}
                                                onClick={props.onclick}
                                                />
                                        </label>
                                    </div>
                        </div>
                    </div>
    </>)
}
