import { ChatBubble } from "./ChatBubble";
import { DocMessage } from "./DocMessage";
import { ImageMessage } from "./ImageMessage";
import { TextOnlyMessage } from "./TextOnlyMessage";

export function ChatMessage (props) {
    var children;
    switch (props.messsageType) {
        case "text":
            children = (
                <TextOnlyMessage text={props.text}></TextOnlyMessage>
            )
            break;
        case "image":
            children = (
                <ImageMessage img={props.img}></ImageMessage>
            )
            break;
        case "doc":
            children = (
                <DocMessage attachment={props.attachment}></DocMessage>
            )
            break;
    }
    return (
        <ChatBubble direction={props.direction} messageTime={props.messageTime}>
            {children}
        </ChatBubble>
    )
    
}