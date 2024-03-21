import React, { useState } from 'react';

const Team = () => {
  return (
    <div>


<section className="our-team section">
                <div className="sec-wp">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="sec-title text-center mb-5">
                                    <p className="sec-sub-title mb-3">Our Team</p>
                                    <h2 className="h2-title">Meet our Chefs</h2>
                                    <div className="sec-title-shape mb-4">
                                        <img src="assets/images/title-shape.svg" alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row team-slider">
                            <div className="swiper-wrapper">
                                <div className="col-lg-4 swiper-slide">
                                    <div className="team-box text-center">
                                        <div 
                                        // style="background-image: url(assets/images/chef/c1.jpg);"
                                            className="team-img back-img">

                                        </div>
                                        <h3 className="h3-title">Nilay Hirpara</h3>
                                        <div className="social-icon">
                                            <ul>
                                                <li>
                                                    <a href="#"><i className="uil uil-facebook-f"></i></a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="uil uil-instagram"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#">
                                                        <i className="uil uil-youtube"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                             
                               
                               
                            </div>
                            <div className="swiper-button-wp">
                                <div className="swiper-button-prev swiper-button">
                                    <i className="uil uil-angle-left"></i>
                                </div>
                                <div className="swiper-button-next swiper-button">
                                    <i className="uil uil-angle-right"></i>
                                </div>
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                    </div>
                </div>
            </section>
    </div>
  )
}

export default Team