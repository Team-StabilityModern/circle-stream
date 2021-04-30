import '../styles/globals.css'
import 'bulma';
import React from 'react';
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>CircleStream</title>
      </Head>
      <section className="section" style={{
        maxWidth: "50vw",
        margin: "0 auto",
      }}>
        <Component {...pageProps} />
      </section>
    </>
  )
}

export default MyApp
