"use client"; // ✅
import React, { Component } from 'react'
import Layout from './layout'
import { AppProps } from 'next/app'


export default function Myapp({ Component, pageProps }) {
  return (
    <Layout>
        <Component {...pageProps}/>
    </Layout>
  )
}
