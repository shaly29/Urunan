import React, { useState } from 'react';

const Service = () => {
    const [backgroundImage] = useState('assets/images/srv.png');

  return (
    <div>

<section className="service section bg-light">
                <div className="sec-wp">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="sec-title text-center mb-5">
                                    <p className="sec-sub-title mb-3"> Our Services</p>
                                    {/* <h2 className="h2-title"> our  <span>services</span></h2> */}
                                    {/* <div className="sec-title-shape mb-4">
                               <img src="assets/images/bt1.jpg" alt=""/>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-5">
                                <div className="service-img">
                                <img src={require("../assets/images/im.jpg")} />
                                </div>
                            </div>
                            <div className="col-lg-7">
                                <div className="row">
                                    <div className="col-sm-6">
                                        <div className="service-box">
                                            <div className="testimonial-box-top">
                                           
                                                
                                            <img src={require("../assets/images/app3.jpg")} className='service-box-img back-img' />
                                            </div>
                                            <div className="service-box-text">
                                                <h3 className="h3-title">
                                                    Repairing Parts
                                                </h3>
                                                <p  style={{fontSize:"21px",color:"#763B45"}}>
                                                    We are repairing parts</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="service-box">
                                            <div className="testimonial-box-top">
                                            <img src={require("../assets/images/app1.jpg")} className='service-box-img back-img'/>
                                                

                                            </div>
                                            <div className="service-box-text">
                                                <h3 className="h3-title">
                                                Supply  spare parts.
                                                </h3>
                                                <p  style={{fontSize:"21px",color:"#763B45"}}>
                                                   Supply for used parts</p>
                                            </div>
                                        </div>
                                    </div>
                                   
                                    <div className="col-sm-6">
                                        <div className="service-box">
                                            <div className="testimonial-box-top">
                                            <img src={require("../assets/images/app2.jpg")} className='service-box-img back-img'/>
                                                

                                            </div>
                                            <div className="service-box-text">
                                                <h3 className="h3-title">
                                                 Re-selling  parts.
                                                </h3>
                                                <p  style={{fontSize:"21px",color:"#763B45"}}>
                                                   Collect and re-selling parts</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6">
                                        <div className="service-box">
                                            <div className="testimonial-box-top">
                                            <img src={require("../assets/images/de1.jpg")} className='service-box-img back-img'/>

                                            </div>
                                            <div className="service-box-text">
                                                <h3 className="h3-title">
                                                Short delivery 
                                                </h3>
                                                <p  style={{fontSize:"21px",color:"#763B45"}}>
                                                    Short deleivery</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

    </div>
  )
}

export default Service