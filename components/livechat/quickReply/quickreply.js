import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import {useRootStore} from "../../../utils/provider/RootStoreProvider";

export default function QuickReply(props) {

    const {disabled , onclick , replyData} =props


    const {authStore:{isAuth} ,mediaActionsStore} = useRootStore()
    const [standardReply, setStandardReply] = useState([]);
    const [value, setValue] = useState("0");

    const fetchStandardReply = async () =>{
        const data = await mediaActionsStore.getStandardReplyAll()
        console.log("getAllStandardReply",data)
        setStandardReply(data)
        // setFilteredData(data)

    }
    const handleChange = event => {
      setValue(`${event.target.value}`);
    }
    useEffect(    async () => {
        if(isAuth) {
            await fetchStandardReply();
            }

    },[]);
    return(
        < div className="reply_template_box">
             <TabContext value={value} sx={{ width: '100%',height:"fit-content", typography: 'body1' ,whiteSpace: 'normal',overflow:'scroll'}}  >
            <Box component="div"
                    visibleScrollbar={true}
                    scrollButtons={"on"}
                    sx={{ borderBottom: 1, borderColor: 'divider',overflow: 'auto' , my: 2,}}>

                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    variant="scrollable"
                    scrollButtons={false}
                    visibleScrollbar
                    sx={{minHeight:"10px"}}
                    // scrollButtons="auto"
                >
                    {replyData.map((item,index)=>{console.log( value);return (<Tab label={item.name=="WABA"?<img src={`/channel_SVG/WABA.svg`}/>:item.name} key={index} value={`${index}`} />)})}


                </Tabs>
            </Box>

                    <TabPanel value={value} sx={{padding:"0 1rem"}}>
                    {standardReply.filter(e=>e.id==value).map((item,index)=>{console.log(item,"reply folder",value);return(<>
                        <div className={'qreply_box' } style={{display:"flex",flexWrap:"wrap",overflowY:"auto",maxHeight:"70px",padding:"0 1rem" , pointerEvents:((item.name!="WABA"&&!disabled)?"none":"") , backgroundColor:((item.name!="WABA"&&!disabled)?"#dee2e6":""), borderRadius:"10px" }} >
                            {item.body.map((item,index)=>{console.log(item);return (
                                <div key={index} style={{margin:" 3px"}}>
                                <div className={'nameTag'} id={item} onClick={onclick}>
                                    {item}
                                </div>
                            <div >
                            {/* {item.content } */}
                                </div>
                            </div>

                        )})}
                        </div>
</>
                        )})}
                    </TabPanel>
            {/* <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel> */}
          </TabContext>
        </div>
    )
}
