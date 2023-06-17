import React from 'react';
import { Layout } from '@/components/Layout';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../style/style.css';
import { GlobalProvider } from '@/context/GlobalContext';

const MyApp = ({ Component, pageProps }) => {
  return (
    <GlobalProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GlobalProvider>
  )
}

export default MyApp