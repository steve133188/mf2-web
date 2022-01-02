import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import Tabs from '@mui/material/Tabs';
import TabPanel from '@mui/lab/TabPanel';
import {useContext, useEffect, useState} from 'react';
import { GlobalContext } from '../../../context/GlobalContext';


export default function StickerBox({data , stickerSend ,ref }){
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
   
    const [value, setValue] = useState(0);
    const filtered = data.files.filter((d)=>{
        return d.key.includes(data.folders[value])
    })
    return(

          <TabContext value={"sticker"} sx={{ width: '100%', typography: 'body1' ,whiteSpace: 'nowrap',overflow:'auto'}} ref={ref} >
            <Box component="div" 
                    visibleScrollbar={true}

                    sx={{ borderBottom: 1, borderColor: 'divider',overflow: 'auto' , my: 2,padding:"8px",marginTop:0}}>

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
                    {data.folders&&data.folders.map((item , index)=>(<Tab key={index} label={item} value={index} />))}


                </Tabs>
            </Box>
            {/* <TabPanel> */}
            <div className={"stickers_box"} style={{display:"flex",flexWrap:"wrap",width:"100%",overflow:"auto",maxHeight:"184px",minHeight:"87px",objectFit:"contain"}}                                    >

                    {data.files&&filtered.map((item,index)=>(
                      <img src={item.url} key={index} style={{width:"80px",height:"80px",margin:"3px"}} onClick={stickerSend} />
                      ))}
                      </div>
                 {/* {item.sticker.map((item,index)=>(
                      <TabPanel  sx={{ overflow: "auto" }} value={item.id} key={index}>
            </TabPanel>
                 <img src={item.src} key={item.name+index} style={{width:"80px",margin:"3px"}} onClick={stickerSend} />
              </TabPanel>
                 ))} */}

          </TabContext>

      )
}