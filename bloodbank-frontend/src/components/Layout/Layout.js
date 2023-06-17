import React from 'react';
import Head from 'next/head';

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Blood Bank Management System</title>
      </Head>
      <div>{children}</div>
    </>
  )
}

export default Layout