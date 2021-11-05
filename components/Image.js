export function ContactFileImage(props) {
    return(
        <span className="imageContainer">
            <img src={props.src} alt=""/>
        </span>
    )
}

export function ProfileImage(props) {
    return(
        <span className="profileImageContainer">
            <img src={props.src} alt=""/>
        </span>
    )
}