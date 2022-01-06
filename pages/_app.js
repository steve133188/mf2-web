import '../styles/globals.scss'
import Layout from "../layouts/Layout";
import { GlobalContextProvider} from "../context/GlobalContext";
import {useEffect , useState} from "react";
import AuthLayer from "../HOC/AuthLayer"
import Head from "next/head";

import {Amplify} from "aws-amplify";
// import {ApolloProvider} from "@apollo/client"
// import Client from "aws-appsync";
// import client from "../apollo-client"
import awsmobile from "../src/aws-exports";


Amplify.configure(awsmobile)

function MyApp({ Component, pageProps }) {
    // const client = new Client({
    //     uri: "https://ogvqtslekzfhba4lqua3khxqlm.appsync-api.ap-east-1.amazonaws.com/graphql",
    //     region:"ap-east-1",
    //     auth:{
    //         type:"API_KEY",
    //         apiKey:"da2-ou5n2avhtfh2rjf37sf6upozkm"
    //     }
    // })
    const [connected, setConnected] = useState(false);
  return(
      <>
      <Head>
          <title>MatrixForce 2.0</title>
          <meta name="description" content="The best social commerce solution"/>
          <link rel="icon" href="/MS_logo-square (1).svg"/>
          <link href='https://fonts.googleapis.com/css?family=Manrope' rel='stylesheet'/>
      </Head>
          {/*<ApolloProvider client={client}>*/}
            <GlobalContextProvider>
                <AuthLayer>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </AuthLayer>
            </GlobalContextProvider>
          {/*</ApolloProvider>*/}
      </>
)
}

export default MyApp
