import { ListItem } from "@mui/material";
import { flexbox } from "@mui/system";

export default function ContantDetail(){
    
const List=[{
phoneNumber:"+852 97650348",
email:"email",
birthday:" none ",
address:" hk ",
Country:"Hong Kong",
createdDate:"1 May,2021",
lastOnline:"10:12am",
lastContactFromYou:"yesterday",
},
{
    name:"2",
    last_msg_time:"03:45PM",
    team:"B",
    unreadCount:1,
    is_pin:false,
    channel:"whatsapp",
    profile_pic_url:"https://imgv3.fotor.com/images/side/Fotor-powerful-photo-enhancement-tools.jpg",
},]
// const map2 = []
// const listItem =   List.map((w) => {console.log(Object.keys(w)); map2.push[w]} );
// console.log()
        return(
            <div className={"infoBox"} style={{display:"flex",flexDirection:"column",position:"relative",width:"80%",height:"40REM",padding:"0 10%",overflow:"scroll"}}>
                <div className={"keyList"} style={{position:"absolute", textAlign:"left",height:"20px",margin:"0px 0"}}>
                    {Object.keys(List[0]).map((item=>(
                        <>               
                        {/* <div>{item}</div> */}
                        <div style={{height:"20px",margin:"35px 0",font: "normal normal normal 12px/17px Manrope"}}>{item}</div>
                        </>
                    )))}
                </div>
                <div className={"valusList"}  style={{position:"absolute", textAlign:"left",height:"20px",margin:"14px 0"}}>
                    {Object.values(List[0]).map((item=>(
                        <>               

                        <div style={{height:"20px",margin:"35px 0",font:"normal normal 600 16px/22px Manrope"}}>{item}</div>
                        </>
                    )))}
                </div>


            </div>
    )
}