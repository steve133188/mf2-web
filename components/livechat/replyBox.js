export default function Reply({confirmReply,confirmForward,msg_id,}){
    const Ar = (e) =>{
        e.stopPropagation();
        confirmReply()
        console.log("alalalal")
    }
    const AF = (e) =>{
        e.stopPropagation();
        confirmForward()
        console.log("alalalal")
    }

    return(
        <div className="reply_pop_content">
       
            <div className="pop_half" onClick={(e)=>{Ar(e)}} value={"r"}> 
                Reply 
                <img src="/livechat/icon-reply.svg" /> 
            </div>
    
            <div className="pop_half" onClick={(e)=>{AF(e)}} value={"f"}> 
                Forward
                <img src="/livechat/icon-forward.svg" /> 
            </div>


        </div>       
    )
}