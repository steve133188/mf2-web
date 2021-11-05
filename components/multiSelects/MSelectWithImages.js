import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import * as React from "react";
import {useTheme} from "@mui/material/styles";
import {CheckboxNew} from "../Checkbox"
import {ProfileImage} from "../Image"

export function MSelectWithImages(props) {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);

    const teamAgents = [
        {
            name: "Team A",
            members: [{
                image: "https://ath2.unileverservices.com/wp-content/uploads/sites/4/2020/02/IG-annvmariv-1024x1016.jpg",
                name: "Debra Patel"
            }, {
                image: "https://ath2.unileverservices.com/wp-content/uploads/sites/4/2020/02/IG-annvmariv-1024x1016.jpg",
                name: "Lori Foster"
            },{
                image: "https://ath2.unileverservices.com/wp-content/uploads/sites/4/2020/02/IG-annvmariv-1024x1016.jpg",
                name: "Jacob Grand"
            }]
        },
        {
            name: "Team B",
            members: [{
                image: "https://ath2.unileverservices.com/wp-content/uploads/sites/4/2020/02/IG-annvmariv-1024x1016.jpg",
                name: "Debra Patel"
            }, {
                image: "https://ath2.unileverservices.com/wp-content/uploads/sites/4/2020/02/IG-annvmariv-1024x1016.jpg",
                name: "Lori Foster"
            },{
                image: "https://ath2.unileverservices.com/wp-content/uploads/sites/4/2020/02/IG-annvmariv-1024x1016.jpg",
                name: "Jacob Grand"
            }]
        }, {
            name: "Team C",
            members: [{
                image: "https://ath2.unileverservices.com/wp-content/uploads/sites/4/2020/02/IG-annvmariv-1024x1016.jpg",
                name: "Debra Patel"
            }, {
                image: "https://ath2.unileverservices.com/wp-content/uploads/sites/4/2020/02/IG-annvmariv-1024x1016.jpg",
                name: "Lori Foster"
            },{
                image: "https://ath2.unileverservices.com/wp-content/uploads/sites/4/2020/02/IG-annvmariv-1024x1016.jpg",
                name: "Jacob Grand"
            }]
        }
    ];
    const handleChange = (event) => {
        const {
            target: {value},
        } = event;
        setPersonName(
            // On autofill we get a the stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleTeamSelect = (event) => {
        let id = event.target.id;
    }


    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    teamAgents.map((team, index) => {
        console.log(team.name)
    })
    return(
        <FormControl sx={{m: 0, width: 171, mt: 1}}>
            <span className="inputTitle">{props.title}</span>
            <Select sx={{
                height: 28,
                marginBottom: 0.3,
                marginRight: 3,
                borderRadius: 2,
                background: "white"
                }}
                    multiple
                    displayEmpty
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput/>}
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                            return <span>Select</span>;
                        }
                        return selected.join(', ');
                    }}
                    MenuProps={MenuProps}
                    inputProps={{'aria-label': 'Without label'}}
            >
                {teamAgents.map((team, index) => {
                    return(
                        <>
                        <MenuItem value={team.name} key={index}>
                            <CheckboxNew onChange={handleTeamSelect} id={team.id}>{team.name}</CheckboxNew>
                                           
                        </MenuItem>
                        {team.members.map((member) => {
                            return (
                                <MenuItem value={member.name} key={index}>
                                    <CheckboxNew id={team.id} src={member.image}>{member.name}</CheckboxNew>
                                </MenuItem>
                            )
                        })}
                        </>
                    )
                })}
                
            </Select>


        </FormControl>
    )
}