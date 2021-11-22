import '../styles/globals.scss'
import Layout from "../layouts/Layout";
import { GlobalContextProvider} from "../context/GlobalContext";
import {useEffect , useState} from "react";
import AuthLayer from "../HOC/AuthLayer"
// import SocketIOClient from "socket.io-client";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import {client} from "../services/websocket";
import Head from "next/head";
// import { HTML5Backend } from 'react-dnd-html5-backend'
// import { DndProvider } from 'react-dnd'

function MyApp({ Component, pageProps }) {
    const [connected, setConnected] = useState(false);
    useEffect(()=>{
        // const socket = SocketIOClient.connect("http://mf-api-chat-6m4o7.ondigitalocean.app:3003/websocket");
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
