import '../styles/globals.scss'
import Layout from "../layouts/Layout";
import { GlobalContextProvider} from "../context/GlobalContext";
import {useEffect , useState} from "react";
import AuthLayer from "../HOC/AuthLayer"
import {client} from "../services/websocket";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
    const [connected, setConnected] = useState(false);
    useEffect(()=>{
        // const socket = SocketIOClient.connect("http://mf-api-chat-6m4o7.ondigitalocean.app/websocket");
        //
        // socket.on("ping", () => {
        //     console.log("SOCKET CONNECTED!", socket.id);
        //     setConnected(true);
        // });

        // socket.on("message", ( msg) => {
        //     chat.push(msg);
        //     setChat([...chat]);
        // });
        //
        console.log(connected)
        // if (socket) return () => socket.disconnect();
        client.onopen = () => {
            console.log('WebSocket Client Connected');
            client.send("ping")
            client.send(JSON.stringify({topic:"send-message",url:"https://e9bf-118-140-233-2.ngrok.io",chat_id:"1234",user_id:"asd",channel_type:"whatsapp",message:"test",phone:"85269358633"}))

        };
        client.onmessage = (message) => {
            console.log(message);
        };

    },[])
  return(
      <>
      <Head>
          <title>MatrixForce 2.0</title>
          <meta name="description" content="The best social commerce solution"/>
          <link rel="icon" href="/MS_logo-square.svg"/>
          <link href='https://fonts.googleapis.com/css?family=Manrope' rel='stylesheet'/>
      </Head>

    <GlobalContextProvider>
        <AuthLayer>
      <Layout>
          {/*<DndProvider backend={HTML5Backend}>*/}
      <Component {...pageProps} />
      {/*</DndProvider>*/}
      </Layout>
        </AuthLayer>
    </GlobalContextProvider>
      </>
)
}

export default MyApp
