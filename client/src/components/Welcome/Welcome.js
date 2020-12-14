import React from 'react'
import Content from '../../containers/Content/Content'
import Header from '../../containers/Header/Header'
import Footer from '../../containers/Footer/Footer'

export default function Welcome() {
    return (
        <div>
            <Header title="Studentski Smještaj Mostar" />
            <Content />
            <Footer />
        </div>
    )
}
