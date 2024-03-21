import { React } from 'react'

const About = () => {
  

    // Function to change the background image

    return (
        <div>
            <section className="about-sec section" id="about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="sec-title text-center mb-5">
                                <p className="sec-sub-title mb-3">About Us</p>
                                <h2 className="h2-title"> </h2>
                                {/* <div className="sec-title-shape mb-4">
                                    <img src="assets/images/title-shape.svg" alt=""/>
                                </div> */}
                                <p  style={{fontSize:"21px"}}> Our work has always focused on the quality and reliability of your Urunan equipment</p>
                               

                                <div className="ps-3">
                                    <p  style={{fontSize:"21px"}}> Our Mission is to provide the people we serve the ability to 
                                        buy quality  vehicle spare parts at affordable prices coupled with the highest
                                         standards of customer service. 
                                       </p>
                                    {/* <span>Diam dolor diam ipsum sit amet diam et eos</span> */}
                                </div>
                               
                               
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 m-auto">
                            <div className="about-video">
                               
                                <img src={require("../assets/images/app5.jpg")} className='about-video-img'/>
                                {/* <div className="play-btn-wp ">
                                    <a href="assets/images/video.mp4" data-fancybox="video" className="play-btn">
                                        <i className="uil uil-play"></i>

                                    </a>
                                    <span>Watch The Video</span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        // </div>
    )
}

export default About