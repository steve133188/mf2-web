import Player from "video-react/lib/components/Player";
import BigPlayButton from "video-react/lib/components/BigPlayButton";
import {
    Mask_Group_3,
    Mask_Group_4,
    MaskGroup1,
    MaskGroup2,
    SendButton,
    VoiceMsg
} from "../../../public/livechat/MF_LiveChat_Landing/chat_svg";
import {Picker} from "emoji-mart-next";
import StickerBox from "../sticker/sticker_box";
import QuickReply from "../quickReply/quickreply";
import {useContext, useEffect, useRef, useState} from "react";
import {GlobalContext} from "../../../context/GlobalContext";
import MFToggleButtonGroup from "../../common/ToggleButtonGroup/MFToggleButtonGroup";
import axios from "axios";
import {inject ,observer} from "mobx-react";
import {useRootStore} from "../../../utils/provider/RootStoreProvider";


function ChatroomFooter(props){

    const {disabled , stickers} = props
    // const {mediaInstance, user , messageInstance , chatHelper  ,selectedChat , getUserChannel} = useContext(GlobalContext)
    const {mediaActionsStore , authStore:{isAuth , user} , messageActionsStore , chatListStore:{selectedChat} } = useRootStore()
    const [isExpand , setIsExpand] = useState(false)
    const [isReply , setIsReply] = useState(false)
    const filePreviewOldState = {name:"",size:0,type:""}
    const [filePreview,setFilePreview] = useState(filePreviewOldState)
    const [ChatButtonOn,setChatButtonOn] = useState("")
    const [replyData ,setReplyData] = useState([])
    const [isEmojiOn,setEmojiOn] = useState(false)
    const [hasMedia, setHasMedia] = useState(false);
    const [whatsappUrl, setWhatsappUrl] = useState("");
    let initTypedMsg ={
        channel:selectedChat.channel,
        phone:parseInt(selectedChat.phone) ,
        message:"",
        message_type:"TEXT" ,
        is_media:false ,
        media_url:'',
        sign_name:user.username,
        room_id:selectedChat.room_id
    }
    const [typedMsg , setTypedMsg] = useState(initTypedMsg)

    const wrapperRef1 = useRef();

    const attachFile = useRef()
    useEffect(()=>{
        if(ChatButtonOn!="m3") setFilePreview(filePreviewOldState)
    },[ChatButtonOn])






    // const tabChildren = [
    //     <><MaskGroup1/></>,
    //     <><MaskGroup2/></>,
    //     <><input type="file" name="fileAttach" ref={attachFile} onChange={upload} ></input>
    //     <Mask_Group_3/></>,
    //     <><Mask_Group_4/></>
    // ]
    //
    // const initToggleDate = [
    //     {name:"sticker" ,value:"sticker"},
    //     {name:"emoji" ,value:"emoji"},
    //     {name:"image" ,value:"image"},
    //     {name:"document",value: "document"}
    // ]


    // const handleChatButtonOnChange = (e)=>{
    //     setChatButtonOn(e.target.value)
    // }

    const sendMessageToClient = async e=>{
        e.preventDefault()
        console.log("selected Chat",selectedChat)
        if(typedMsg.message ==""&&typedMsg.media_url=="" &&!hasMedia) return
        const data = {...typedMsg }
        // console.log("data",selectedChat)
        setTypedMsg({...typedMsg , message: ""})
        if(hasMedia){
            setFilePreview(filePreviewOldState)
        }
        setTypedMsg(initTypedMsg)
        setIsExpand(false)
        setIsReply(false)
        setChatButtonOn("")
        const res = await messageActionsStore.sendMessage(data).catch(error => console.log(error))
        console.log("data sent out :" , data)
    }
    const toggleQuickReply = () =>{
        setChatButtonOn(ChatButtonOn=="m4"?"":"m4");
        setIsExpand(isExpand&&ChatButtonOn=="m4"?false:true);
    }

    const toggleReply = () =>{
        setChatButtonOn(ChatButtonOn=="mr");
        setIsExpand(true);
    }
    const toggleSticker = () =>{
        setChatButtonOn(ChatButtonOn=="m1"?"":"m1");
        setIsExpand(isExpand&&ChatButtonOn=="m1"?false:true);
    }
    const toggleEmoji = () =>{
        setChatButtonOn(ChatButtonOn=="m2"?"":"m2");
        setEmojiOn(!isEmojiOn);
        setIsExpand(false);
    }
    const toggleFile= e =>{
        if(filePreview.size<2||!filePreview){
            setChatButtonOn(ChatButtonOn=="m3"?"":"m3");
            setIsExpand(false);
        }
        fileAttach()
    }
    const upload = async (e) =>{
        e.preventDefault()
        if(!e.target.files[0]){return}
        const file = e.target.files[0]
        const filetype =  messageActionsStore.mediaTypeHandler(file)
        const path =URL.createObjectURL(file)
        setHasMedia(true)
        setIsExpand(true);
        setChatButtonOn("m3");
        if(filetype.includes("image")){
            const result = await mediaActionsStore.putImg(file , filetype)
            setFilePreview({ name: file.name, size: file.size, type: "IMAGE", path: path,time:new Date() });
            // setMediaUrl(result)
            setTypedMsg({...typedMsg ,message_type: "IMAGE" , media_url: result})
        }
        if(filetype.includes("video")){
            const result = await mediaActionsStore.putVideo(file , filetype)
            setFilePreview({name:file.name,size:file.size,type:"VIDEO",path:path})
            // setMediaUrl(result)
            setTypedMsg({...typedMsg ,message_type: "VIDEO" , media_url: result})
        }
        if(filetype.includes("audio")){
            const result = await mediaActionsStore.putVoice(file , filetype)
            setFilePreview({name:file.name,size:file.size,type:"AUDIO",path:path})
            setTypedMsg({...typedMsg ,message_type: "AUDIO" , media_url: result})
        }
        if(filetype.includes("document")){
            const result = await mediaActionsStore.putDoc(file , filetype)
            setFilePreview({name:file.name,size:file.size,type:"FILE",path:path})
            // setMediaUrl(result)
            setTypedMsg({...typedMsg ,message_type: "FILE" , message:file.name , media_url: result})
        }

    }
    const stickerSend =  async e=>{
        e.preventDefault();
        console.log(selectedChat,"sticker for chat")
        console.log(e.target,"sticker")
        const imagetype= selectedChat.channel=="WABA"?"image":"sticker"
        console.log(imagetype)
        const data = {media_url:e.target.src , message:"", phone : selectedChat.phone ,room_id:selectedChat.room_id,message_type:imagetype,channel:selectedChat.channel,sign_name:user.user.username }
        // const res = await messageInstance.sendMessage(data)
        const res = await sendMessage(data)
        setTypedMsg({...typedMsg , message: ""})
        setChatButtonOn("");
        setIsExpand(false)
    }
    const onEnterPress = async (e) => {

        if(e.keyCode == 13 && !e.shiftKey) {
            e.preventDefault();
            await sendMessageToClient(e)
        }

    }
    const toggleM5 = () =>{
        setChatButtonOn(ChatButtonOn=="m5"?"":"m5");
        setIsExpand(false);
    }

    const handleTypedMsg = e =>{
        const {name , value} = e.target
        setTypedMsg({
            ...typedMsg,
            [name]:value
        })
    }

    const fileAttach = () =>{
        attachFile.current.click();
    }
    const fileClear = () =>{
        attachFile.current.value = null
    }
    const replySelect = async(e) =>{
        e.preventDefault();
        setTypedMsg({...typedMsg , message: e.target.innerHTML})
    }

    return(
        <div className={"chatroom_input_field "+(isExpand?"expand":"")+(isReply?"replyArea":"")} ref={wrapperRef1} >

            { ChatButtonOn=="m3"?
                <div style={{display:(filePreview.size >= 1 ?"flex":"none"), padding:"1.5rem 1rem 0" }} >
                    {/* <div style={{backgroundColor:"blue",width:"100%",height:"100px"}}></div> */}
                    {/* <div>{filePreview.name} </div> */}

                    {filePreview.type=="IMAGE"? <div style={{display:"flex"}} className="attachment_box">
                        <div>
                            <img src={filePreview.path} style={{width:"100px",height:"100px", margin:"0 15px"}}/>
                        </div>
                        <div>
                            <div>{filePreview.type}</div>
                            <div>{filePreview.size/1000}kb</div>
                        </div>
                    </div>:""}
                    {filePreview.type=="VIDEO"?<div style={{display:"flex"}} className="attachment_box">
                        <div>
                            <div style={{display:"flex",alignItems:"center",margin:"0 15px"}}>
                                <Player   className={"videoBox"} playsInline fluid={false} width={150} height={100} muted={true}>
                                    <BigPlayButton position="center" />
                                    <source  id={filePreview.name} src={filePreview.path}  onClick={e=>e.preventDefault} type="video/mp4" />
                                </Player>
                                {/* <svg xmlns="http://www.w3.org/2000/svg"  width="35" height="35" viewBox="0 0 35 35" >
                                                                                                <g id="Mask_Group_62" data-name="Mask Group 62" transform="translate(-2746 -1111)" >
                                                                                                    <rect id="Background-2" data-name="Background" width="35" height="35" transform="translate(2746 1111)" fill="none"/>
                                                                                                    <path id="Path_34405" data-name="Path 34405" d="M973.181,507.951h0a1.148,1.148,0,0,0-1.1,1.1v14.067a5.318,5.318,0,0,1-4.667,5.362c-.175.017-.348.026-.519.026a5.141,5.141,0,0,1-5.13-4.651,4.806,4.806,0,0,1-.028-.52V506.919a3.306,3.306,0,0,1,2.849-3.349,3.222,3.222,0,0,1,.333-.017,3.168,3.168,0,0,1,3.156,2.846,2.922,2.922,0,0,1,.017.338v13.951a1.189,1.189,0,0,1-1.222,1.144h0a1.19,1.19,0,0,1-1.145-1.14V509.048a1.144,1.144,0,0,0-1.182-1.1h0a1.146,1.146,0,0,0-1.1,1.1v11.438a3.6,3.6,0,0,0,3.1,3.644,3.468,3.468,0,0,0,3.81-3.09c.012-.12.017-.242.017-.364V506.956a5.607,5.607,0,0,0-4.927-5.656c-.18-.017-.359-.026-.536-.026a5.436,5.436,0,0,0-5.429,4.93c-.016.174-.023.348-.025.523v16.3a7.655,7.655,0,0,0,6.723,7.737c.247.025.493.036.735.036a7.431,7.431,0,0,0,7.416-6.736c.023-.241.035-.484.035-.728V509.048A1.144,1.144,0,0,0,973.181,507.951Z" transform="translate(1796.697 612.626)" className={"attachmentPinLogo"} fill="#2198fa"/>
                                                                                                </g>
                                                                                            </svg> */}
                            </div>
                        </div>
                        <div>
                            <div style={{fontSize:"18px"}}>{filePreview.type}</div>
                            <div>{filePreview.name}</div>
                            <div>{filePreview.size/1000}kb</div>
                        </div>
                    </div>:""}
                    {filePreview.type=="AUDIO"?<div className="attachment_box" style={{display:"flex",background: "#D0E9FF 0% 0% no-repeat padding-box",borderRadius:" 10px",padding:"1rem"}}>
                        <div  style={{margin:"0 15px",fill:"#2198fa"}}>
                            <VoiceMsg size={20} />
                        </div>
                        <div>
                            <div>{filePreview.type}</div>
                            <div>{filePreview.size/1000}kb</div>
                        </div>
                    </div>:""}
                    {filePreview.type=="FILE"?<div className="attachment_box" style={{display:"flex",background: "#D0E9FF 0% 0% no-repeat padding-box",borderRadius:" 10px",padding:"1rem"}}>
                        <div style={{display:"flex",alignItems:"center"}}>
                            <svg xmlns="http://www.w3.org/2000/svg"  width="35" height="35" viewBox="0 0 35 35" >
                                <g id="Mask_Group_62" data-name="Mask Group 62" transform="translate(-2746 -1111)" >
                                    <rect id="Background-2" data-name="Background" width="35" height="35" transform="translate(2746 1111)" fill="none"/>
                                    <path id="Path_34405" data-name="Path 34405" d="M973.181,507.951h0a1.148,1.148,0,0,0-1.1,1.1v14.067a5.318,5.318,0,0,1-4.667,5.362c-.175.017-.348.026-.519.026a5.141,5.141,0,0,1-5.13-4.651,4.806,4.806,0,0,1-.028-.52V506.919a3.306,3.306,0,0,1,2.849-3.349,3.222,3.222,0,0,1,.333-.017,3.168,3.168,0,0,1,3.156,2.846,2.922,2.922,0,0,1,.017.338v13.951a1.189,1.189,0,0,1-1.222,1.144h0a1.19,1.19,0,0,1-1.145-1.14V509.048a1.144,1.144,0,0,0-1.182-1.1h0a1.146,1.146,0,0,0-1.1,1.1v11.438a3.6,3.6,0,0,0,3.1,3.644,3.468,3.468,0,0,0,3.81-3.09c.012-.12.017-.242.017-.364V506.956a5.607,5.607,0,0,0-4.927-5.656c-.18-.017-.359-.026-.536-.026a5.436,5.436,0,0,0-5.429,4.93c-.016.174-.023.348-.025.523v16.3a7.655,7.655,0,0,0,6.723,7.737c.247.025.493.036.735.036a7.431,7.431,0,0,0,7.416-6.736c.023-.241.035-.484.035-.728V509.048A1.144,1.144,0,0,0,973.181,507.951Z" transform="translate(1796.697 612.626)" className={"attachmentPinLogo"} fill="#2198fa"/>
                                </g>
                            </svg>
                            <div>{filePreview.name}</div>
                            <div>
                                <div>{filePreview.type}</div>
                                <div>{filePreview.size/1000}kb</div>
                            </div>
                        </div>
                    </div>:""}

                </div>:""
            }
            <textarea  disabled={disabled} onKeyDown={onEnterPress}  className={"chatroom_textField"} placeholder={"Type something..."} name="message" id="message" value={typedMsg.message} onChange={handleTypedMsg} style={{display:(ChatButtonOn=="m1"?"none":"block"),backgroundColor:(ChatButtonOn=="m4"?"#ECF2F8":"") ,borderRadius: "10px"}} >
                    </textarea>
            <Picker  onSelect={(emoji)=> {
                setTypedMsg({...typedMsg,message: typedMsg.message+" "+emoji.native+" "})
            }} style={ChatButtonOn=="m2"?{display:'block',position: 'absolute', bottom: '90px'}:{display:'none' }} />
            <div  disabled={disabled} style={{maxWidth:"95%",display:(ChatButtonOn=="m1"?"block":"none"),whiteSpace: 'nowrap' }}  >
                <StickerBox data={stickers} stickerSend={stickerSend}  />
            </div>
            <div style={{maxWidth:"95%",height:"100%",display:(ChatButtonOn=="m4"?"block":"none"),whiteSpace: 'nowrap' }} disabled={selectedChat.channel=="WABA"&&!disabled}>
                <QuickReply replyData={replyData} onclick={replySelect} disabled={disabled} />
            </div>

            <div className={"chatroom_input_btn_gp"} >
                <div className={"left_btn_gp"}  >
                    {/*<MFToggleButtonGroup*/}
                    {/*options={initToggleDate}*/}
                    {/*value={ChatButtonOn}*/}
                    {/*onChange={handleChatButtonOnChange}*/}
                    {/*childrenEl={tabChildren}*/}
                    {/*/>*/}
                    <div  className={"sticker_btn"+(ChatButtonOn=="m1"?" active":"")}  style={{pointerEvents:((disabled)?"none":"") , backgroundColor:((disabled)?"#dee2e6":""),borderRadius:"10px"}} onClick={toggleSticker }
                    ><MaskGroup1/></div>
                    <div className={"emoji_btn "+(ChatButtonOn=="m2"?" active":"") }  style={{pointerEvents:((disabled)?"none":"") , backgroundColor:((disabled)?"#dee2e6":""),borderRadius:"10px"}}  onClick={ toggleEmoji }
                        // style={isEmojiOn?{backgroundColor:"#d0e9ff",background: "#d0e9ff 0% 0% no-repeat padding-box",borderRadius: "10px",fill:"#2198FA"}:{fill:"#8b8b8b"}}
                    ><MaskGroup2/>
                        {/* <Picker style={{ position: 'absolute', bottom: '35px', right: '20px' }} /> */}

                    </div>

                    <div className={"attach_btn "+(ChatButtonOn=="m3"?"":"")}  style={{pointerEvents:((disabled)?"none":"") , backgroundColor:((disabled)?"#dee2e6":""),borderRadius:"10px"}} onClick={toggleFile }>
                        {/*<input type="file" name="fileAttach" ref={attachFile} onChange={(e)=>{setInputValue(e.target.value);console.log(e.target)}} ></input>*/}
                        <input type="file" name="fileAttach" ref={attachFile} onChange={upload} ></input>
                        <Mask_Group_3/>
                    </div>
                    <div className={"template_btn" +(ChatButtonOn=="m4"?" active":"") } onClick={toggleQuickReply} ><Mask_Group_4/></div>
                    {/* <div className={"payment_btn"+(ChatButtonOn=="m5"?" active":"") } onClick={toggleM5}
                                    ><Mask_Group_5/></div> */}
                </div>

                <div className={"right_btn_gp"}>
                    {/* <VoiceRecorder returnVoiceMessage={getAudioFile} /> */}
                    <div className={"send_btn"} onClick={sendMessageToClient} ><SendButton/></div>
                </div>
            </div>
        </div>
    )
}


export default observer(ChatroomFooter)
