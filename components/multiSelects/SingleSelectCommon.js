import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import * as React from "react";
import {useTheme} from "@mui/material/styles";
import {CheckboxNew} from "../Checkbox"
import {ProfileImage} from "../Image"

export function SingleSelectCommon(props) {
    const theme = useTheme();
    const [selected, setSelected] = React.useState(props.selected);
    const [open, setOpen] = React.useState(false);

    const objects = props.selectionList;
   
    const handleChange = (event) => {
       setSelected(event.target.value)
    };

    const handleClose = () => {
        setOpen(false);
      };
    
      const handleOpen = () => {
        setOpen(true);
      };

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
                    open={open}
                    value={selected}
                    onChange={handleChange}
                    onClose={handleClose}
                    onOpen={handleOpen}
                    input={<OutlinedInput/>}
                    MenuProps={MenuProps}
                    inputProps={{'aria-label': 'Without label'}}
            >
                <MenuItem value="">
                    <em>Select Role</em>
                </MenuItem>
                {objects.map((obj, index) => {
                    return(
                        <MenuItem value={obj.id}>
                            {obj.name}               
                        </MenuItem>
                    )
                })}
            </Select>


        </FormControl>
    )
}