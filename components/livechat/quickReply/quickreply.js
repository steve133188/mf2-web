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
    const [value, setValue] = useState(0);

    const fetchStandardReply = async () =>{
        const data = await mediaActionsStore.getStandardReplyAll()

        setStandardReply(data)
        // setFilteredData(data)

    }
    const handleChange = (event, newValue) => {

        setValue(newValue);
    };
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
                        scrollButtons={"auto"}
                        visibleScrollbar
                        sx={{minHeight:"10px"}}
                    >
                        {standardReply.map((item,index)=>{return (<Tab label={item.name=="WABA"?<img src={`/channel_SVG/WABA.svg`}/>:item.name} key={index} value={item.name} />)})}
                    </Tabs>
                </Box>
                <TabPanel value={value} sx={{padding:"0 1rem"}}>
                    {standardReply.filter(e=>e.name==value).map((item,index)=>{return(<>
                        <div className={'qreply_box' } style={{display:"flex",flexWrap:"wrap",overflowY:"auto",maxHeight:"70px",padding:"0 1rem" , pointerEvents:((item.name!="WABA"&&!disabled)?"none":"") , backgroundColor:((item.name!="WABA"&&!disabled)?"#dee2e6":""), borderRadius:"10px" }} >
                            {item.body.map((item,index)=>{return (
                                <div key={index} style={{margin:" 3px"}}>
                                    <div className={'nameTag'} id={item} onClick={onclick}>
                                        {item}
                                    </div>
                                    <div ></div>
                                </div>
                            )})}
                        </div></>)})}
                </TabPanel>
            </TabContext>
        </div>
    )
}
