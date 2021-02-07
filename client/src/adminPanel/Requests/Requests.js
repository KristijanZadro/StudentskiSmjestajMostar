import React, { Component } from 'react'
import RequestsList from './RequestsList'
import {connect} from "react-redux"
import { getAllAdsAdmin } from '../../redux/actions/adv'

class Requests extends Component {
    componentDidMount(){
        this.props.getAllAdsAdmin()
    }
    render() {
        return (
            <div>
                <RequestsList />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllAdsAdmin: () => dispatch(getAllAdsAdmin()),
       
        
    }
}

 export default connect(null, mapDispatchToProps)(Requests)

