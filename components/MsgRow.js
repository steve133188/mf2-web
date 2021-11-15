export default function MsgRow({msg ,...props}){


    return(
        <div className={"msg_row"}>
            <div className={msg.fromMe?"msg_from_me":"msg_from_other"}>
                <div className={"msg_body"}>{msg.body}</div>
                <div className={"msg_timestamp"}>{msg.timestamp}</div>
            </div>
        </div>
    )
}