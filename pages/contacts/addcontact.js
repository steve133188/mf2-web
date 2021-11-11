import {Input2} from "../../components/Input";
import {Pill} from "../../components/Pill";
import * as React from "react";
import {CancelButton, NormalButton2} from "../../components/Button";
import Link from "next/link"
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export default function AddContact() {
    const [newContact , setNewContact] = useState({
        first_name:"",
        last_name:"",

    })
    const router = useRouter()

    useEffect(()=>{

    },[])


    return (
            <div className={"addContactSession"}>
            <div className="addContactSession_info_ss addContactSession_ss">
                        <div className="ss_row addContactSession_title">
                            New Contact
                        </div>
                        <div className={"ss_row"}>
                            <Input2 title="Phone*">+852 9765 0348</Input2>
                            <Input2 title="Email*">debra.patel@gmail.com</Input2>
                        </div>
                    <div className={"ss_row"}>
                        <Input2 title="First Name"></Input2>
                        <Input2 title="Last Name"></Input2>
                    </div>
                    <div className={"ss_row"}>
                        <Input2 title="Birthday">Birthday</Input2>
                        <Input2 title="Gender">Birthday</Input2>
                    </div>
                    <span className="longInput"><Input2
                        title="Address">233 Wan Chai Rd, Wan Chai, HK</Input2>
                        </span>
                <Input2 title="Country">Hong Kong</Input2>

                <div className={"ss_row submit_row"}>
                        <NormalButton2>+ New Contact</NormalButton2>
                        <Link href="/contacts"><a><CancelButton></CancelButton></a></Link>
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