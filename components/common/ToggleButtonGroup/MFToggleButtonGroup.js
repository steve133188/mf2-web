import * as React from 'react';
import styles from "./MFToggleButtonGroup.module.css"
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from '@mui/material/styles';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
        margin: theme.spacing(0.5),
        border: 0,
        borderRadius:"50%",
        '&.Mui-disabled': {
            border: 0,
        },
        '&:not(:first-of-type)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-of-type': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}));

export default function MFToggleButtonGroup(props){

    const {options , value , handleChange , childrenEl ,classes} = props

    return (
        <StyledToggleButtonGroup
            value={value}
            // exclusive
            onChange={handleChange}
            aria-label="text alignment"
            color="primary"
            classname={styles.ToggleButtonGroup}
        >
            {options&&options.map(({name ,value ,onClick , classname}, index)=>{
                return  <ToggleButton key={index}   value={value} classname={styles.ToggleButton + (classname?classname:null)} aria-label="left aligned">
                            {childrenEl?childrenEl[index] :{name}}
                        </ToggleButton>
            })}
        </StyledToggleButtonGroup>
    )
}
