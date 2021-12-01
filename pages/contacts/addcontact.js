import {MF_Input} from "../../components/Input";
import {Pill} from "../../components/Pill";
import * as React from "react";
import {CancelButton, NormalButton2} from "../../components/Button";
import Link from "next/link"
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";

export default function AddContact() {
    const [newContact , setNewContact] = useState({
        first_name:"",
        last_name:"",
        name:"",
        phone:"",
        email:"",
        birthday:"",
        gender:"",
        address:"",
        country:"",
        tags:[],
        Assignee:[]
    })
    const router = useRouter()

    useEffect(()=>{

    },[])


    function handleChange(evt) {
        const value = evt.target.value;
        setNewContact({
            ...newContact,
            [evt.target.name]: value,
            ["name"]:newContact.first_name+newContact.last_name
        });
        console.log(newContact)
    }
    async function handleSubmit (e){
        e.preventDefault()
        const url = "https://mf-api-customer-nccrp.ondigitalocean.app/api/customers"
        const name =` ${newContact.first_name} ${newContact.last_name}`
        const res = await axios.post(url , {...newContact,name} ,{
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
        router.back()
    }
    function cancel(e){
        e.propertyIsEnumerable()
        router.back()
    }
    return (
            <div className={"addContactSession"}>
            <div className="addContactSession_info_ss addContactSession_ss">
                        <div className="ss_row addContactSession_title">
                            New Contact
                        </div>
                        <div className={"ss_row"}>
                            <MF_Input title="First Name*" name={"first_name"} value={newContact.first_name} onChange={handleChange}/>
                            <MF_Input title="Last Name*" name={"last_name"} value={newContact.last_name} onChange={handleChange}/>

                        </div>
                    <div className={"ss_row"}>
                        <MF_Input title="Phone*" name={"phone"} value={newContact.phone} placeholder={"e.g. 852XXXXXXXX"} onChange={handleChange}/>
                        <MF_Input title="Email" name={"email"} value={newContact.email} onChange={handleChange}/>
                    </div>
                    <div className={"ss_row"}>
                        <MF_Input title="Birthday" name={"birthday"} value={newContact.birthday} onChange={handleChange} placeholder={"dd/mm/yyyy"}/>
                        <MF_Input title="Gender" name={"gender"} value={newContact.gender} onChange={handleChange} placeholder={"M or F"}/>
                    </div>
                    <span className="longInput"><MF_Input title="Address" name={"address"} value={newContact.address} onChange={handleChange}/></span>
                <MF_Input title="Country" name={"country"} value={newContact.country} onChange={handleChange} />

                <div className={"ss_row submit_row"}>
                        <button onClick={handleSubmit}>+ New Contact</button>
                        <Link href="/contacts"><button className={"mf_bg_light_grey mf_color_text"} onClick={cancel}>Cancel</button></Link>
                    </div>
            </div>

                <div className={"addContactSession_ss  addContactSession_tags_ss"}>
                        <div className={"tagsGroup"}>
                            <div className={"addContactSession_title"}>Tags & Assignee</div>
                            <p>Tags</p>
                            <div className={"tagsGroup"}>
                                {/*<Pill color="vip">VIP</Pill>*/}
                                {/*<Pill color="newCustomer">New customer</Pill>*/}
                                {/*<Pill color="vvip">VVIP</Pill>*/}
                                {/*<Pill color="vvip">VVIP</Pill>*/}
                                {/*<Pill color="vvip">VVIP</Pill>*/}
                                {/*<Pill color="vvip">VVIP</Pill>*/}
                                {/*<Pill color="vvip">VVIP</Pill>*/}
                                {/*<Pill color="vvip">VVIP</Pill>*/}
                                {/*<Pill color="vvip">VVIP</Pill>*/}
                                {/*<Pill color="vvip">VVIP</Pill>*/}
                                {/*<Pill color="promotions">Promotions</Pill>*/}
                                {/*<Pill color={"add"}>+</Pill>*/}
                            </div>
                        </div>
                        <div className={"tagsGroup"}>
                            <p>Assignee</p>
                            <div className={"tagsGroup"}>
                                {/*<Pill color="lightYellow" size="size30">MF</Pill>*/}
                                {/*<Pill color="lightBlue" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightPurple" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightRed" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color="lightGreen" size="size30">VS</Pill>*/}
                                {/*<Pill color={"add"} size={"30"}>+</Pill>*/}
                            </div>
                        </div>
                </div>

            </div>
    )
}