import Layout from '/layouts/Layout_setting'
import Avatar from "@mui/material/Avatar";
import {CancelButton, NormalButton, NormalButton2} from "../../components/Button";
import { Input2} from "../../components/Input";

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
                        <Input2 title="Username">Mary Foster</Input2>
                        <Input2 title="Phone">+852 6093 4495</Input2>
                    </div>
                    <div className="row">
                        <Input2 disabled="disabled" title="Email">mary.foster@gmail.com</Input2>
                        <Input2 title="Phone2"></Input2>
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