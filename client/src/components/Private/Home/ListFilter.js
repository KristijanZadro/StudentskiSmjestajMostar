import React, { Component } from 'react'

import { connect } from "react-redux";

import {filterAds} from '../../../redux/actions/adv'

import './Home.css'

class ListFilter extends Component {
    constructor(){
        super()
        this.state = {
            sortedAds: [],
            ads: [],
            price: 1000,
            maxPrice: 1000,
            minPrice: 0,
            size: 400,
            maxSize: 400,
            minSize: 0,
            pets: false,
            balcony: false

            
        }
    }
    /*componentDidMount(){
        this.setAds()
    }

    setAds = () => {
        const {ads} = this.props
        const adsCopy = [...ads]
        let maxPrice = Math.max(...adsCopy.map(ad => ad.price))
        this.setState({
            ads: adsCopy,
            price: maxPrice,
            maxPrice
        })
        console.log(this.state.ads)
    }*/
    handleChange = ({ target: {value, name, type, checked } }) => { 
        const stateValue = type === 'checkbox' ? checked : value
        this.setState({
            [name]: stateValue
        }, this.filter)
        
    }
    filter = () => {
        const {price, size, pets, balcony} = this.state
        this.props.filterAds(this.props.ads, price, size, balcony, pets)
    }
    /*filterProducts = () => {
        const {price} = this.state
        const {ads} = this.props
        let tempAds = [...ads]
        
        tempAds = tempAds.filter(ad => ad.price <= price)
        
        this.setState({
            sortedAds: tempAds
        })
        //console.log(this.state.sortedAds)
    }*/
    render() {
        const {price, maxPrice, minPrice,size, maxSize, minSize, pets, balcony} = this.state
        return (
            <div>
                <div className="form-group">
                    <label htmlFor="price"> 
                        Price ${price}
                    </label>
                    <input 
                        type="range" 
                        name="price"
                        min={minPrice}
                        max={maxPrice}
                        id="price"
                        value={price}
                        step="50"
                        onChange={this.handleChange}
                        className="form-control" 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="size"> 
                        Size &#109;&sup2;{size}
                    </label> 
                    <input 
                        type="range" 
                        name="size"
                        min={minSize}
                        max={maxSize}
                        id="size"
                        value={size}
                        step="50"
                        onChange={this.handleChange}
                        className="form-control" 
                    />
                </div>
                <div className="form-group">
                    <div className="single-extra">
                        <input 
                            type="checkbox"
                            name="balcony"
                            id="balcony"
                            checked={balcony}
                            onChange={this.handleChange}
                        />
                        <label htmlFor="breakfast">balcony</label>
                    </div>
                    <div className="single-extra">
                        <input 
                            type="checkbox"
                            name="pets"
                            id="pets"
                            checked={pets}
                            onChange={this.handleChange}
                        />
                        <label htmlFor="pets">pets</label>
                    </div>
                </div>
                
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
      ads: state.adv.ads,
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      filterAds: (ads, price, size, balcony, pets) => dispatch(filterAds(ads, price, size, balcony, pets))
    };
  };
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(ListFilter);
