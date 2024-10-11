
import React from "react";
import { useEffect } from "react";
import "./Instagram.css"

//animation 
import aos from "aos"
import "aos/dist/aos.css"


const Instagram = () =>{

    useEffect(()=>{
        aos.init({duration :1000})

    },[])



    return (
        <div className="insta-class">
            <div className="flex flex-col gap-6 items-center mb-6">
            <h2>Instagram</h2>
            <p>Follow us on social media for more discount & promotions</p>
            <p>@3legant_official</p>
            </div>
            <div className="images-insta">
                <img src={require("../../Assets/images/Paste image(1).png")} alt ="insta"   data-aos = "zoom-in"/>
                <img src={require("../../Assets/images/Paste image(2).png")} alt ="insta"   data-aos = "zoom-in"/>
                <img src={require("../../Assets/images/Paste image(4).png")} alt ="insta"   data-aos = "zoom-in"/>
                <img src={require("../../Assets/images/Paste image(5).png")} alt ="insta"   data-aos = "zoom-in"/>
                
            </div>
        </div>
    );
}

export default React.memo(Instagram)