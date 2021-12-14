import {useRouter} from "next/router";
import {useEffect, useState} from "react";

import Tabs from '@mui/material/Tabs';
import Tab from "@mui/material/Tab";
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import Box  from "@mui/material/Box";
import Stickers from "./Stickers";
import Link from "next/link";


export default function Admin() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()

    useEffect(()=>{
        router.push("/admin/Role")
    },[])

    // const [value, setValue] = useState("1");

    // const handleChange = (event, newValue) => {
    //   setValue(newValue);
    // };
  

    return (
        <div>
            <div className="admin_layout">
                {/* <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs 
                        value={value}
                        onChange={handleChange} textColor="secondary"
                        indicatorColor="secondary"
                        aria-label="secondary tabs example">
                        <Tab label="Item One" value="1" />
                        <Tab label="Item Two" value="2" />
                        <Tab label="Item Three" value="3" />
                        </Tabs>
                    </Box>
                    <TabPanel value="1"><Stickers/></TabPanel>
                    <TabPanel value="2">Item Two</TabPanel>
                    <TabPanel value="3">Item Three</TabPanel>
                </TabContext> */}
              </div>
        </div>
    )
}