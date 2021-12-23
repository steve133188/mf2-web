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
    const {adminInstance , userInstance, orgInstance,user} = useContext(GlobalContext)

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
    
    let result = currentContacts.map(d=>d.id)
    
    const stickersList = [
        {id:"123",name:"sticker_set_1",sticker:[{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/bd596641-5d91-4f65-8549-a716cd5a6117.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/5b5310f4-dc8d-476f-8571-fb8be0d63158.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/5b5310f4-dc8d-476f-8571-fb8be0d63158.webp"}]},
        {id:"232",name:"sticker_set_2",sticker:[{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/9aa2ee62-a5c4-44d6-96df-5bf4a4c6cda4.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/98baebf6-10ac-4cbd-98bc-438e75a78a7c.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/bd596641-5d91-4f65-8549-a716cd5a6117.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/5b5310f4-dc8d-476f-8571-fb8be0d63158.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/9aa2ee62-a5c4-44d6-96df-5bf4a4c6cda4.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/98baebf6-10ac-4cbd-98bc-438e75a78a7c.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/bd596641-5d91-4f65-8549-a716cd5a6117.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/5b5310f4-dc8d-476f-8571-fb8be0d63158.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"}]},
        {id:"weq",name:"sticker_set_3",sticker:[{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/9aa2ee62-a5c4-44d6-96df-5bf4a4c6cda4.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"}]},
        {id:"va",name:"bobby",sticker:[{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/9aa2ee62-a5c4-44d6-96df-5bf4a4c6cda4.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/98baebf6-10ac-4cbd-98bc-438e75a78a7c.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/bd596641-5d91-4f65-8549-a716cd5a6117.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/5b5310f4-dc8d-476f-8571-fb8be0d63158.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/9aa2ee62-a5c4-44d6-96df-5bf4a4c6cda4.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/98baebf6-10ac-4cbd-98bc-438e75a78a7c.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/bd596641-5d91-4f65-8549-a716cd5a6117.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/5b5310f4-dc8d-476f-8571-fb8be0d63158.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"}]},
        {id:"fsavav",name:"siumi2",sticker:[{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/9aa2ee62-a5c4-44d6-96df-5bf4a4c6cda4.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"}]},
        {id:"fs",name:"sticker_set_1",sticker:[{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/bd596641-5d91-4f65-8549-a716cd5a6117.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/5b5310f4-dc8d-476f-8571-fb8be0d63158.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/5b5310f4-dc8d-476f-8571-fb8be0d63158.webp"}]},
        {id:"adsv",name:"sticker_set_2",sticker:[{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/9aa2ee62-a5c4-44d6-96df-5bf4a4c6cda4.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/98baebf6-10ac-4cbd-98bc-438e75a78a7c.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/bd596641-5d91-4f65-8549-a716cd5a6117.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/5b5310f4-dc8d-476f-8571-fb8be0d63158.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/9aa2ee62-a5c4-44d6-96df-5bf4a4c6cda4.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/98baebf6-10ac-4cbd-98bc-438e75a78a7c.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/bd596641-5d91-4f65-8549-a716cd5a6117.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/5b5310f4-dc8d-476f-8571-fb8be0d63158.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"}]},
        {id:"as",name:"bobby",sticker:[{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/9aa2ee62-a5c4-44d6-96df-5bf4a4c6cda4.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/98baebf6-10ac-4cbd-98bc-438e75a78a7c.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/bd596641-5d91-4f65-8549-a716cd5a6117.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/5b5310f4-dc8d-476f-8571-fb8be0d63158.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/9aa2ee62-a5c4-44d6-96df-5bf4a4c6cda4.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/98baebf6-10ac-4cbd-98bc-438e75a78a7c.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/bd596641-5d91-4f65-8549-a716cd5a6117.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/5b5310f4-dc8d-476f-8571-fb8be0d63158.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"}]},
        {id:"sdf",name:"siumi2",sticker:[{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/9aa2ee62-a5c4-44d6-96df-5bf4a4c6cda4.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"}]},
        {id:"sdf",name:"sticker_set_1",sticker:[{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/bd596641-5d91-4f65-8549-a716cd5a6117.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/5b5310f4-dc8d-476f-8571-fb8be0d63158.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/5b5310f4-dc8d-476f-8571-fb8be0d63158.webp"}]},
        {id:"dsfa",name:"sticker_set_2",sticker:[{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/9aa2ee62-a5c4-44d6-96df-5bf4a4c6cda4.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/98baebf6-10ac-4cbd-98bc-438e75a78a7c.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/bd596641-5d91-4f65-8549-a716cd5a6117.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/5b5310f4-dc8d-476f-8571-fb8be0d63158.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/9aa2ee62-a5c4-44d6-96df-5bf4a4c6cda4.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/98baebf6-10ac-4cbd-98bc-438e75a78a7c.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/bd596641-5d91-4f65-8549-a716cd5a6117.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/5b5310f4-dc8d-476f-8571-fb8be0d63158.webp"},{name:"bobo01",src:"https://img-05.stickers.cloud/packs/46506700-08b0-4ea8-b2d0-45d03da853cf/webp/e24b79ad-61ee-4638-ba9d-109f6de2ad7f.webp"}]},
    
        ]
        useEffect( () =>{
            if(!isLoading){
                setFilteredData(stickersList)
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

    const editSVG =(
        <svg id="pen" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
            <defs>
                <clipPath id="clip-path">
                    <rect id="Background" width="18" height="18" fill="none"/>
                </clipPath>
            </defs>
            <rect id="Background-2" data-name="Background" width="18" height="18" fill="none"/>
            <g id="pen-2" data-name="pen" clipPath="url(#clip-path)">
                <path id="Shape" d="M3.971,15H.75A.751.751,0,0,1,0,14.25V11.07a.749.749,0,0,1,.218-.533l8.2-8.2L10.537.218A.749.749,0,0,1,11.067,0h.007A.749.749,0,0,1,11.6.218l3.18,3.18A.746.746,0,0,1,15,3.93l-.053.037a.52.52,0,0,1,0,.105.749.749,0,0,1,0,.18.89.89,0,0,1-.165.247l-2.13,2.085L4.5,14.783A.753.753,0,0,1,3.971,15ZM8.948,3.93h0L1.5,11.378V13.5H3.623L11.07,6.053,8.948,3.93ZM11.07,1.815,10.005,2.873,12.128,5,13.185,3.93,11.07,1.815Z" transform="translate(1.5 1.5)" fill="#2198fa"/>
            </g>
        </svg>

    )

    const deleteSVG = (
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#f46a6b"
             cursor="pointer"
             className="bi bi-trash" viewBox="0 0 16 16"
             onClick={null}>
            <path
                d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
        </svg>
    )



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
                                        searchFilter(e.target.value , stickersList,(new_data)=>{
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
                                { filteredData.length!=0 && currentContacts.map((data ,index) =>{ return(

                                    //  <TableRow
                                    //  className={"stickers_box"}
                                    //         key={index}
                                    //         hover
                                    //         role="checkbox"
                                    //         name={index}
                                            
                                    //         // checked={selectedContacts.includes(data.id)}
                                    //         // onClick={isSelectRow?toggleSelect:null}
                                    //     >
                                <div>
                                            <span >{data.name}
                                            </span>
                                             <div className="newCheckboxContainer">
                                                    {isSelectRow ? <label className="newCheckboxLabel">
                                                        <input type="checkbox" name="checkbox" checked={result.every(el=>selectedContacts.includes(el))} onClick={toggleSelectAll} />
                                                    </label> : null}
                                                </div>
                                    <div className="sticker-row"
                                    key={index}
                                    name={index}
                                    id={index+data.id}> 

                                                {data.sticker.map((data)=>{
                                                    return(
                                                            <div>
                                                            <img src={data.src}/>
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
