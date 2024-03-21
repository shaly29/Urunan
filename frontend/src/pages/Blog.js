// import React, { useState } from 'react';

// const Blog = () => {


//     const [backgroundImage, setBackgroundImage] = useState('assets/images/blog/blog1.jpg');

//   // Function to change the background image
//   const changeBackgroundImage = () => {
//     // Logic to determine the new background image dynamically
//     const newBackgroundImage = 'assets/images/blog/another-image.jpg';
//     setBackgroundImage(newBackgroundImage);
//   };

//   return (
//     <div id="viewport">


// {/* <div id="js-scroll-content"> */}
// <section className="blog-sec section" id="blog">
//                     <div className="sec-wp">
//                         <div className="container">
//                             <div className="row">
//                                 <div className="col-lg-12">
//                                     <div className="sec-title text-center mb-5">
//                                         <p className="sec-sub-title mb-3">Our blog</p>
//                                         {/* <h2 className="h2-title">Latest Publications</span></h2> */}
//                                         <div className="sec-title-shape mb-4">
//                                             <img src="assets/images/title-shape.svg" alt=""/>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 <div className="col-lg-4">
//                                     <div className="blog-box">
//                                     <div className="blog-img back-img" style={{backgroundImage: `url(${backgroundImage})`}}>

                                                
//                                             </div>
//                                         <div className="blog-text">
//                                             <p className="blog-date">September.15.2021</p>
//                                             <a href="#" className="h4-title">Energy Drink which you can make at home.</a>
//                                             <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur ipsa
//                                                 explicabo atque reprehenderit beatae! Accusantium soluta consequuntur
//                                                 blanditiis amet ad.</p>
//                                             <a href="#" className="sec-btn">Read More</a>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-lg-4">
//                                     <div className="blog-box">
//                                     <div className="blog-img back-img" style={{backgroundImage: `url(${backgroundImage})`}}>

//                                             </div>
//                                         <div className="blog-text">
//                                             <p className="blog-date">October.15.2021</p>
//                                             <a href="#" className="h4-title">Fresh Veggie and rice combo for dinner.</a>
//                                             <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur ipsa
//                                                 explicabo atque reprehenderit beatae! Accusantium soluta consequuntur
//                                                 blanditiis amet ad.</p>
//                                             <a href="#" className="sec-btn">Read More</a>
//                                         </div>
//                                     </div>
//                                 </div>
                                
//                             </div>
//                         </div>
//                     </div>
//                 </section>
// {/* </div> */}
//     </div>
//   )
// }

// export default Blog
import React, { useState } from 'react';

const ProductList = () => {
  // Sample product data
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', category: 'Category A', price: 10 },
    { id: 2, name: 'Product 2', category: 'Category B', price: 20 },
    { id: 3, name: 'Product 3', category: 'Category A', price: 15 },
    // Add more products as needed
  ]);

  // Filter state
  const [selectedCategory, setSelectedCategory] = useState('');

  // Function to handle category change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Filtered products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  return (
    <div className='details'>
      {/* Category filter dropdown */}
      <select value={selectedCategory} onChange={handleCategoryChange}>
        <option value="">All Categories</option>
        {/* Generate options dynamically based on available categories */}
        {[...new Set(products.map(product => product.category))].map(category => (
          <option key={category} value={category}>{category}</option>
        ))}
      </select>

      {/* Display filtered products */}
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
