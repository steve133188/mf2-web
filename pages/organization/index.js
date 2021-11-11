import {BlueMenu} from "../../components/BlueMenu";
import {BlueMenuDropdown, BlueMenuLink} from "../../components/BlueMenuLink";
import {Search3} from "../../components/Input";
import {NormalButton, NormalButton2} from "../../components/Button";
import {NavbarPurple} from "../../components/NavbarPurple";
import {BroadcastTable} from "../../components/Table";
import {PaginationControlled} from "../../components/Pagination";
import {Badge} from "../../components/Badge";
import {StatusPill} from "../../components/Pill";
import {useState , useEffect} from "react";
import SearchSession from "../../components/SearchSession";
import Link from "next/link";
import SelectSession from "../../components/SelectSession";

export default function Organization() {
    const [filter , setFilter ]=useState("")
    const [isSelectRow , setIsSelectRow ]=useState(false)
    function toggleSelectRow() {
        setIsSelectRow(!isSelectRow);
    }
    const handleFilterChange = (e) =>{
        e.preventDefault()
        setFilter(e.target.value)
    }
    return (
        <div className="organization-layout">
            <BlueMenu></BlueMenu>
            <div className="rightContent">
                <div className="broadcastContainer">
                    <SearchSession
                        placeholder={"Search"}
                        handleChange={handleFilterChange}
                        value={filter.keyword}
                    >
                        {!isSelectRow ? (
                            <button onClick={toggleSelectRow} className={"mf_bg_light_blue mf_color_blue"}> Select </button>
                        ) : (
                            <button  onClick={toggleSelectRow} className={"mf_bg_light_grey mf_color_text"}> Cancel</button>
                        )}
                        <button>+ New Team</button>
                        <Link href="/contacts/addcontact"><button>+ New Division</button></Link>
                    </SearchSession>
                    <SelectSession btn={(<button style={{marginLeft: "auto"}}>+ New Agent</button>)}>

                    </SelectSession>
                    <div className="broadcastTable">
                        <table className="table">
                            <thead>
                            <tr className="headTr">
                                <th className="trID">Name</th>
                                <th>Role</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>No. Of Leads</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="bodyTr">
                                <td style={{display: "flex"}}>
                                    <div className="selectStatusOnline"></div>Harry Stewart
                                </td>
                                <td>Admin</td>
                                <td>Harry.stewart@gmail.com</td>
                                <td>+852 9765 0348</td>
                                <td>7</td>
                            </tr>
                            <tr>
                                <td style={{display: "flex"}}>
                                    <div className="selectStatusOffline"></div><span>Jasmine Miller</span></td>
                                <td>Agent</td>
                                <td>jasmine.miller@gmail.com</td>
                                <td>+852 9765 0348</td>
                                <td>6</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <PaginationControlled/>
                </div>
            </div>
        </div>
    )
}