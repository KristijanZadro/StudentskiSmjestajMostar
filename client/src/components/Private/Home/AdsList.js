import React from 'react'
import { useSelector } from 'react-redux';
import AdCart from './AdCart';
import "./Home.css"

const AdsList = () => {
    const ads = useSelector(state => state.adv.ads)
    const adsRender = ads.map((ad,index) => {
    return(
        <AdCart
            ad={ad}
            key={index}
        />
    )
})
return (
    <div className="ads-list">
        {adsRender}
    </div>
)
}
export default AdsList