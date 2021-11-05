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

export default function editAgent() {
    const router = useRouter()
    const {id} = router.query;
    const [agent, setAgent] = useState(
        {
            id: "1",
            name: "Harry Stewart",
            role: "Admin",
            email: "Harry.stewart@gmail.com",
            phone: "+852 9765 0348",
            no_of_leads: 7,
            online_status: "online",
            locked: false
        }
    );
    
    function getInitial(name) {
        var [first_name, last_name] = name.split(" ");
        return first_name.charAt(0)+last_name.charAt(0);
    }
    
    const [initialName, setInitialName] = useState(getInitial(agent.name));

    function removeAvater(){

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
                    <div className="commonContainer">
                        
                    </div>
                </div>
            </div>
        </div>
    )

}