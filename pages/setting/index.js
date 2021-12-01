import Layout from '/layouts/Layout_setting'
import Avatar from "@mui/material/Avatar";
import {CancelButton, NormalButton, NormalButton2} from "../../components/Button";
import { MF_Input} from "../../components/Input";

export default function Setting() {
    return (
        <Layout>
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
                {/*    <Checkbox1 checked="checked">ENG</Checkbox1>*/}
                {/*    <Checkbox1>繁中</Checkbox1>*/}
                {/*    <Checkbox1>简中</Checkbox1>*/}
                {/*</CheckboxGroup1>*/}
                <NormalButton2>Save Changes</NormalButton2>
            </div>
        </Layout>
    )
}