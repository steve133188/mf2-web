import {Pill} from "./Pill";
import {ThreeDotsHoriMenu} from "./Menu";

export function ContactBasicInfo(props) {
    return (
        <div className="contactBasicInfo">
            <img className="icon"
                 src={props.icon}
                 alt=""/>
            <div className="contactNameAndPhone">
                <div className="name">{props.name}</div>
                <div className="phone"><img src={props.contactType} alt=""/>
                {`+${data.phone.slice(0,3)} ${data.phone.slice(3)}`}
                </div>
                <Pill color={props.pillColor}>{props.pillContent}</Pill>
            </div>
            <ThreeDotsHoriMenu />
        </div>
    )
}