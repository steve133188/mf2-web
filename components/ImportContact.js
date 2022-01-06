import React, {useContext, useEffect, useMemo ,useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { GlobalContext } from '../context/GlobalContext';
import {NormalButton, NormalButton2, CancelButton} from './Button';
import Papa from "papaparse";
import axios from "axios";
import xlsx from "xlsx";
import {CSVLink, CSVDownload} from 'react-csv';

export function ImportDropzone({children,...props}) {
    const [template,setTemplate]=useState([])
    useEffect(()=>{
        setTemplate([{
            address:"ft 123, abc hse, abc city, abc state, abc country",
            email:"example@example.com",
            first_name:"(Required)Chris",
            last_name:"(Required)Wong",
            birthday:"DD/MM/YYYY",
            country:"HK",
            gender:"(M/F)",
            phone:"(Required)85212345678",
            agents:"(agent id)1234,1235"
        }])
    },[])
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        acceptedFiles
    } = useDropzone();

    const baseStyle = {
        flex: 1,
        maxWidth: 592,
        maxHeight: 202,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '42px',
        paddingRight: '95.5px',
        paddingBottom: '48px',
        paddingLeft: '95.5px',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#2385FC',
        borderStyle: 'dashed',
        backgroundColor: '#ECF2F8',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out'
    };

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));
        const {contactInstance } = useContext(GlobalContext)

    const newUser = async (data) =>{
        //new contact
        const url = "https://46bgula199.execute-api.ap-southeast-1.amazonaws.com/prod/customer"

        const res = await axios.post(url , {...data} ,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
        })
            .then(response => {
                if(response.status != 200){
                    return "something went wrong"
                }
                console.log(response)
            }).catch(err=>{
                console.log(err)
            })
        console.log(res)

        props.onClose();
    }

    // const handleUpload = async (e)=>{
    //     e.preventDefault()
    //     console.log(acceptedFiles,"accepted files~")
    //     console.log("file",acceptedFiles[0])


    //     if (acceptedFiles.length == 0 ){
    //         console.log("no file here")
    //         return
    //     }

    //     console.log("importContact.js(line:56) - file : ",acceptedFiles[0].type)
    //     Papa.parse(acceptedFiles[0], {
    //         header: true,
    //         complete: function(results) {
    //             results.data.forEach(element => {
                     
    //                 const data = {
                       
    //                     first_name:element.first_name,
    //                     last_name:element.last_name,
    //                     phone:element.phone,
    //                     email:element.email,
    //                     birthday:element.birthday,
    //                     gender:element.gender,
    //                     address:element.address,
    //                     country:element.country,
    //                     tags:element.tags.split(","),
    //                     agents:element.agents.split(",")
    //                 }
                    
    //                 if(data.phone) newUser(data)
    //         }
    //         )
    //     }})
        

    //     acceptedFiles.pop()

    //     // axios.post("api/uploadfile", formData);
    // } 
    const readUploadFile = (e) => {
        e.preventDefault();//application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
        const files = e.target.files||acceptedFiles;
        if (files[0].type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            console.log(files[0].type)

            const reader = new FileReader();
            reader.onload = (e) => {
                const data = e.target.result;
                const workbook = xlsx.read(data, { type: "array" });
                const sheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[sheetName];
                const json = xlsx.utils.sheet_to_json(worksheet,{raw: false});

                json.forEach(element => {

                    const data = {
                        customer_id:parseInt(element.phone),
                        address:element.address,
                        email:element.email,
                        first_name:element.first_name,
                        last_name:element.last_name,
                        customer_name:element.first_name+" "+element.last_name,
                        birthday:element.birthday,
                        country:element.country,
                        gender:element.gender,
                        phone:parseInt(element.phone)
                    }
                   
                    console.log(data,"-data");

                    if(data.phone) newUser(data)
            }
            )
            };
            reader.readAsArrayBuffer(files[0]);
        }else if(files[0].type === "text/csv"){

            Papa.parse(files[0], {
                header: true,
                complete: function(results) {
                    results.data.forEach(element => {
                        

                        const data = {
                           
                            customer_id:parseInt(element.phone),
                            address:element.address,
                            email:element.email,
                            first_name:element.first_name,
                            last_name:element.last_name,
                            customer_name:element.first_name+" "+element.last_name,
                            birthday:element.birthday,
                            country:element.country,
                            gender:element.gender,
                            phone:parseInt(element.phone)
                          
                        }
                        
                    console.log(data,"-data");
                        
                        if(data.phone) newUser(data)
                }
                )
            }})
        }else{
            
        }
    }

//     [Log]  (2)
// {first_name: "Timtttabv", last_name: "Test", phone: "85244444444", email: "aaaa@aaa.com", birthday: "15/12/2021", ¡K}
// "-data"

    const activeStyle = {
        borderColor: '#2385FC'
    };

    const acceptStyle = {
        borderColor: '#48CEFF'
    };

    const rejectStyle = {
        borderColor: '#ff1744'
    };


    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);
    return (
        <div className={"importContactCenter"}>
            <div className={"importContactContainer"}>
                <div className="header">
                    <span>Import Contacts</span>
                    <div className="buttonGrp">
                        <button disabled={acceptedFiles.length==0?true:false}  onClick={readUploadFile}>Confirm</button>
                        <span style={{marginLeft: "30px"}} onClick={props.onClose}><CancelButton>Cancel</CancelButton></span>
                    </div>
                </div>
                <div {...getRootProps({style})}>
                    <input {...getInputProps()} onChange={readUploadFile} ondrop={readUploadFile}  />
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="60" fill="#2198FA"
                         className="bi bi-file-earmark-arrow-up" viewBox="0 0 16 16">
                        <path
                            d="M8.5 11.5a.5.5 0 0 1-1 0V7.707L6.354 8.854a.5.5 0 1 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 7.707V11.5z"/>
                        <path
                            d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                    </svg>
                    <p style={{marginTop: "30px", color: "#444444"}}>Drag and drop a file or <span
                        style={{fontWeight: "600", color: "#2198FA", cursor: "pointer"}}>browse</span> to upload your
                        contacts.</p>
                </div>
                <aside style={{marginTop: "38px"}}>
                    <h4 style={{fontSize: "12px", color: "#444444"}}>Uploaded</h4>
                    <ul style={{
                        paddingLeft: "0px",
                        listStyle: "none",
                        marginTop: "17px",
                        fontSize: "16px",
                        color: "#444444"
                    }}>{files}</ul>
                </aside>
                

                <NormalButton><CSVLink data={template} filename={"template.csv"} >Download Template</CSVLink></NormalButton>
            </div>
        </div>
    );
}