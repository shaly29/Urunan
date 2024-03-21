import React from 'react';
const Section2 = () => {
  return (
    <div>

<section className="brands-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="brand-title mb-5">
                                <h5 className="h5-title">Trusted by 70+ companies</h5>
                            </div>
                            <div className="brands-row">
                                <div className="brands-box">
                                <img src={require("../assets/images/brand1.png")} />
                                </div>
                                <div className="brands-box">
                                <img src={require("../assets/images/brand2.png")} />
                                </div>
                                <div className="brands-box">
                                <img src={require("../assets/images/brand3.png")} />
                                </div>
                                <div className="brands-box">
                                <img src={require("../assets/images/brand5.png")} />
                                </div>
                                <div className="brands-box">
                                <img src={require("../assets/images/brand4.png")} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

    </div>
  )
}

export default Section2