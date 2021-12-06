export function ChatBubble(props){
    const chatMessageDirection = props.direction + "ChatMessages"
    const MessageTime = props.messageTime

    return(
        <div className={chatMessageDirection}>
            <div className="chatBubble">
                {props.children}
            </div>
            <div className="messageTime">{MessageTime}</div>
        </div>
    )
}