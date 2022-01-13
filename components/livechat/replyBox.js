export default function Reply({confirmReply,msg_id,}){
    const Al = (e) =>{
        e.stopPropagation();
        confirmReply()
        console.log("alalalal")
    }

    return(
        <div className="reply_pop_content">
       
            <div className="pop_half" onClick={(e)=>{Al(e)}} value={"r"}> 
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