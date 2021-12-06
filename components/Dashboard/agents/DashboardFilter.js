
import {CancelButton, NormalButton2} from "../../../components/Button";
import {LabelSelect2} from "../../../components/Select";
import {Pill} from "../../../components/Pill";

export default function DashboardFilter(props){

    // const [open, setOpen] = React.useState(false);
    const handleClickOut = () => {
        setOpen(true);
    };
    const handleClickAway = () => {
        setOpen(false);
    };
    return(


<span className={"dashboardFilter"}>
<div className="filterArea">
    <div className="checkboxGroup1">
        <h1>Filter</h1>
        <div className="buttonGrp">
            <NormalButton2>Confirm</NormalButton2>
        </div>
            <span className="cancelBtn" onClick={handleClickAway}><CancelButton></CancelButton></span>
    </div>
    <div className="checkboxGroup2">
        <p>Channel</p>
        <div className="checkboxGrp">
            {/*<CheckboxNew src={"/allchannel.svg"}>All Channel*/}
            {/*</CheckboxNew>*/}
            {/*<CheckboxNew src={"/whatsappCheck.svg"} checked={"checked"}>WhatsApp*/}
            {/*</CheckboxNew>*/}
            {/*<CheckboxNew src={"/wbaCheck.svg"}>WhatsApp Business API*/}
            {/*</CheckboxNew>*/}
            {/*<CheckboxNew src={"/messageCheck.svg"}>Messager*/}
            {/*</CheckboxNew>*/}
            {/*<CheckboxNew src={"/wechatCheck.svg"}>WeChat*/}
            {/*</CheckboxNew>*/}
        </div>
    </div>
    <div className="agentFilter">
        <p>Organization</p>
        <LabelSelect2 placeholder={"Choose Organization"} select1={"Division 1"} select2={"Division 2"} select3={"Division 3"} select4={"Division 4"}/>
    </div>
    <div className="agentFilter">
        <p>Team</p>
        <LabelSelect2 placeholder={"Choose Team"} select1={"Division 1"} select2={"Division 2"} select3={"Division 3"} select4={"Division 4"}/>
    </div>
    <div className="agentFilter">
        <p>Agent</p>
        <LabelSelect2 placeholder={"Choose Agent"} select1={"Mary Foster"} select2={"Harry Swart"} select3={"Walter Jackson"} select4={"Denny Hackwin"}/>
        <div className="agentGroup">
            <Pill color="lightYellow" size="size30">MF</Pill>
            <Pill color="lightBlue" size="size30">MF</Pill>
        </div>
    </div>

</div>
</span>


)
}