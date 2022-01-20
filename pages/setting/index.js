
import Avatar from "@mui/material/Avatar";
import { MF_Input} from "../../components/Input";
import {useContext, useEffect, useState} from "react";
import {GlobalContext} from "../../context/GlobalContext";

export default function Setting() {

    const {user ,userInstance} =useContext(GlobalContext)
    const [profile , setProfile] = useState({})
    const [password , setPassword] = useState({
        old_password:"",
        new_password:"",
        confirm_password:""
    })
    const submit = async ()=>{
        const {user_id} = profile
        const {old_password , new_password} = password
        console.log("payload",{user_id ,old_password,new_password })
        const res = await userInstance.changeUserPassword(parseInt(user_id) ,old_password,new_password )
        console.log("res :",res)
    }
    const isConfirmPassword=()=>{
        return password.new_password ==password.confirm_password && password.new_password.trim()!==""
    }
    const handleChange=e=>{
        const {name , value} = e.target
        setPassword({
            ...password,
            [name]:value
        })
        console.log(password)
    }
    useEffect(()=>{
        if(user.token){
            setProfile({...user.user})
        }
    },[])
    return (
            <div className="accountSettingPanel">
                <div className={"title"}>Account</div>
                {/*<div className="avatarGroup">*/}
                {/*    <div className={"avatar_top"}>Avatar</div>*/}
                {/*    <div className={"avatar_row"}>*/}
                {/*        <Avatar sx={{*/}
                {/*            bgcolor: "#FCECD2",*/}
                {/*            color: "#F1B44C",*/}
                {/*            width: "90px",*/}
                {/*            height: "90px",*/}
                {/*            fontSize: "41px",*/}
                {/*            fontWeight:500,*/}
                {/*        }}>MF</Avatar>*/}
                {/*        <button className={"upload"}>Upload</button>*/}
                {/*        <button className={"remove"}>Remove</button>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="form_session">
                    <div className="form_row">
                        <MF_Input disabled="disabled" value={profile.username} title="Username"/>
                        <MF_Input disabled="disabled" value={profile.phone} title="Phone"/>
                    </div>
                    <div className="form_row">
                        <MF_Input disabled="disabled" value={profile.email} title="Email"/>
                        {/*<MF_Input disabled="disabled"  title="Existing Channels"/>*/}
                        <div>Existing Channels</div>
                    </div>
                </div>
                <div className={"language_session"}>

                </div>
                <div className={"reset_password_session"}>
                    <div className={"password_col"}>
                        <MF_Input name={"old_password"} value={password.old_password} onChange={handleChange} title="Current Password"/>
                        <MF_Input name={"new_password"} value={password.new_password} onChange={handleChange} title="New Password "/>
                        <MF_Input name={"confirm_password"} value={password.confirm_password} onChange={handleChange} title="Confirm Password "/>
                    </div>
                    <div className={"password_col"}>
                        <a> Forgot Password ?</a>
                    </div>
                </div>
                <button  onClick={async ()=> {
                    await submit()
                }} className={"save_btn"}>Save Changes</button>
            </div>
    )
}
