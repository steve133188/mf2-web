import Avatar from '@mui/material/Avatar';
import {NormalButton,NormalButton2, CancelButton} from "./Button";
import {Input2, MF_Input} from "./Input"
import {Checkbox} from "./Checkbox"

export function AccountSettingPanel() {
    return (
        <div className="accountSettingPanel">
            <h2>Account</h2>
            <div className="avatarGroup">
                <Avatar sx={{
                    bgcolor: "#FCECD2",
                    color: "#F1B44C",
                    width: "90px",
                    height: "90px",
                    fontSize: "41px"
                }}>MF</Avatar>
                <NormalButton>Upload</NormalButton>
                <CancelButton>Remove</CancelButton>
            </div>
            <div className="infoInputSet">
                <div className="row">
                    <MF_Input title="Username">Mary Foster</MF_Input>
                    <MF_Input title="Phone">+852 6093 4495</MF_Input>
                </div>
                <div className="row">
                    <MF_Input disabled="disabled" title="Email">mary.foster@gmail.com</MF_Input>
                    <MF_Input title="Phone2"></MF_Input>
                </div>
            </div>
            {/*<CheckboxGroup1 title="Filter">*/}
                <Checkbox checked="checked">ENG</Checkbox>
                <Checkbox>繁中</Checkbox>
                <Checkbox>简中</Checkbox>
            {/*</CheckboxGroup1>*/}
            <NormalButton2>Save Changes</NormalButton2>
        </div>
    )
}
