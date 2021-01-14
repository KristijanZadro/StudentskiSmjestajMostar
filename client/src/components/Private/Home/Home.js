import React, { Component } from 'react'
import AdsList from './AdsList'
import {connect} from "react-redux"
import { getAllAds } from '../../../redux/actions/adv'
import ListFilter from './ListFilter'

class Home extends Component {
    componentDidMount(){
        this.props.getAllAds()
    }
    
    /*filterProducts = () => {
        const {price, size} = this.state.filters
        const {ads} = this.props
        let tempAds = [...ads]
        
        tempAds = tempAds.filter(ad => ad.price <= price)
        
        tempAds = tempAds.filter(ad => ad.size <= size)

        this.setState({
            sortedAds: tempAds
        })
    }*/
   
    
        /*const {ads} = this.props
        let tempAds = [...ads]
        let maxPrice = Math.max(...tempAds.map(ad => ad.price))
        let maxSize = Math.max(...tempAds.map(ad => ad.dize))
        let filtersCopy = {
            price: maxPrice,
            size: maxSize,
            maxPrice,
            maxSize,
        }
        this.setState({
            sortedAds: tempAds,
            filters: filtersCopy
        })*/
    

   
  
    render() {
        return (
            <div>
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


