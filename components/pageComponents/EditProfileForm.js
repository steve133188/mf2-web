import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import {Input2} from "../Input";
import Link from "next/link";
import * as React from "react";

export default function EditProfileForm({data}){
    const [editContact , setEditContact] = useState(data)
    const router = useRouter()

    useEffect(()=>{
    //update edited info by id
    },[])


    function handleChange(evt) {
        const value = evt.target.value;
        setEditContact({
            ...editContact,
            [evt.target.name]: value,
            ["name"]:editContact.first_name+editContact.last_name
        });
        console.log(editContact)
    }
    async function handleSubmit (e){
        e.preventDefault()
        const url = "https://mf-api-customer-nccrp.ondigitalocean.app/api/customers"
        const name =` ${editContact.first_name} ${editContact.last_name}`
        console.log(name)

        const res = await axios.put(url , editContact ,{
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
                    <Input2 title="First Name*" name={"first_name"} value={editContact.first_name} onChange={handleChange}/>
                    <Input2 title="Last Name*" name={"last_name"} value={editContact.last_name} onChange={handleChange}/>

                </div>
                <div className={"ss_row"}>
                    <Input2 title="Phone*" name={"phone"} value={editContact.phones} placeholder={"e.g. 852XXXXXXXX"} onChange={handleChange}/>
                    <Input2 title="Email" name={"email"} value={editContact.email} onChange={handleChange}/>
                </div>
                <div className={"ss_row"}>
                    <Input2 title="Birthday" name={"birthday"} value={editContact.birthday} onChange={handleChange} placeholder={"dd/mm/yyyy"}/>
                    <Input2 title="Gender" name={"gender"} value={editContact.gender} onChange={handleChange} placeholder={"M or F"}/>
                </div>
                <span className="longInput"><Input2 title="Address" name={"address"} value={editContact.address} onChange={handleChange}/></span>
                <Input2 title="Country" name={"country"} value={editContact.country} onChange={handleChange} />

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