import Navbar from "../../Components/Navbar/Navbar";
import React from "react";
import Hero from "../../Components/Hero/Hero";
import ValueCard from "../../Components/Values/ValueCard";
import NewsLetter from "../../Components/NewsLetter/NewsLetter";
import Instagram from "../../Components/Instgrame/Instagram";
import Footer from "../../Components/Footer/Footer"

const Home =() =>{

    return(
        <div className="flex flex-col gap-4" >
            <Navbar />
            <Hero />
            <ValueCard />
            <NewsLetter />
            <Instagram />
            <Footer />
           
        </div>
    );
}

export default React.memo(Home)