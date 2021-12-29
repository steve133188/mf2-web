import {useContext, useEffect, useState} from "react";

import SelectSession from "../../components/SelectSession";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import {TableCell} from "@mui/material";
import TableHead from "@mui/material/TableHead";
import Pagination from '@mui/material/Pagination';
import searchFilter from "../../helpers/searchFilter";
import {InnerSidebar} from "../../components/InnerSidebar";
import {GlobalContext} from "../../context/GlobalContext";
import { AddStickerSVG } from "../../public/admin/adminSVG";
import { ImportDropzone } from "../../components/ImportContact";



export default function Stickers() {

    const {mediaInstance, userInstance ,user , } = useContext(GlobalContext)

    const [roles, setRoles] = useState([]);
    const [stickers, setStickerList] = useState([]);

    const [filteredData , setFilteredData] = useState([])

    const [isLoading, setIsLoading] = useState(false);
    const [filter , setFilter] = useState({agent:[] , team:[] , channel:[] , tag:[] })

    const [currentPage , setCurrentPage] = useState(1)
    const [selectedContacts , setSelectedContacts] = useState([])
    const [selectAll, setSelectAll] = useState(false);
    const indexOfLastTodo = currentPage * 5; // 10 represent the numbers of page
    const indexOfFirstTodo = indexOfLastTodo - 5;
    const currentContacts = filteredData.slice(indexOfFirstTodo, indexOfLastTodo);
    const [isSelectRow, setIsSelectRow] = useState( false);

    const [stickerData ,setStickerData] = useState({folders:[] , files:[]})
    const getStickers = async ()=>{
        const {folders , files} = await mediaInstance.getStickers()
        const arrfolders = []
        folders.forEach(e=>arrfolders.push(e.slice(9,-1)))

        setStickerData(files)
        setFilteredData(arrfolders )
        console.log("stickers data" , folders,arrfolders , files)

    }
    let result = currentContacts.map(d=>d.id)
   
    
    useEffect(async()=>{
        await getStickers()

    },[])



        useEffect( () =>{
            if(!isLoading){
                // setFilteredData(stickerData)
                setIsLoading(!isLoading)
                return
            } 

        },[isLoading])

    // const fetchRoles = async () =>{
        //     const data = await adminInstance.getAllRoles()
        //     console.log("getAllRoles",data)
        //     setRoles(data)
        //     setFilteredData(data)
        // }
        // useEffect(    async () => {
            //     await fetchRoles()
            // },[]);
            
            const toggleSelect = e => {
                const { checked ,id} = e.target;
        setSelectedContacts([...selectedContacts, id]);
        if (!checked) {
            setSelectedContacts(selectedContacts.filter(item => item !== id));
        }
        console.log(selectedContacts)
    };
    const toggleSelectAll = e => {
        setSelectAll(!selectAll);
        setSelectedContacts(currentContacts.map(c => c.id));
        if (selectAll) {
            setSelectedContacts([]);
        }
        console.log(selectedContacts)
    };
    const toggleSelectRow = ()=>{
        setIsSelectRow(!isSelectRow)
    }




    // const default_cols = ['Role' , 'No. of User' ,' ']



    const [isShowDropzone, setIsShowDropzone] = useState(false);
        function toggleDropzone() {
            console.log("click")
            setIsShowDropzone(!isShowDropzone);
        }
    return (
        <div className={"admin_layout"}>
            <InnerSidebar/>
            <div className="rightContent">
                <div className="sticker_box">
                    <div className={"search_session"}>
                        <div className="search">
                            <div className="mf_icon_input_block  mf_search_input">
                                <div className={"mf_inside_icon mf_search_icon "} > </div>
                                <input
                                    className={"mf_input mf_bg_light_grey"}
                                    type="search"
                                    name={"keyword"}
                                    onChange={(e)=> {
                                        searchFilter(e.target.value , stickerData,(new_data)=>{
                                            setFilteredData(new_data)
                                            setCurrentPage(1)
                                        })
                                    }}
                                    placeholder={"Search"}
                                />
                            </div>
                        </div>
                        <div className={"btn_group"}>
                            {!isSelectRow ? (
                                <button onClick={toggleSelectRow} className={"mf_bg_light_blue mf_color_blue"}> Select </button>
                            ) : (
                                <button  onClick={toggleSelectRow} className={"mf_bg_light_grey mf_color_text"}> Cancel</button>
                            )}
                            <button onClick={toggleDropzone}        >+ Sticker</button>
                        </div>
                    </div>
                    <SelectSession
                        btn={isSelectRow?(<div className={"select_session_btn_group"}>
                            {/*<div className={"select_session_btn"}><div svg={deleteSVG} onClick={}>{deleteSVG}</div> </div>*/}
                        </div>):null}
                    >Sticker
                    </SelectSession>
                    <TableContainer
                        sx={{minWidth: 750 , minHeight:"60vh"}}
                        className={"table_container"}
                        
                    >
                        <Table
                            sx={{minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                            stickyHeader={true}
                            
                        >
                            <TableHead>
                                {/* <TableRow>
                                    <TableCell>
                                        <div className="newCheckboxContainer">
                                            {isSelectRow ? <label className="newCheckboxLabel">
                                                <input type="checkbox" name="checkbox" checked={result.every(el=>selectedContacts.includes(el))} onClick={toggleSelectAll} />
                                            </label> : null}
                                        </div>
                                    </TableCell>
                                    {default_cols.map((col,index)=>{
                                        return ( <TableCell key={index}>{col}</TableCell>)
                                    })}

                                </TableRow> */}
                            </TableHead>
                            <TableBody>
                                { filteredData.length!=0 && currentContacts.map((data ,index) =>{ console.log(filteredData,"filter data") ;return(

                                     <TableRow
                                     className={"stickers_box"}
                                            key={index}
                                            hover
                                            role="checkbox"
                                            name={index}
                                            sx={{margin:"1rem",}}
                                            
                                            // checked={selectedContacts.includes(data.id)}
                                            // onClick={isSelectRow?toggleSelect:null}
                                        >
                                             <div className="newCheckboxContainer">
                                                    {isSelectRow ? <label className="newCheckboxLabel">
                                                        <input type="checkbox" name="checkbox" checked={result.every(el=>selectedContacts.includes(el))} onClick={toggleSelectAll} />
                                                    </label> : null}
                                                   </div>
                                                 <td><div key={index}>
                                                <span >{data==""?"Sticker":data}
                                            </span>
                                    <div className="sticker-row"
                                        key={index}
                                        name={index}
                                        id={index+data.id} 
                                        style={{margin:"1rem 0",}}> 

                                                {stickerData.filter(s=>{return s.key.includes(data)}).map((item , index)=>{
                                                    console.log(data)
                                                    return(
                                                            <div key={index}>


                                                    
                                                 <img src={item.url} key={index} style={{width:"80px",height:"80px",margin:"2px 4px"}} />
                                                            </div>
                                                         )
                                                    })
                                                }
                                                <div className={"add_sticker"} id={data.id} onClick={toggleDropzone}>
                                                    <AddStickerSVG size={80}/>
                                                    <span style={{display: isShowDropzone ? "block" : "none"}}>
                                                        {/*DND Import Data start */}
                                                        <ImportDropzone onClose={toggleDropzone} accept={"image/*"} isShowDropzone={isShowDropzone} setIsShowDropzone={setIsShowDropzone}/>
                                                        {/*DND Import Data end */}
                                                    </span>
                                                    </div> 
                                        </div>
                                </div>
                                </td></TableRow>
                                    )})
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <Pagination count={Math.ceil(filteredData.length/5)} page={currentPage} onChange={(e,value)=>{setCurrentPage(value)}}/>
                </div>
            </div>

        </div>
    )
}
