import React, { Component } from 'react'
import AdsList from './AdsList'
import {connect} from "react-redux"
import { getAllAds } from '../../../redux/actions/adv'
import ListFilter from './ListFilter'
import Title from '../../../containers/Title/Title'

//import { getMe } from '../../../redux/actions/auth'


class Home extends Component {
    componentDidMount(){
        this.props.getAllAds()
        
    }
  
    render() {
        return (
            <div>
                <Title title="Advertisements" />
                <ListFilter />
                <AdsList />
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
      ads: state.adv.ads,
      user: state.auth.user,
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        getAllAds: () => dispatch(getAllAds()),
        //getMe: (id,roles) => dispatch(getMe(id,roles))
       
        
    }
}

 export default connect(mapStateToProps, mapDispatchToProps)(Home)


