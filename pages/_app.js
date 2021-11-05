import '../styles/globals.scss'
import Layout from "../layouts/Layout";
import { GlobalContextProvider} from "../context/GlobalContext";
import {useEffect} from "react";
import AuthLayer from "../HOC/AuthLayer"
import {client} from "../services/websocket";
import Head from "next/head";
// import { HTML5Backend } from 'react-dnd-html5-backend'
// import { DndProvider } from 'react-dnd'

function MyApp({ Component, pageProps }) {
    useEffect(()=>{
        // client.onopen = () => {
        //     console.log('WebSocket Client Connected');
        // };
        // client.onmessage = (message) => {
        //     console.log(message);
        // };
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
