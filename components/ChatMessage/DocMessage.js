export function DocMessage(props){
    return(
        <div>
            <a href={props.attachment.url}>{props.attachment.name}</a>
        </div>
    )
}