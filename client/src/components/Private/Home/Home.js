import React, { Component } from 'react'
import AdsList from './AdsList'
import {connect} from "react-redux"
import { getAllAds } from '../../../redux/actions/adv'
import ListFilter from './ListFilter'
import Title from '../../../containers/Title/Title'

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
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        getAllAds: () => dispatch(getAllAds()),
        
    }
}

 export default connect(mapStateToProps, mapDispatchToProps)(Home)


