import React, { useState } from 'react';
// import About from './About';
// import Blog from './Blog';
// import Footer from '../components/Footer';

const Menu = () => {
  return (
    <>
    <div>

{/* <div id="js-scroll-content"> */}
<section
            //  style="background-image: url(assets/images/menu-bg.png);"
                className="our-menu section bg-light repeat-img" id="menu">
                <div className="sec-wp">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="sec-title text-center mb-5">
                                    <p className="sec-sub-title mb-3">our menu</p>
                                    <h2 className="h2-title">wake up early, <span>eat fresh & healthy</span></h2>
                                
                                </div>
                            </div>
                        </div>
                        <div className="menu-tab-wp">
                            <div className="row">
                                <div className="col-lg-12 m-auto">
                                    <div className="menu-tab text-center">
                                        <ul className="filters">
                                            <div className="filter-active"></div>
                                            <li className="filter" data-filter=".all, .breakfast, .lunch, .dinner">
                                                <img src="assets/images/menu-1.png" alt=""/>
                                                All
                                            </li>
                                            <li className="filter" data-filter=".breakfast">
                                                <img src="assets/images/menu-2.png" alt=""/>
                                                Breakfast
                                            </li>
                                            <li className="filter" data-filter=".lunch">
                                                <img src="assets/images/menu-3.png" alt=""/>
                                                Lunch
                                            </li>
                                            <li className="filter" data-filter=".dinner">
                                                <img src="assets/images/menu-4.png" alt=""/>
                                                Dinner
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="menu-list-row">
                            <div className="row g-xxl-5 bydefault_show" id="menu-dish">
                                <div className="col-lg-4 col-sm-6 dish-box-wp breakfast" data-cat="breakfast">
                                    <div className="dish-box text-center">
                                        <div className="disty-img">
                                            <img src="assets/images/dish/1.png" alt=""/>
                                        </div>
                                        <div className="dish-rating">
                                            5
                                            <i className="uil uil-star"></i>
                                        </div>
                                        <div className="dish-title">
                                            <h3 className="h3-title">Fresh Chicken Veggies</h3>
                                            <p>120 calories</p>
                                        </div>
                                       
                                        <div className="dist-bottom-row">
                                            <ul>
                                                <li>
                                                    <b>Rs. 499</b>
                                                </li>
                                               
    
                                              
                                            </ul>
                                        </div>
                                        <a href="partsform" className="sec-btn"> Parts Repair</a>  
                                    </div>
                                </div>

                                {/* <!-- 2 --> */}
                                <div className="col-lg-4 col-sm-6 dish-box-wp breakfast" data-cat="breakfast">
                                    <div className="dish-box text-center">
                                        <div className="dist-img">
                                            <img src="assets/images/dish/2.png" alt=""/>
                                        </div>
                                        <div className="dish-rating">
                                            4.3
                                            <i className="uil uil-star"></i>
                                        </div>
                                        <div className="dish-title">
                                            <h3 className="h3-title">Grilled Chicken</h3>
                                            <p>80 calories</p>
                                        </div>
                                        <div className="dish-info">
                                            <ul>
                                                <li>
                                                    <p>Type</p>
                                                    <b>Non Veg</b>
                                                </li>
                                                <li>
                                                    <p>Persons</p>
                                                    <b>1</b>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="dist-bottom-row">
                                            <ul>
                                                <li>
                                                    <b>Rs. 359</b>
                                                </li>
                                                <li>
                                                    <button className="dish-add-btn">
                                                        <i className="uil uil-plus"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- 3 --> */}
                               
                                {/* <!-- 4 --> */}
                                <div className="col-lg-4 col-sm-6 dish-box-wp lunch" data-cat="lunch">
                                    <div className="dish-box text-center">
                                        <div className="dist-img">
                                            <img src="assets/images/dish/4.png" alt=""/>
                                        </div>
                                        <div className="dish-rating">
                                            4.5
                                            <i className="uil uil-star"></i>
                                        </div>
                                        <div className="dish-title">
                                            <h3 className="h3-title">Chicken Noodles</h3>
                                            <p>120 calories</p>
                                        </div>
                                        <div className="dish-info">
                                            <ul>
                                                <li>
                                                    <p>Type</p>
                                                    <b>Non Veg</b>
                                                </li>
                                                <li>
                                                    <p>Persons</p>
                                                    <b>2</b>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="dist-bottom-row">
                                            <ul>
                                                <li>
                                                    <b>Rs. 379</b>
                                                </li>
                                                <li>
                                                    <button className="dish-add-btn">
                                                        <i className="uil uil-plus"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                {/* <!-- 5 --> */}
                                <div className="col-lg-4 col-sm-6 dish-box-wp dinner" data-cat="dinner">
                                    <div className="dish-box text-center">
                                        <div className="dist-img">
                                            <img src="assets/images/news.jpg" alt=""/>
                                        </div>
                                        <div className="dish-rating">
                                            5
                                            <i className="uil uil-star"></i>
                                        </div>
                                        <div className="dish-title">
                                            <h3 className="h3-title">Bread Boiled Egg</h3>
                                            <p>120 calories</p>
                                        </div>
                                        <div className="dish-info">
                                            <ul>
                                                <li>
                                                    <p>Type</p>
                                                    <b>Non Veg</b>
                                                </li>
                                                <li>
                                                    <p>Persons</p>
                                                    <b>2</b>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="dist-bottom-row">
                                            <ul>
                                                <li>
                                                    <b>Rs. 99</b>
                                                </li>
                                                <li>
                                                    <button className="dish-add-btn">
                                                        <i className="uil uil-plus"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- 6 --> */}
                                <div className="col-lg-4 col-sm-6 dish-box-wp dinner" data-cat="dinner">
                                    <div className="dish-box text-center">
                                        <div className="dist-img">
                                            <img src="assets/images/dish/6.png" alt=""/>
                                        </div>
                                        <div className="dish-rating">
                                            5
                                            <i className="uil uil-star"></i>
                                        </div>
                                        <div className="dish-title">
                                            <h3 className="h3-title">Immunity Dish</h3>
                                            <p>120 calories</p>
                                        </div>
                                        <div className="dish-info">
                                            <ul>
                                                <li>
                                                    <p>Type</p>
                                                    <b>Veg</b>
                                                </li>
                                                <li>
                                                    <p>Persons</p>
                                                    <b>2</b>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="dist-bottom-row">
                                            <ul>
                                                <li>
                                                    <b>Rs. 159</b>
                                                </li>
                                                <li>
                                                    <button className="dish-add-btn">
                                                        <i className="uil uil-plus"></i>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </div>
            {/* <About/> */}
            {/* <Blog/> */}
    {/* </div> */}
  
     </>
  )
}

export default Menu