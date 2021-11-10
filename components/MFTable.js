import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {TableCell} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import Avatar from "@mui/material/Avatar";
import {Pill} from "./Pill";

function MFTable({filtered_data , thead ,selectState = false , selectHandler = null}){

    return(
        <TableContainer>
            <Table
                sx={{minWidth: 750}}
                aria-labelledby="tableTitle"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>    <div className="newCheckboxContainer">
                            {selectState ? <label className="newCheckboxLabel">
                                <input type="checkbox" value={d} name="checkbox" handleChange={selectHandler} />
                            </label> : null}

                        </div>
                        </TableCell>
                        {thead.map((col,index)=>{
                            return ( <TableCell key={index}>{col}</TableCell>)
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filtered_data.map((d ) => {
                        return(  <TableRow
                            key={d.id}
                            hover
                            role="checkbox"
                            tabIndex={-1}
                        >
                            {/*{thead.map((name , index)=>{*/}
                            {/*    */}
                            {/*})}*/}
                            <TableCell style={{
                                width: "30px",
                                textAlign: "center",
                                borderBottom: "1px #e0e0e0 solid"
                            }}>
                                <div className="newCheckboxContainer">
                                    {selectState ? <label className="newCheckboxLabel">
                                        <input type="checkbox" value={d} name="checkbox" handleChange={selectHandler}/>
                                    </label> : null}

                                </div>
                            </TableCell>
                            <TableCell align="left">
                                <span >{d.id}</span>
                            </TableCell>
                            <TableCell  align="left">
                                <div className={"name_td"} style={{display: "flex", alignItems: "center"}}>
                                    <Avatar alt="Remy Sharp"
                                            src={d.img_url||""}/>
                                    <span style={{marginLeft: "11px"}}>{d.name}</span>

                                </div>
                            </TableCell>


                            <TableCell align="left">
                                <Pill color="teamA">{d.team}</Pill>
                            </TableCell>

                            <TableCell
                                align="left">
                                {/*<img width="24px" height="24px" src="./whatsappChannel.svg"*/}
                                {/*     alt=""/>*/}
                            </TableCell>

                            <TableCell align="left">
                                <div className="tagsGroup"><Pill color="lightBlue">VIP</Pill><Pill
                                    color="lightPurple">New
                                    Customer</Pill></div>
                            </TableCell>

                            <TableCell align="left">
                                <div className="assigneeGroup">
                                    <Pill color="lightYellow" size="roundedPill size30">MF</Pill>
                                    <Pill color="lightBlue" size="roundedPill size30">AX</Pill>
                                    <Pill color="lightGreen" size="roundedPill size30">DS</Pill>
                                    <Pill color="lightPurple" size="roundedPill size30">EW</Pill>
                                    <Pill color="lightRed" size="roundedPill size30">KA</Pill>
                                </div>
                            </TableCell>


                        </TableRow>)
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}