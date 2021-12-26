import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import { useState } from 'react';

export default function QuickReply(props) {

    const [value, setValue] = useState(1);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    }

    return(
        < div className="reply_template_box">
             <TabContext value={value} sx={{ width: '100%',height:"fit-content", typography: 'body1' ,whiteSpace: 'nowrap',overflow:'scroll'}} >
            <Box component="div" 
                    visibleScrollbar={true}
                    scrollButtons={"on"}
                    sx={{ borderBottom: 1, borderColor: 'divider',overflow: 'auto' , my: 2,}}>

                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="secondary tabs example"
                    variant="scrollable"
                    // scrollButtons="off"
                >
                    {props.data.map(item=>(<Tab label={item.name} key={item.name} value={item.id} />))}


                </Tabs>
            </Box>
                    {props.data.map((item , index)=>(
                    <TabPanel  sx={{ overflow: "auto" }} value={item.id} key={item.name}>
                        <div className={'reply_box'}>{item.set.map((item,index)=>(
                            <div key={index}>
                                <div className={'nameTag'} id={item.name} content={item.content} onClick={props.onclick}>
                                    {item.name}
                                <div hidden={true}>{item.content}</div>
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