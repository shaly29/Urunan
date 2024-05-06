import React, { useState } from 'react';

const HeroSection = () => {
    const [backgroundImage] = useState('assets/images/hero.jpg');
   


    return (
        <>
            <section className="main-banner" id="home" >
               
                <div className="sec-wp">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <div className="banner-text">
                                    <h1 className="h1-title">
                                        Find Your <span />
                                        <span>Spare Parts</span>

                                    </h1>
                                    <p className='mt-5' style={{fontSize:"21px"}}>

                                    Urunan is the Best  Place  for  Your  Spare  Parts.<br /><br /> Used  vehicle Parts are provided by Urunan to meet consumer <span> needs.</span><br />



                                      </p>
                                    <div className="banner-btn mt-5  col-md-10 col-sm-12">
                                      
                                        <a href="partsform" className="sec-btn" style={{ marginRight: '30px' }}>Parts Repair</a>
                                      
                                        <span />
                                       
                                        <a href="allproducts" className="sec-btn">View Parts</a>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="banner-img-wp">
                                <img src={require("../assets/images/hero.jpg")} className='banner-img'/>
                                </div>
                                {/* <div className="banner-img-text mt-3 m-auto">
                                    <h5 className="h5-title">Sushi</h5>
                                    <p>this is Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HeroSection