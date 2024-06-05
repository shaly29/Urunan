import React from 'react'

const Footer = () => {

    const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };
  return (
   
//    <div id="js-scroll-content">
   <footer className="site-footer" id="contact">
                <div className="footer section">
                    <div className="sec-wp">
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="footer-info">
                                    <div className="footer-menu food-nav-menu">
                                            <h3 className="h3-title">Address</h3>
                                            <p> No9,Uthayanakar West </p>
                                            <p> Kilinochchi</p>
                                           
                                        </div>
                                        
                                       
                                        <div className="social-icon">
                                            <ul>
                                                <li>
                                                    <a href="facebook">
                                                        <i className="uil uil-facebook-f"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="instra">
                                                        <i className="uil uil-instagram"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="git">
                                                        <i className="uil uil-github-alt"></i>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="youtube">
                                                        <i className="uil uil-youtube"></i>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <div className="footer-flex-box">
                                        <div className="footer-table-info">
                                            <h3 className="h3-title">open hours</h3>
                                            <ul>
                                                <li><i className="uil uil-clock"></i> Mon-Thurs : 9am - 6pm</li>
                                                <li><i className="uil uil-clock"></i> Fri-Sun : 11am - 4pm</li>
                                            </ul>
                                        </div>
                                        <div className="footer-menu food-nav-menu">
                                            <h3 className="h3-title">Links</h3>
                                            <ul className="column-2">
                                                <li>
                                                    <a href="home" className="footer-active-menu">Home</a>
                                                </li>
                                                <li><a href="/about">About</a></li>
                                                
                                                <li><a href="faq">FAQ</a></li>
                                               
                                                <li><a href="contact">Contact</a></li>
                                            </ul>
                                        </div>
                                        <div className="footer-menu">
                                            <h3 className="h3-title">Company</h3>
                                            <ul>
                                                <li><a href="terms">Terms & Conditions</a></li>
                                                <li><a href="privacypolicy">Privacy Policy</a></li>
                                                <li><a href="cookie">Cookie Policy</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottom-footer">
                    <div className="container">
                   
                        <button className="scrolltop" onClick={scrollToTop}><i className="uil uil-angle-up"></i></button>
                    </div>
                </div>
            </footer>
            // </div>
            
   
   
  )
}

export default Footer