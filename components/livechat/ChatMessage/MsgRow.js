
import { Player,BigPlayButton } from 'video-react';
import Embed from 'react-embed';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import Reply from '../replyBox';
import {API, graphqlOperation} from "aws-amplify";
import {getMessageByMsgId} from "../../../src/graphql/queries";


export default function MsgRow({msg, confirmReply, confirmForward, ...props}) {

    const {user} = useContext(GlobalContext)
    const [isLoading , setIsLoading]  = useState(true)
    const [quote , setQuote ] = useState()
    const [isImageOpen, setImageOpen] = useState(false)

    function isValidURL(text) {
        console.log(text, "input checking ~~")
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        const result = (text.replace(urlRegex, function (url) {
            return "<a href='" + url + "'>" + url + "</a>";
        }))
        console.log(result);
        return result
    };


    const getQuoteMsg = async (msg_id) => {
        const data =await API.graphql(graphqlOperation(getMessageByMsgId, {message_id: msg_id})).then(res => {
            console.log("res.data.getMessageByMsgId.items[0] : ", res.data.getMessageByMsgId.items[0])

            let quoteMsg = res.data.getMessageByMsgId.items[0]
            return quoteMsg
        }).catch(err => {
            console.log("get Quote Msg Error : ", err)
            return null
        })
        if (data) {
            setQuote(data)
            setIsLoading(false)
        }
    }
    useEffect(async ()=>{
        if (msg.hasQuotedMsg) {
            await getQuoteMsg(msg.message_id)
        }
    },[])
    const renderQuote = (msg)=>{
        return (<div>{messageType(msg)}</div>)
    }

    const messageType = (msg) => {
        switch (msg.message_type) {
            case "replyMsg":
                return <div id={"reply" + msg.timestamp} value={msg.timestamp} className={"msg_type_image"}></div>;
            // <div id={"reply" + msg.timestamp} value={msg.timestamp}
            //                 className={"msg_type_image" + (props.replyMsg == msg.timestamp ? " replyActive" : "")}></div>;
            case "sticker":
                return <img id={msg.timestamp}  value={msg.timestamp} className={"imageBox"} src={msg.media_url}/>;
            case "IMAGE":
            case "image":
                if (msg.body) {
                    return <div id={msg.timestamp} value={msg.timestamp}
                                className={"msg_type_imageCaption" }>
                        {/*{props.replyMsg&&<Reply confirmReply={confirmReply} confirmForward={confirmForward}/>}*/}
                        <img id={msg.timestamp} className={"imageBox"} src={msg.media_url} onClick={() => {
                            setImageOpen(!isImageOpen)
                        }}/>
                            <div className={"content"}>{msg.body}</div>
                    </div>
                }else{
                    return <img id={msg.timestamp}className={"imageBox"}src={msg.media_url}/>
                }
            case "VIDEO":
            case "video":
                return <>
                    <Player className={"videoBox"} playsInline fluid={false}  muted={true}>
                        <BigPlayButton position="center"/>
                        <source src={msg.media_url} type="video/mp4"/>
                    </Player>
                    {msg.body&& <div id={msg.timestamp}
                                     value={msg.timestamp}
                                     className={"imageMessage"}
                    >
                        {msg.body}
                    </div>}
                    </>;

            case "ptt":
            case "voice" :
                return <audio id={msg.timestamp}  value={msg.timestamp} className={"voice_detail"} controls src={msg.media_url}></audio>;

            case "FILE":
            case "file":
            case "document":
                return <div id={msg.timestamp}  className={"attachmentBox msg_type_attachment"}>
                        <svg id={msg.timestamp}  xmlns="http://www.w3.org/2000/svg" width="35"
                             height="35" viewBox="0 0 35 35">
                            <g id="Mask_Group_62" data-name="Mask Group 62" transform="translate(-2746 -1111)">
                                <rect id="Background-2" data-name="Background" width="35" height="35"
                                      transform="translate(2746 1111)" fill="none"/>
                                <path id="Path_34405" data-name="Path 34405"
                                      d="M973.181,507.951h0a1.148,1.148,0,0,0-1.1,1.1v14.067a5.318,5.318,0,0,1-4.667,5.362c-.175.017-.348.026-.519.026a5.141,5.141,0,0,1-5.13-4.651,4.806,4.806,0,0,1-.028-.52V506.919a3.306,3.306,0,0,1,2.849-3.349,3.222,3.222,0,0,1,.333-.017,3.168,3.168,0,0,1,3.156,2.846,2.922,2.922,0,0,1,.017.338v13.951a1.189,1.189,0,0,1-1.222,1.144h0a1.19,1.19,0,0,1-1.145-1.14V509.048a1.144,1.144,0,0,0-1.182-1.1h0a1.146,1.146,0,0,0-1.1,1.1v11.438a3.6,3.6,0,0,0,3.1,3.644,3.468,3.468,0,0,0,3.81-3.09c.012-.12.017-.242.017-.364V506.956a5.607,5.607,0,0,0-4.927-5.656c-.18-.017-.359-.026-.536-.026a5.436,5.436,0,0,0-5.429,4.93c-.016.174-.023.348-.025.523v16.3a7.655,7.655,0,0,0,6.723,7.737c.247.025.493.036.735.036a7.431,7.431,0,0,0,7.416-6.736c.023-.241.035-.484.035-.728V509.048A1.144,1.144,0,0,0,973.181,507.951Z"
                                      transform="translate(1796.697 612.626)" className={"attachmentPinLogo"}
                                      fill="#2198fa"/>
                            </g>
                        </svg>
                        <a id={msg.timestamp} className={"attachmentBody"} href={msg.media_url} download>{msg.body}</a>
                        </div>;

            case "link":
                return <a href={msg.body}>{msg.body} </a> ;

            default:
                return <div className={"content"}>{msg.body}</div>

        }
    }


    return (
        <div className={"msg_row "+(msg.from_me&&"msg_from_me")} id={msg.timestamp}>
            {/*Message body start*/}
            <div className={"msg_body "}>
                {msg.hasQuotedMsg ?
                    <>
                        <div className={msg.hasQuotedMsg ? 'reply_box' : ""}>{isLoading ?"wait for content":messageType(quote)}</div>
                        <div className={msg.hasQuotedMsg ? 'reply' : ""}>{messageType(msg)}</div>
                    </>
                    : messageType(msg)}
            </div>
            {/*Message body end*/}
            {/*Timestamp start*/}
            {/*<div className={"msg_footer"}>*/}
                    <div
                    className={"msg_timestamp"}>
                        {msg.sender && msg.from_me && msg.sign_name}
                        &ensp; {new Date(parseInt(msg.timestamp * 1000)).toDateString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                })} &ensp; {new Date(parseInt(msg.timestamp * 1000)).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                })} </div>
            {/*</div>*/}
            {/*Timestamp end*/}
        </div>
    )
}

