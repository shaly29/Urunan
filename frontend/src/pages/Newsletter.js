import React, { useState } from 'react';

const Newsletter = () => {

    const [backgroundImage] = useState('assets/images/hero.jpg');

 

  return (
    <div>

<section className="newsletter-sec section pt-0">
      <div className="sec-wp">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 m-auto">
              <div className="newsletter-box text-center back-img white-text" style={{backgroundImage: `url(${backgroundImage})`}}>
                <div className="bg-overlay dark-overlay"></div>
                <div className="sec-wp">
                  <div className="newsletter-box-text">
                    <h2 className="h2-title">Subscribe our newsletter</h2>
                    {/* <p>This is Lorem ipsum dolor sit amet consectetur adipisicing elit ad veritatis.</p> */}
                  </div>
                  <form action="#" className="newsletter-form">
                    <input type="email" className="form-input" placeholder="Enter your Email Here" required/>
                    <button type="submit" className="sec-btn primary-btn">Submit</button>
                  </form>
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

export default Newsletter