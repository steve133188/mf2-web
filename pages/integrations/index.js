import {Card_channel} from "../../components/Cards";

export default function Integrations() {
    return (
        <div className="integrations-layout">
                <div className="container-fluid cardChannelGroupContainer">
                    <div className="cardChannelGroup">
                        <h1 >My Channels</h1>
                        <div className="row cardContainer">
                            <Card_channel src="Group 4965.svg" name="WhatsApp"/>
                        </div>
                    </div>
                    <div className="cardChannelGroup">
                        <h1  >Channels</h1>
                        <div className="row cardContainer">
                            <Card_channel src="MF_Channel_Facebook/Group 5165.svg" disabled={true} name="WhatsApp Business API"/>
                            <Card_channel src="Group 5167.svg" disabled={true} name="WeChat"/>
                            <Card_channel src="Group 4965.svg" disabled={true} name="Facebook Messager"/>
                            <Card_channel src="MF_Channel_Facebook/Mask Group 48.svg" disabled={true} name="Line"/>
                            <Card_channel src="MF_Channel_Facebook/Mask Group 51.svg" disabled={true} name="Signal"/>
                            <Card_channel src="MF_Channel_Facebook/Mask Group 50.svg" disabled={true} name="Telegram"/>
                        </div>
                    </div>
                </div>
            </div>

    )
}