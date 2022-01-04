export default function Reply({confirmReply,msg_id,}){
    const Al = () =>{
        confirmReply
        console.log("alalalal")
    }

    return(
        <div className="reply_pop_content">
       
            <div className="pop_half" onClick={Al} value={"r"}> 
                Reply 
                <img src="/livechat/icon-reply.svg" /> 
            </div>
    
            <div className="pop_half" onClick={()=>{console.log("forward~~")}} value={"f"}> 
                Forward
                <img src="/livechat/icon-forward.svg" /> 
            </div>


        </div>       
    )
}