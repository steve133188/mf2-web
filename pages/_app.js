import '../styles/globals.scss'
import Layout from "../layouts/Layout";
import { GlobalContextProvider} from "../context/GlobalContext";
import Head from "next/head";

import {Amplify} from "aws-amplify";
import { Provider, observer } from 'mobx-react';
import RootStore from '../utils/stores'
import awsmobile from "../src/aws-exports";
import {RootStoreProvider} from "../utils/provider/RootStoreProvider";

const rootStore = new RootStore()

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
          <RootStoreProvider store={rootStore}>
          {/*<RootStoreProvider>*/}
          {/*  <GlobalContextProvider>*/}
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
            {/*</GlobalContextProvider>*/}
          {/*</RootStoreProvider>*/}
          </RootStoreProvider>
      </>
)
}

export default MyApp
