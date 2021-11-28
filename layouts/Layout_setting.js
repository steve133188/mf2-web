import  {AccountSettingPanel} from "../components/AccountSettingPanel"
import {ORGMenu} from "../components/InnerSidebar";
import {BlueMenuLink} from "../components/BlueMenuLink";

export default function Layout_live_chat (){

    return(
        <div className="layout_setting">
            <AccountSettingPanel/>
            <ORGMenu>
                {/*<BlueMenuLink link="">Account Setting</BlueMenuLink>*/}
                {/*<BlueMenuLink link="">Reset Password</BlueMenuLink>*/}
            </ORGMenu>
        </div>
    )
}