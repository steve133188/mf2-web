import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../../context/GlobalContext';

export default function QuickReply(props) {

    const {user,replyInstance} = useContext(GlobalContext)
    const [standardReply, setStandardReply] = useState([]);
    const [value, setValue] = useState("1");
  
    const fetchStandardReply = async () =>{
        const data = await replyInstance.getStandardReplyAll()
        console.log("getAllStandardReply",data)
        setStandardReply(data)
        // setFilteredData(data)

    }
    const handleChange = (event, newValue) => {
      setValue(`${newValue}`);
    }
    useEffect(    async () => {
        if(user.token) {
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
                    ref={props.ref}
                    visibleScrollbar
                    sx={{minHeight:"10px"}}
                    // scrollButtons="auto"
                >
                    {standardReply.map((item,index)=>(<Tab label={item.name=="WABA"?<img src={`/channel_SVG/WABA.svg`}/>:item.name} key={index} value={`${item.id}`} />))}


                </Tabs>
            </Box>
                    {standardReply.map((item,index)=>(
                        
                    <TabPanel value={value} key={index} sx={{padding:"0 1rem"}}>
                        <div className={'qreply_box'} style={{display:"flex",flexWrap:"wrap",overflowY:"auto",maxHeight:"70px",padding:"0 1rem"}}>
                            {item.body.map((item,index)=>(
                            <div key={index} style={{margin:" 3px"}}>
                                <div className={'nameTag'} id={item} onClick={props.onclick}>
                                    {item}
                                <div hidden={true}>{item}</div>
                                </div>
                            <div >
                            {/* {item.content } */}
                                </div>
                            </div>

                        ))}
                        </div>
                    </TabPanel>))}
            {/* <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel> */}
          </TabContext>
        </div>
    )
}