import {useRouter} from "next/router";
import {useState, useEffect} from "react";
import {
    CancelButton,
    FunctionButton,
    FunctionCancelButton,
    ConfirmButton,
} from "../../../components/Button";

import {
    Input2,
} from "../../../components/Input";

import { MSelectWithImages } from "../../../components/multiSelects/MSelectWithImages";
import { SingleSelectCommon } from "../../../components/multiSelects/SingleSelectCommon";

import styles from "../../../styles/pages/editAgent.module.scss"
import {InnerSidebar} from "../../../components/InnerSidebar";

export default function EditAgent() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter()
    const {id} = router.query;
    console.log(id);
    // eslint-disable-next-line react-hooks/rules-of-hooks
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

    useEffect (async () => {
        const agent_get_request = await PostAPIAction(post_link.GET_USERS_BY_TEAM, "POST",  {"team": teamName,
        "division": "Division1"});
        if(agents_get_request.status ==200) {
            setAgents_get(agents_get_request.payload.data);
            setAgents(agents_get_request.payload.data);
        }        
    });

    return (
        <div className="admin_layout">
            {/*<Dropzone/>*/}
            <InnerSidebar />
            <div className="rightContent">
                <div className="contactsContainer">
                    <h2>Edit Agent</h2>
                    <hr/>
                    <div className={styles.commonMarginTop}></div>
                    <h3 className={styles.avatarTitle}>Avatar</h3>
                    <div className={styles.avaterContainer}>
                        <div className={styles.nameAvater}>
                            {initialName}
                        </div>
                        <div className={styles.avaterButtons}>
                            <FunctionButton>Upload</FunctionButton>
                            <FunctionCancelButton>Remove</FunctionCancelButton>
                        </div>
                    </div>
                    <div className={styles.commonMarginTop}></div>
                    <hr/>
                    <div className={styles.commonMarginTop}></div>
                    <div className={styles.common2ColumnsContainer}>
                        <div className={styles.commonFormRow}>
                            <Input2 title="Username" placeholder="Username" onChange={(e)=>handleInput("username", e.target.value)} value={agent.username}></Input2>
                            <Input2 title="Email" placeholder="Email" disabled={true} value={agent.email}></Input2>
                        </div>
                        <div className={styles.commonFormRow}>
                            <Input2 title="Phone" placeholder="+852" onChange={(e)=>handleInput("phone", e.target.value)} value={agent.phone}></Input2>
                        </div>
                    </div>
                    <div className={styles.commonMarginTop}></div>
                    <hr/>
                    <div className={styles.commonMarginTop}></div>
                    <div className={styles.common2ColumnsContainer}>
                        <div className={styles.commonFormRow}>
                            <Input2 type="password" title="Reset Password" placeholder="reset password" onChange={(e)=>handleInput("password", e.target.value)} value={agent.password}></Input2>
                            <Input2 type="password" title="Confirm Password" placeholder="confirm password" onChange={(e)=>handleInput("confirm_password", e.target.value)} value={agent.confirm_password}></Input2>
                        </div>
                    </div>
                    <div className={styles.commonMarginTop}></div>
                    <hr/>
                    <div className={styles.commonMarginTop}></div>
                    <div className={styles.common2ColumnsContainer}>
                        <div className={styles.commonFormRow}>
                            <MSelectWithImages title="Assign To"></MSelectWithImages>
                            <div className={styles.teamList}>
                                <span className={styles.team1}>Team A</span>
                                <span className={styles.team2}>Team B</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.common2ColumnsContainer}>
                        <div className={styles.commonFormRow}>
                            <SingleSelectCommon title="Role" selectionList={roleList} selected="Manager"></SingleSelectCommon>
                        </div>
                    </div>
                    <hr/>
                    <div className={styles.commonMarginTop}></div>
                    <div className={styles.checkboxGroup2}>
                        <p>Channel</p>
                        <div className={styles.checkboxGrp}>
                            {/*<CheckboxNewChannels  src={"/allchannel.svg"}>All Channel*/}
                            {/*</CheckboxNewChannels >*/}
                            {/*<CheckboxNewChannels  src={"/whatsappCheck.svg"} checked={"checked"}>WhatsApp*/}
                            {/*</CheckboxNewChannels >*/}
                            {/*<CheckboxNewChannels  src={"/wbaCheck.svg"}>WhatsApp Business API*/}
                            {/*</CheckboxNewChannels >*/}
                            {/*<CheckboxNewChannels  src={"/messageCheck.svg"}>Messager*/}
                            {/*</CheckboxNewChannels >*/}
                            {/*<CheckboxNewChannels  src={"/wechatCheck.svg"}>WeChat*/}
                            {/*</CheckboxNewChannels >*/}
                        </div>
                    </div>
                    <div className={styles.commonMarginTop}></div>
                    <div className="saveFormButtonsContainer">
                        <ConfirmButton>Save Changes</ConfirmButton>
                        <CancelButton></CancelButton>
                    </div>
                    <div className={styles.commonMarginTop}>&nbsp;</div>
                </div>
            </div>
        </div>
    )

}