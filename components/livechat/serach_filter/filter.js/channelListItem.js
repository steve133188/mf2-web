
import { CheckBoxM,Whatsapp,WhatsappB,Messager,Wechat } from "../../../../public/livechat/MF_LiveChat_Landing/Search_Bar/filter-icon";

export default function ChannelListItem(  props){
// console.log(props)

    return(<>
        <div className={"channelListitem"}>
                        <div className={"left"}>
                       
                    <img key={"id"} width="32px" height="32px" src={`/channel_SVG/${props.channel}.svg`}  hidden={false}  alt=""/>
                        <div style={{margin:"0 5px", minWidth:"180px"}}> {props.name}</div>
                        </div>
                        <div className={"right"}>
                        <div className="newCheckboxContainer right">
                                        <label className="newCheckboxLabel"> 
                                        <input type="checkbox" 
                                                id={props.value} 
                                                value={props.value} 
                                                name="checkbox" 
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