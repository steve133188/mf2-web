import '../styles/globals.scss'
import Layout from "../layouts/Layout";
import { GlobalContextProvider} from "../context/GlobalContext";
import AuthLayer from "../HOC/AuthLayer"
import Head from "next/head";

import {Amplify} from "aws-amplify";
import { Provider, observer } from 'mobx-react';
import stores from '../utils/stores'
import awsmobile from "../src/aws-exports";
import {RootStoreProvider} from "../utils/provider/RootStoreProvider";


Amplify.configure(awsmobile)

function MyApp({ Component, pageProps }) {

  return(
      <>
      <Head>
          <title>MatrixForce 2.0</title>
          <meta name="description" content="The best social commerce solution"/>
          <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
          <link rel="icon" href="/MS_logo-square (1).svg"/>
          <link href='https://fonts.googleapis.com/css?family=Manrope' rel='stylesheet'/>
      </Head>
          <Provider {...stores}>
          {/*<RootStoreProvider>*/}
            <GlobalContextProvider>
                <AuthLayer>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </AuthLayer>
            </GlobalContextProvider>
          {/*</RootStoreProvider>*/}
          </Provider>
      </>
)
}

export default MyApp
