export function ImageMessage(props){
    return(
        <div className="ImageMessageContainer">
            <a href={props.img.url}>
                <img src={props.img.src} alt={props.img.alt} />
            </a>
            {props.img.text ? <span className="ImageMessageText">{props.img.text}</span> : ""}
        </div>
    )
}