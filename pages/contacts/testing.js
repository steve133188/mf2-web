
import {Pill} from "../../components/Pill";
import * as React from "react";

import {PaginationControlled} from "../../components/Pagination";
import {Avatar} from "../../components/Icon";
import {CheckboxNewSingle} from "../../components/Checkbox";


export default function testing() {
    return (
            <div className="broadcastContainer">
                <div className="contactsTable">
                    <table className="table">
                        <thead>
                        <tr className="headTr">
                            <th><CheckboxNewSingle/></th>
                            <th className="trID">Customer ID</th>
                            <th>Name</th>
                            <th>Team</th>
                            <th>Channel</th>
                            <th>Tags</th>
                            <th>Assignee</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="bodyTr">
                            <td><CheckboxNewSingle/></td>
                            <td><div className={"customerID"}>0000001</div></td>
                            <td><span className="contactName"><Avatar src={"https://ath2.unileverservices.com/wp-content/uploads/sites/4/2020/02/IG-annvmariv-1024x1016.jpg"}/><span style={{marginLeft: "12px"}}>Debra Patel</span></span></td>
                            <td className={"team"}><Pill color="teamA">Team A</Pill></td>
                            <td><img width="24px" height="24px" src="/whatsappChannel.svg"
                                     alt=""/></td>
                            <td><div className="tagsGroup"><Pill color="lightBlue">VIP</Pill><Pill color="lightPurple">New
                                Customer</Pill></div></td>
                            <td><div className="assigneeGroup">
                                <Pill color="lightYellow" size="roundedPill size30">MF</Pill>
                                <Pill color="lightBlue" size="roundedPill size30">AX</Pill>
                                <Pill color="lightGreen" size="roundedPill size30">DS</Pill>
                                <Pill color="lightPurple" size="roundedPill size30">EW</Pill>
                                <Pill color="lightRed" size="roundedPill size30">KA</Pill>
                            </div></td>
                        </tr>

                        <tr className="bodyTr">
                            <td><CheckboxNewSingle/></td>
                            <td><div className={"customerID"}>0000001</div></td>
                            <td><span className="contactName"><Avatar src={"https://ath2.unileverservices.com/wp-content/uploads/sites/4/2020/02/IG-annvmariv-1024x1016.jpg"}/><span style={{marginLeft: "12px"}}>Debra Patel</span></span></td>
                            <td className={"team"}><Pill color="teamA">Team A</Pill></td>
                            <td><img width="24px" height="24px" src="/whatsappChannel.svg"
                                     alt=""/></td>
                            <td><div className="tagsGroup"><Pill color="lightBlue">VIP</Pill><Pill color="lightPurple">New
                                Customer</Pill></div></td>
                            <td><div className="assigneeGroup">
                                <Pill color="lightYellow" size="roundedPill size30">MF</Pill>
                                <Pill color="lightBlue" size="roundedPill size30">AX</Pill>
                                <Pill color="lightGreen" size="roundedPill size30">DS</Pill>
                                <Pill color="lightPurple" size="roundedPill size30">EW</Pill>
                                <Pill color="lightRed" size="roundedPill size30">KA</Pill>
                            </div></td>
                        </tr>
                        <tr className="bodyTr">
                            <td><CheckboxNewSingle/></td>
                            <td><div className={"customerID"}>0000001</div></td>
                            <td><span className="contactName"><Avatar src={"https://ath2.unileverservices.com/wp-content/uploads/sites/4/2020/02/IG-annvmariv-1024x1016.jpg"}/><span style={{marginLeft: "12px"}}>Debra Patel</span></span></td>
                            <td className={"team"}><Pill color="teamA">Team A</Pill></td>
                            <td><img width="24px" height="24px" src="/whatsappChannel.svg"
                                     alt=""/></td>
                            <td><div className="tagsGroup"><Pill color="lightBlue">VIP</Pill><Pill color="lightPurple">New
                                Customer</Pill></div></td>
                            <td><div className="assigneeGroup">
                                <Pill color="lightYellow" size="roundedPill size30">MF</Pill>
                                <Pill color="lightBlue" size="roundedPill size30">AX</Pill>
                                <Pill color="lightGreen" size="roundedPill size30">DS</Pill>
                                <Pill color="lightPurple" size="roundedPill size30">EW</Pill>
                                <Pill color="lightRed" size="roundedPill size30">KA</Pill>
                            </div></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <PaginationControlled/>
            </div>
    )
}