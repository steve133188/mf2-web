
import { Player,BigPlayButton } from 'video-react';
import Embed from 'react-embed';
import { useState } from 'react';


const imageCaption = {
    url:"https://p0.pikrepo.com/preview/876/531/orange-tabby-cat-sitting-on-green-grasses-selective-focus-photo.jpg",
    message:"hahaha"
}
const captionJson = JSON.stringify(imageCaption)


export default function MsgRow({msg ,...props}){

    const [isImageOpen,setImageOpen] = useState(false)

    const messageType = ()=>{
        switch(msg.type){
            case "sticker": return <div className={"msg_type_sticker"}><img className={"imageBox"} src={msg.body}/></div>;
            case "emoji":   return <div className={"msg_type_emoji"}>{msg.body}</div>;
            case "image":   return <div className={"msg_type_image"}><img className={"imageBox"} src={msg.body}/></div> ;
            case "imageCaption":   
                return <>
                        {/* {console.log(JSON.parse(captionJson).url)} */}
                                {/* JSON.parse({msg.body}) */}
                                <div className={"msg_type_imageCaption"}>
                                    <img className={"bigImageBox"} src={JSON.parse(captionJson).url}  onClick={()=>{setImageOpen(!isImageOpen)}} style={isImageOpen?{ display:'block'}:{display:'none'}}/>
                                    <img className={"imageBox"} src={JSON.parse(captionJson).url} onClick={()=>{setImageOpen(!isImageOpen)}}/>
                                    <div className={"imageMessage"}>{JSON.parse(captionJson).message}</div>
                                </div>
                        </>
            case "video":   return <div className={"msg_type_video"}> 
                    {/* <iframe allowFullScreen className={"videoBox"} src={msg.body}  /> */}
                    <Player className={"videoBox"} playsInline fluid={false} width={360} muted={true}>
                        <BigPlayButton position="center" />
                                    <source src={msg.body}   type="video/mp4"/>
                    </Player>
                    </div> 
            case "voice":   return <div className={"msg_type_voice"}>
                                            <audio className={"voice_detail"} controls src={msg.body} ></audio>

                        </div>;
            case "attachment":  
                return  <div className={"msg_type_attachment"}>
                    <div className={"attachmentBox"}> 
                        <svg xmlns="http://www.w3.org/2000/svg"  width="35" height="35" viewBox="0 0 35 35" >
                                <g id="Mask_Group_62" data-name="Mask Group 62" transform="translate(-2746 -1111)" >
                                    <rect id="Background-2" data-name="Background" width="35" height="35" transform="translate(2746 1111)" fill="none"/>
                                    <path id="Path_34405" data-name="Path 34405" d="M973.181,507.951h0a1.148,1.148,0,0,0-1.1,1.1v14.067a5.318,5.318,0,0,1-4.667,5.362c-.175.017-.348.026-.519.026a5.141,5.141,0,0,1-5.13-4.651,4.806,4.806,0,0,1-.028-.52V506.919a3.306,3.306,0,0,1,2.849-3.349,3.222,3.222,0,0,1,.333-.017,3.168,3.168,0,0,1,3.156,2.846,2.922,2.922,0,0,1,.017.338v13.951a1.189,1.189,0,0,1-1.222,1.144h0a1.19,1.19,0,0,1-1.145-1.14V509.048a1.144,1.144,0,0,0-1.182-1.1h0a1.146,1.146,0,0,0-1.1,1.1v11.438a3.6,3.6,0,0,0,3.1,3.644,3.468,3.468,0,0,0,3.81-3.09c.012-.12.017-.242.017-.364V506.956a5.607,5.607,0,0,0-4.927-5.656c-.18-.017-.359-.026-.536-.026a5.436,5.436,0,0,0-5.429,4.93c-.016.174-.023.348-.025.523v16.3a7.655,7.655,0,0,0,6.723,7.737c.247.025.493.036.735.036a7.431,7.431,0,0,0,7.416-6.736c.023-.241.035-.484.035-.728V509.048A1.144,1.144,0,0,0,973.181,507.951Z" transform="translate(1796.697 612.626)" className={"attachmentPinLogo"} fill="#2198fa"/>     
                                </g>
                            </svg>
                        <a className={"attachmentBody"} href='/msg.body.fileURL' download>{msg.body}</a>
                        <div className={"attachmentSize"}>size.kb</div></div>
                     </div>;
            case "url": return <div className={"url_body"}>
                    <div className={"url_box"}>
                        <div className={"url_detail"} >                        
                             <Embed   url={msg.body} />
                             </div>

                        <div className={"msg_type_url"}><a href={msg.body}>{msg.body} </a></div>
                    </div>
                </div>;

            default:   return  <div className={"msg_body"}>{msg.body}</div>
        }
    }
   
    return(
        <div className={"msg_row"}>
            <div className={msg.from_me?"msg_from_me":"msg_from_other"}>
                <div>{messageType()}</div>
                {/* <div className={"msg_body"}>{msg.body}</div> */}
                <div className={"msg_timestamp"}>{new Date(parseInt(msg.timestamp*1000)).toLocaleTimeString()}</div>
            </div>
        </div>
    )
}

 