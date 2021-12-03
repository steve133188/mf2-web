export default function BackToLogin(props){
    return(
        <button className={"send_button align-self-center"}  onClick={props.onclick}>
        <p className={"bottomName"}style={ {color: "#FFF"}}>{props.name}</p> 
</button>
    )
}