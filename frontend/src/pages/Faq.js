import React, { useState } from 'react';

const Faq = () => {

  
    
        const [backgroundImage, setBackgroundImage] = useState('assets/images/faq-bg.png');
      
       
  return (
<>
{/* <div id="js-scroll-content"> */}
<section className="faq-sec section-repeat-img details" style={{backgroundImage: `url(${backgroundImage})`}}>
            {/* <button onClick={changeBackgroundImage}>Change Background Image</button> */}
                <div className="sec-wp">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="sec-title text-center mb-5">
                                    <p className="sec-sub-title mb-3">faqs</p>
                                    <h2 className="h2-title">Frequently <span>asked questions</span></h2>
                                    <div className="sec-title-shape mb-4">
                                        <img src="assets/images/title-shape.svg" alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="faq-row">
                        <div className="faq-box">
                                <h4 className="h4-title">Are used spare parts reliable and  durable?</h4>
                                <p> Not all the parts of a used vechicles are reliable or durable. During the prolonged use of the automobile, some of the auto parts wear out whereas some of them bend or break due to stress. While reusing such parts, there will be high chances of parts being fragile. So using used car parts can leave you helpless in the middle of the road if you get if unreliable sources.
                                But at A1 Quality Spare Parts, we sell auto parts, which are healthy and in good working condition. So the parts you purchase from us would be reliable and durable.</p>
                            </div>
                        <div className="faq-box">
                            
                                <h4 className="h4-title">Do you sell used spare parts?</h4>
                               
                                    <p>Yes, we sell used  parts. Actually, A1 Quality Spare Parts sell only used  parts. 
                                        We take  parts from used vechicles, clean and process them, bring them into working
                                         condition, and finally sell them.</p>
                            </div>
                            <div className="faq-box">
                                <h4 className="h4-title">How to sell your vehicle for parts ?</h4>
                               
                                    <p>If you have a scrap vehicle that you want to sell for parts, then look for a reliable car removal company and sell your vehicle for scrapping. They will pick-up your vehicle for free and offer you top cash that will be the worth of your car.</p>
                            </div>
                            
                           
                          
                           
                           
                            
                            <div className="faq-box">
                                <h4 className="h4-title"> How do I sign up for a user account on urunan?</h4>
                                <p>Signing up for an account on urunan is quick, easy and completely free!</p>
                            </div>
                            <div className="faq-box">
                                <h4 className="h4-title"> How long does is take to ship spare parts?</h4>
                                <p>We ship auto parts all over Australia. But depending on your location and type of car part, shipping time may vary. We have a strict rule of shipping auto parts and car accessories within 2-7 days after the order is confirmed. The delivery time is estimated based on “normal drive time”.</p>
                            </div>
                            <div className="faq-box">
                                <h4 className="h4-title">How to but spare parts online?</h4>
                                <p>The process of buying car parts online is really simple. Go through A1 Quality Spare Parts and fill in the search bar provided on the top of the page. While filling in the search bar, you need to be sure about the make, model, and year of the car. Once you provide all this information, you will find all the products related to that automobile.
                                You then need to click on the “Add to Cart” button, which will redirect you to the shipping and payment page. You need to provide your shipping address and also the means to pay for the product. We accept payment via PayPal, Visa Card, and Master Card. With the integration of the digital means of payment, we have tried to make the order procedure simple and hassle-free.</p>
                            </div>
                           
                        </div>

                    </div>
                </div>

            </section>
            {/* </div> */}


</>
  )
}

export default Faq