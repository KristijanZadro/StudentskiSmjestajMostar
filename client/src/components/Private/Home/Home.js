import React, { Component } from 'react'
import AdsList from './AdsList'
import {connect} from "react-redux"
import { getAllAds } from '../../../redux/actions/adv'

class Home extends Component {
    componentDidMount(){
        this.props.getAllAds()
    }
    render() {
        return (
            <div>
                <AdsList />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllAds: () => dispatch(getAllAds())
    }
}

 export default connect(null, mapDispatchToProps)(Home)


