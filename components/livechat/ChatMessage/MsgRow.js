
import { Player,BigPlayButton } from 'video-react';
import Embed from 'react-embed';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import Reply from '../replyBox';


const imageCaption = {
    url:"https://p0.pikrepo.com/preview/876/531/orange-tabby-cat-sitting-on-green-grasses-selective-focus-photo.jpg",
    message:"hahaha"
}
const captionJson = JSON.stringify(imageCaption)

export default function MsgRow({msg,isSearch,refProp,replyHandle,confirmReply ,...props}){

    const { user }  = useContext(GlobalContext)

    const [isImageOpen,setImageOpen] = useState(false)


    const replyclick=e=>{

        replyHandle(e.target.id);

    }
    const defaultId=msg.room_id+msg.timestamp
    const messageType = (msg)=>{
        // console.log(defaultId,"defaultId defaultId",msg.room_id,"sadasdsad",msg.timestamp)
        switch(msg.message_type){
            case "replyMsg":   return <div id={"reply"+defaultId} className={"msg_type_image"  +( props.replyMsg==defaultId?" replyActive":"")}>  {props.replyMsg==defaultId? <Reply confirmReply={confirmReply} />:""}<img id={defaultId} onClick={replyclick}  className={"imageBox"} src={msg.media_url}/></div> ;
            case "sticker": return (<div className={"msg_type_sticker" +( props.replyMsg==defaultId?" replyActive":"")}>
                                        {props.replyMsg==defaultId? <Reply confirmReply={confirmReply} />:""}
                                        <img id={defaultId}   className={"imageBox"} src={msg.media_url}/>
                                    </div>);

            case "IMAGE":
            case "image":
                if(msg.body.length>0){
                    return <div id={defaultId} onClick={replyclick} className={"msg_type_imageCaption"  +( props.replyMsg==defaultId?" replyActive":"")}> {props.replyMsg==defaultId?<Reply confirmReply={confirmReply} />:""}
                        {/* {console.log(JSON.parse(captionJson).url)} */}
                                {/* JSON.parse({msg.body}) */}
                                {/* // <div value={msg.timestamp}  className={"msg_type_imageCaption"}> */}
                                    {/* <img className={"bigImageBox"} src={msg.media_url} onClick={()=>{setImageOpen(!isImageOpen)}} style={isImageOpen?{ display:'block'}:{display:'none'}}/> */}
                                    <img id={defaultId}   className={"imageBox"} src={msg.media_url} onClick={()=>{setImageOpen(!isImageOpen)}}/>
                                    <div id={defaultId} onClick={replyclick}  className={"imageMessage"}>
                                    <div className={"imageMessage"} style={{background: "white 0% 0% no-repeat padding-box",borderRadius:"10px"}}>{msg.body}</div></div>
                                </div>
                }
                return <div id={defaultId}  className={"msg_type_image"  +( props.replyMsg==defaultId?" replyActive":"")}> {props.replyMsg==defaultId?<Reply confirmReply={confirmReply} />:""}<img id={defaultId}   className={"imageBox"} src={msg.media_url}/></div> ;
            case "imageCaption":
                return <div id={defaultId} onClick={replyclick} className={"msg_type_imageCaption"  +( props.replyMsg==defaultId?" replyActive":"")}> {props.replyMsg==defaultId?<Reply confirmReply={confirmReply} />:""}
                        {/* {console.log(JSON.parse(captionJson).url)} */}
                                {/* JSON.parse({msg.body}) */}
                                {/* // <div value={msg.timestamp}  className={"msg_type_imageCaption"}> */}
                                    <img className={"bigImageBox"} src={JSON.parse(captionJson).url}  onClick={()=>{setImageOpen(!isImageOpen)}} style={isImageOpen?{ display:'block'}:{display:'none'}}/>
                                    <img id={defaultId} className={"imageBox"} src={JSON.parse(captionJson).url} onClick={()=>{setImageOpen(!isImageOpen)}}/>
                                    <div id={defaultId} onClick={replyclick}  className={"imageMessage"}>{JSON.parse(captionJson).message}</div>
                                </div>

            case "VIDEO":
            case "video":
                return <div id={defaultId}  className={"msg_type_video"  +( props.replyMsg==defaultId?" replyActive":"")}> {props.replyMsg==defaultId?<Reply confirmReply={confirmReply} />:""}
                    {/* <iframe allowFullScreen className={"videoBox"} src={msg.body}  /> */}
                    <Player   className={"videoBox"} playsInline fluid={false} width={360} muted={true}>
                        <BigPlayButton position="center" />
                                    <source  id={defaultId}  src={msg.media_url}   type="video/mp4"/>
                    </Player>
                    </div>
            case "ptt":
            case "voice" :
                return <div id={defaultId} onClick={replyclick} className={"msg_type_voice "  +( props.replyMsg==defaultId?" replyActive":"")}> {props.replyMsg==defaultId?<Reply confirmReply={confirmReply} />:""}
                                            <audio id={defaultId} onClick={replyclick}  className={"voice_detail"} controls src={msg.media_url} ></audio>
                                </div>;
            case "FILE":
            case "file":
            case "document":
                return  <div id={defaultId} onClick={replyclick}  className={"msg_type_attachment"  +( props.replyMsg==defaultId?" replyActive":"")}> {props.replyMsg==defaultId?<Reply confirmReply={confirmReply} />:""}
                            <div className={"attachmentBox"}>
                                <svg xmlns="http://www.w3.org/2000/svg"  width="35" height="35" viewBox="0 0 35 35" >
                                        <g id="Mask_Group_62" data-name="Mask Group 62" transform="translate(-2746 -1111)" >
                                            <rect id="Background-2" data-name="Background" width="35" height="35" transform="translate(2746 1111)" fill="none"/>
                                            <path id="Path_34405" data-name="Path 34405" d="M973.181,507.951h0a1.148,1.148,0,0,0-1.1,1.1v14.067a5.318,5.318,0,0,1-4.667,5.362c-.175.017-.348.026-.519.026a5.141,5.141,0,0,1-5.13-4.651,4.806,4.806,0,0,1-.028-.52V506.919a3.306,3.306,0,0,1,2.849-3.349,3.222,3.222,0,0,1,.333-.017,3.168,3.168,0,0,1,3.156,2.846,2.922,2.922,0,0,1,.017.338v13.951a1.189,1.189,0,0,1-1.222,1.144h0a1.19,1.19,0,0,1-1.145-1.14V509.048a1.144,1.144,0,0,0-1.182-1.1h0a1.146,1.146,0,0,0-1.1,1.1v11.438a3.6,3.6,0,0,0,3.1,3.644,3.468,3.468,0,0,0,3.81-3.09c.012-.12.017-.242.017-.364V506.956a5.607,5.607,0,0,0-4.927-5.656c-.18-.017-.359-.026-.536-.026a5.436,5.436,0,0,0-5.429,4.93c-.016.174-.023.348-.025.523v16.3a7.655,7.655,0,0,0,6.723,7.737c.247.025.493.036.735.036a7.431,7.431,0,0,0,7.416-6.736c.023-.241.035-.484.035-.728V509.048A1.144,1.144,0,0,0,973.181,507.951Z" transform="translate(1796.697 612.626)" className={"attachmentPinLogo"} fill="#2198fa"/>
                                        </g>
                                    </svg>
                                {/*<a id={defaultId}  className={"attachmentBody"} href={msg.media_url} download>{msg.body||msg.media_url.slice(0,25)+"..."}</a>*/}
                                <a id={defaultId}  className={"attachmentBody"} href={msg.media_url} download>{msg.body}</a>
                            <div className={"attachmentSize"}>{msg.media_url.slice(-4)}</div>
                            </div>
                     </div>;
            case "link": return <div id={defaultId} onClick={replyclick} className={"url_body"  +( props.replyMsg==defaultId?" replyActive":"")}> {props.replyMsg==defaultId?<Reply confirmReply={confirmReply} />:""}
                                    <div className={"url_box"}>
                                        <div className={"url_detail"} >
                                            <Embed   url={msg.body} />
                                            </div>
                                        <div  id={defaultId} onClick={replyclick} className={"msg_type_url" +( props.replyMsg==defaultId?" replyActive":"")}> {props.replyMsg==defaultId?<Reply confirmReply={confirmReply} />:""}<a id={defaultId} onClick={replyclick} href={msg.body}>{msg.body} </a></div>
                                    </div>
                                </div>;

            default:   return  <div id={defaultId} onClick={replyclick}  value={msg.timestamp} className={isSearch?"msg_body_highligh":"msg_body" +( props.replyMsg==defaultId?" replyActive":"")}> {props.replyMsg==defaultId?<Reply confirmReply={confirmReply} />:""}{msg.body}</div>
            // default:   return  <div value={msg.timestamp} className={isSearch?"msg_body_highligh":"msg_body"}>{msg.body}</div>



        }
    }

    return(
        <div className={"msg_row"} id={msg.timestamp} >
            <div className={msg.from_me?"msg_from_me":"msg_from_other"}>
                <div>{messageType(msg)}</div>
                {/* <div className={"msg_body"}>{msg.body}</div> */}
                {/* {props.c.map(e=>{return msg.sender==e.phone?console.log("I find it",e.phone):msg.sender})} */}

                {/*{msg.sender&&msg.from_me&&<div className={"msg_timestamp"}>+{msg.sender.slice(0,3)} {msg.sender.slice(3)}__{new Date(parseInt(msg.timestamp*1000)).toLocaleTimeString()} </div>}*/}
                {msg.sender&&msg.from_me&&<div className={"msg_timestamp"}>{user.user.username}&ensp; {new Date(parseInt(msg.timestamp*1000)).toDateString('en-US', { hour: '2-digit', minute: '2-digit' })} &ensp; {new Date(parseInt(msg.timestamp*1000)).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} </div>}
                {/*{msg.sender&&!msg.from_me&&<div className={"msg_timestamp"}>{props.c.filter(e=>{return parseInt(msg.sender)==e.customer_id?true:false})[0].name} &ensp;  {new Date(parseInt(msg.timestamp*1000)).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} </div>}*/}
                {msg.sender&&!msg.from_me&&<div className={"msg_timestamp"}> &ensp;  {new Date(parseInt(msg.timestamp*1000)).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} </div>}
            </div>
        </div>
    )
}

