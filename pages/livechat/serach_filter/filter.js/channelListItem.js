
import { CheckBoxM,Whatsapp,WhatsappB,Messager,Wechat } from "../../../../public/livechat/MF_LiveChat_Landing/Search_Bar/filter-icon";

export default function ChannelListItem(props){
// console.log(props)

    return(<>
        <div className={"channelListitem"}>
                        <div className={"left"}>
                        <img className={"serachSVG"} src={`livechat/MF_LiveChat_Landing/Search_Bar/MF_LiveChat_Filter/${props.value}.svg`} />
                        <div style={{margin:"0 5px"}}> {props.name}</div>
                        </div>
                        <div className={"right"}>
                        {/* <label className={"status_box"}>
                            <input type="checkbox" name="bot_check" />
                            <span className={"checkboxStyle"}></span>
                            <span className={"checkboxStyleout"}> </span>
                        </label> */}
                        <div className="newCheckboxContainer right">
                                        <label className="newCheckboxLabel"> 
                                        <input type="checkbox" 
                                                id={props.key} 
                                                name="checkbox" 
                                                // checked={} 
                                                onClick={()=>{props.id<=0?checked=!checked:""}} 
                                                />
                                        </label>
                                    </div>
                        </div>
                    </div>
    </>)
}