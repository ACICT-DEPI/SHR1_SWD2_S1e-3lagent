//icons
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiWallet3Line } from "react-icons/ri";
import { CiLock } from "react-icons/ci";
import { FaPhone } from "react-icons/fa6";

//files
import "./ValueCard.css"
import React, { useEffect } from "react"; 

//animation
import aos from "aos"
import "aos/dist/aos.css"

const ValueCard =() =>{
    useEffect(()=>{
        aos.init({duration :1000})

    },[])
   


    return(
        <div className="values-class">
            <div className="value-card"  data-aos = "fade-up">
             <LiaShippingFastSolid className="icon-class" />
             <h2>Free Shipping</h2>
             <p>Orders above 200 $</p>


            </div>
            <div className="value-card"  data-aos = "fade-up">
            <RiWallet3Line className="icon-class"/>
            <h2>Money-Back</h2>
             <p>30 days guarantee</p>


            </div>
            <div className="value-card"  data-aos = "fade-up">
            <CiLock className="icon-class"/>
            <h2>Secure Payments</h2>
             <p>Secured by Stripe</p>


            </div>
            <div className="value-card"  data-aos = "fade-up">
            <FaPhone className="icon-class"/>
            <h2>24/7 Suppport</h2>
             <p>Phone and email support</p>


            </div>

        </div>
    );
}

export default React.memo(ValueCard)