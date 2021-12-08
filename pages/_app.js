import '../styles/globals.scss'
import Layout from "../layouts/Layout";
import { GlobalContextProvider} from "../context/GlobalContext";
import {useEffect , useState} from "react";
import AuthLayer from "../HOC/AuthLayer"
import Head from "next/head";
import {ApolloProvider} from "@apollo/client"
import client from "../apollo-client"

function MyApp({ Component, pageProps }) {
    const [connected, setConnected] = useState(false);
    useEffect(()=>{


    },[])
  return(
      <>
      <Head>
          <title>MatrixForce 2.0</title>
          <meta name="description" content="The best social commerce solution"/>
          <link rel="icon" href="/MS_logo-square (1).svg"/>
          <link href='https://fonts.googleapis.com/css?family=Manrope' rel='stylesheet'/>
      </Head>
          <ApolloProvider client={client}>
            <GlobalContextProvider>
                <AuthLayer>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </AuthLayer>
            </GlobalContextProvider>
          </ApolloProvider>
      </>
)
}

export default MyApp
