//files

import "./Hero.css"
import aos from "aos"
import "aos/dist/aos.css"
import { Link } from "react-router-dom";



//imports 

import React from "react";
import { useEffect } from "react";


const Hero = ()=>{
    useEffect(()=>{
        aos.init({duration :100})

    },[])
   
    return(

        <div className="Hero-class"  >
           <div className="hero-text-class"  data-aos = "fade-left">
                <h1>Listen to <br/>the <span className="blue-text">amazing</span><br/>music sound.</h1>
                <p>Experince music like never before</p>
               <Link to="/shop"> <button className="button-class-shop" >Shopping Now</button></Link>
         
           </div>
          
        </div>
    );
}


export default React.memo(Hero)