import React from 'react'
import './styles/Page.css'

function Page({children, direction}) { 
    return (
        <section className="page">
            {children}
        </section>
    )
}


export default Page;