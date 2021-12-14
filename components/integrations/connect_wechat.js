export default function ConnectWeChat(){


    return(<>
    <div className="intergra_container">
        <div>
        </div>

            <form className="login_form" id="wechat_form">
        <p>Get pageAccessToken and verification code with following steps:</p>
                <label>Create a WeChat Developer Account.</label>
                    <input type="text" id="dacc" style={{width:"80%"}}></input>
                <label>Application ID</label>
                    <input type="text" id="appid"></input>
                <label>Application Secret</label>
                    <input type="text" id="appSecret"></input>
                <label>Verify Token </label>
                    <input type="text" id="token"></input>
                
            </form>


    </div>
    </>)
}