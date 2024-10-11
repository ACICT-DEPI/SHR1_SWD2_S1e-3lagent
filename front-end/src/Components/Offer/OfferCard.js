import React from "react";
import { useEffect } from "react";
import "./OfferCard.css"

//animation
import aos from "aos"
import "aos/dist/aos.css"

const OfferCard = (props) =>{
    const {image , percentage, Offer_Title} = props


    useEffect(()=>{
        aos.init({duration :1500})

    },[])
   



    return(
        <div className="offer-card-class">
            <img src ={image} alt ="offer" />
            <div className="offer-text-class" data-aos = "zoom-in">
                <h1>Hurry up! {percentage}% OFF</h1>
                <h2 id="title-id">{Offer_Title}</h2>
                <p className="p-class">offer expires in:</p>
                <div className="time-class" data-aos = "flip-down">
                    <div className="time-text-class">
                        <p className="numbers-class">5</p>
                        <p>Days</p>
                    </div>
                    <div className="time-text-class">
                        <p  className="numbers-class">5</p>
                        <p>Hours</p>
                    </div>
                    <div className="time-text-class">
                        <p  className="numbers-class">15</p>
                        <p>Mintues</p>
                    </div>
                    <div className="time-text-class">
                        <p  className="numbers-class">5</p>
                        <p>Seconds</p>
                    </div>
                </div>
                <button id="shop-offer-button">Shop Now</button>
            </div>
        </div>
    );
}

export default React.memo(OfferCard)