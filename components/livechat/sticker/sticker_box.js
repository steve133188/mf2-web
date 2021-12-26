import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import {useEffect, useState} from 'react';


export default function StickerBox({data , stickerSend }){
    const [value, setValue] = useState(1);
    useEffect(()=>{
        console.log(data)
    })
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
    return(

          <TabContext value={value} sx={{ width: '100%', typography: 'body1' ,whiteSpace: 'nowrap',overflow:'scroll'}} >
            <Box component="div" 
                    visibleScrollbar={true}

                    sx={{ borderBottom: 1, borderColor: 'divider',overflow: 'auto' , my: 2,padding:"8px",}}>

                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="primary"
                    indicatorColor="primary"
                    aria-label="secondary tabs example"
                    variant="scrollable"
                    // sx={{padding:"8px",}}
                    scrollButtons={false}
                    // visibleScrollbar="true" 
                >
                    {data.map((item , index)=>(<Tab key={index} label={item} value={index} />))}


                </Tabs>
            </Box>
                    {data.map((item,index)=>(
                            <img src={item} key={index} style={{width:"80px",margin:"3px"}} onClick={stickerSend} />
                   ))}
              {/*<TabPanel  sx={{ overflow: "auto" }} value={item.id} key={index}>*/}
              {/*    {item.sticker.map((item,index)=>(<img src={item.src} key={item.name+index} style={{width:"80px",margin:"3px"}} onClick={stickerSend} />))}*/}
              {/*</TabPanel>*/}
            {/* <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel> */}
          </TabContext>

      )
}