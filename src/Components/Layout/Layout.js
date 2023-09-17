import React from 'react'
import Header from './Header.js'
import Footer from './Footer.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
    return (
        <>
            <Header></Header>
            <main style={{ 'minHeight': '70vh' }}>{children} <ToastContainer /></main >
            <Footer></Footer>
        </>
    )
}

export default Layout