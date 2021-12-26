
import { Tooltip } from "@mui/material";
import Avatar from "@mui/material/Avatar";

export default function FilterDropDown (props){
    const{title,subtitle,filterdata,selecteddata,expand,expandClick,onchange,toggle,iname,agentSearchValue} = props
    return(
        <div className={"filter_box_agents"}  >{title}
                    <div className={"agentBroad"} >

                    <div className={"filter_title"} onClick={expandClick}>{subtitle?subtitle:`Choose ${title}` }</div>
                    <div className={"agentSearchArea"}  style={expand?{display:"block"}:{display:"none"}}>
                         <div className={"search_bar"}>    
                            <input type="text" className={"search_area"} onChange={onchange} placeholder={"Search"}></input>
                        </div>
                    

                        <div className={"channelList"} >
                            {filterdata.filter(items=>items.name.includes(agentSearchValue)).map((item,index)=>{
                                return(<li className={"channelListitem"} key={index} style={{width:"100%"}}>
                                    <div className={"left"} style={{display:"flex" ,gap:10}}>
                                        <Tooltip key={item.name} className={""} title={item.name} placement="top-start">
                                            <Avatar  className={"mf_bg_warning mf_color_warning text-center"}  sx={{width:25 , height:25 ,fontSize:14}} >{item.name.substring(0,2).toUpperCase()}</Avatar>
                                        </Tooltip>
                                        <div className={"name"}>{item.name}</div>
                                    </div>
                                    <div className="newCheckboxContainer right">
                                        <label className="newCheckboxLabel"> <input type="checkbox" id={item.name} name="checkbox" checked={selecteddata.includes(item.name)} onChange={()=>{}} onClick={toggle} />
                                        </label>
                                    </div>
                                </li>) })
                            }
                        </div>
                    </div>
                    </div>
                    <div className={"taglList"}>
                        {selecteddata.map((item , index)=>{
                                return(
                                    <div className={"tag"} key={index} style={{display:"flex" ,gap:10}}>
                                        <Tooltip key={item} className={""} title={item} placement="top-start">
                                            <Avatar  className={"mf_bg_warning mf_color_warning text-center "}  sx={{width:27.5 , height:27.5 ,fontSize:14}} >{item.substring(0,2).toUpperCase()}</Avatar>
                                        </Tooltip>

                                    </div>
                                )
                            })}
                    </div>
                </div>
    )
}