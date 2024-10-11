import React from "react";
import "./NewsLetter.css";

import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

const NewsLetter  = () =>{


    return(
        <div className="news-letter-class">
            <h2>Join Our Newsletter</h2>
            <p>Sign uo for deals , new products and promotions</p>
            <div className="sign-up-letter-news">
                <MdEmail  className="email-icon"/>
                <input type="email" placeholder="Email address" />
               
                <Link>sign up</Link>

            </div>
        </div>
    );
}

export default React.memo(NewsLetter)