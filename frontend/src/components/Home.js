
import React from 'react';


import HeroSection from '../pages/HeroSection';
import About from '../pages/About';
import Section2 from '../pages/Section2';
import Newsletter from '../pages/Newsletter'
import Service from '../pages/Service';
import Footer from '../components/Footer';
const Home = () => {
    

  return (
    <>
  
   <HeroSection/>
    <About/>
   <Section2/>

      <Service/>
<Newsletter/>
<Footer/>
    </>
  )
}

export default Home