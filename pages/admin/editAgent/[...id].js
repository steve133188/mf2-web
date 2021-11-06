import {useRouter} from "next/router";
import {useState, useEffect} from "react";
import { BlueMenu2 } from "../../../components/BlueMenu";
import {
    CancelButton,
    SelectButton,
    NormalButton,
    NormalButton2,
    NormalButton3,
    CustomColorButton,
    TextWithIconButton
} from "../../../components/Button";

import {
    Input2,
} from "../../../components/Input";

import { MSelectWithImages } from "../../../components/multiSelects/MSelectWithImages";
import { SingleSelectCommon } from "../../../components/multiSelects/SingleSelectCommon";
import {CheckboxNewChannels } from "../../../components/Checkbox";

export default function editAgent() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    const {id} = router.query;
    const [agent, setAgent] = useState(
        {
            id: "1",
            username: "harry.stewart",
            name: "Harry Stewart",
            role: "Admin",
            email: "harry.stewart@gmail.com",
            phone: "+852 9765 0348",
            no_of_leads: 7,
            online_status: "online",
            locked: false,
            profile_pic: "",
            password: "",
            confirm_password: "",
        }
    );

    const roleList = [
        {id:"1",name: "Admin"},
        {id:"2", name: "Manager"},
        {id:"3", name: "Agent"}
    ]
    
    function getInitial(name) {
        var [first_name, last_name] = name.split(" ");
        return first_name.charAt(0)+last_name.charAt(0);
    }
    
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [initialName, setInitialName] = useState(getInitial(agent.name));

    function removeAvater(){

    }

    const handleInput = (field, value) => {
        setAgent({...agent, [field]: value});
    }

    function cancelEdit (){
        router.push("/admin")
    }

    return (
        <div className="admin-layout">
            {/*<Dropzone/>*/}
            <BlueMenu2 />
            <div className="rightContent">
                <div className="contactsContainer">
                    <h2>Edit Agent</h2>
                    <hr/>
                    <div className="commonMarginTop"></div>
                    <h3>Avatar</h3>
                    <div className="avaterContainer">
                        <div className="nameAvater">
                            {initialName}
                        </div>
                        <div className="avaterButtons">
                            <NormalButton2>Upload</NormalButton2>
                            <CustomColorButton color="cancel" onClick={removeAvater}>Remove</CustomColorButton>
                        </div>
                    </div>
                    <div className="commonMarginTop"></div>
                    <hr/>
                    <div className="commonMarginTop"></div>
                    <div className="common2ColumnsContainer">
                        <div className="commonFormRow">
                            <Input2 title="Username" placeholder="Username" onChange={(e)=>handleInput("username", e.target.value)} value={agent.username}></Input2>
                            <Input2 title="Email" placeholder="Email" disabled={true} value={agent.email}></Input2>
                        </div>
                        <div className="commonFormRow">
                            <Input2 title="Phone" placeholder="+852" onChange={(e)=>handleInput("phone", e.target.value)} value={agent.phone}></Input2>
                        </div>
                    </div>
                    <div className="commonMarginTop"></div>
                    <hr/>
                    <div className="commonMarginTop"></div>
                    <div className="common2ColumnsContainer">
                        <div className="commonFormRow">
                            <Input2 type="password" title="Reset Password" placeholder="reset password" onChange={(e)=>handleInput("password", e.target.value)} value={agent.password}></Input2>
                            <Input2 type="password" title="Confirm Password" placeholder="confirm password" onChange={(e)=>handleInput("confirm_password", e.target.value)} value={agent.confirm_password}></Input2>
                        </div>
                    </div>
                    <div className="commonMarginTop"></div>
                    <hr/>
                    <div className="commonMarginTop"></div>
                    <div className="common2ColumnsContainer">
                        <div className="commonFormRow">
                            <MSelectWithImages title="Assign To"></MSelectWithImages>
                            <div className="teamList">
                                <span className="team1">Team A</span>
                                <span className="team2">Team B</span>
                            </div>
                        </div>
                    </div>
                    <div className="common2ColumnsContainer">
                        <div className="commonFormRow">
                            <SingleSelectCommon title="Role" selectionList={roleList} selected="Manager"></SingleSelectCommon>
                        </div>
                    </div>
                    <hr/>
                    <div className="commonMarginTop"></div>
                    <div className="checkboxGroup2">
                        <p>Channel</p>
                        <div className="checkboxGrp">
                            <CheckboxNewChannels  src={"/allchannel.svg"}>All Channel
                            </CheckboxNewChannels >
                            <CheckboxNewChannels  src={"/whatsappCheck.svg"} checked={"checked"}>WhatsApp
                            </CheckboxNewChannels >
                            <CheckboxNewChannels  src={"/wbaCheck.svg"}>WhatsApp Business API
                            </CheckboxNewChannels >
                            <CheckboxNewChannels  src={"/messageCheck.svg"}>Messager
                            </CheckboxNewChannels >
                            <CheckboxNewChannels  src={"/wechatCheck.svg"}>WeChat
                            </CheckboxNewChannels >
                        </div>
                    </div>
                    <div className="commonMarginTop"></div>
                    <div className="avaterButtons">
                        <NormalButton2>Create</NormalButton2>
                        <CustomColorButton color="cancel" onClick={cancelEdit}>Cancel</CustomColorButton>
                    </div>
                    <div className="commonMarginTop">&nbsp;</div>
                </div>
            </div>
        </div>
    )

}