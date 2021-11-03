import {Pill, PillInIcon} from "./Pill"

export function IconWithPill(props) {
    return (
        <span className="iconPillContainer">
            <img className="iconWithPill" src={props.src} alt=""/>
            <PillInIcon>10</PillInIcon>
        </span>
    )
}
export function Avatar({children, ...props}) {
    const {src} = props;
    return (
        <img src={src} alt="" className={"avatar"}/>
    )
}